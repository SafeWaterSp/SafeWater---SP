from flask import Flask, request, render_template
import requests
import folium
from twilio.rest import Client
from datetime import datetime, timedelta
import pytz
import os
from dotenv import load_dotenv # Importar para carregar .env

# Carrega as variáveis de ambiente do arquivo .env
load_dotenv()

app = Flask(__name__)

# 🔑 Configurações Twilio (agora pegando de variáveis de ambiente)
# Isso é mais seguro e recomendado para produção
ACCOUNT_SID = os.environ.get('TWILIO_ACCOUNT_SID')
AUTH_TOKEN = os.environ.get('TWILIO_AUTH_TOKEN')
FROM_NUMBER = os.environ.get('TWILIO_FROM_NUMBER')

# Verificação básica para garantir que as chaves foram carregadas
if not ACCOUNT_SID or not AUTH_TOKEN or not FROM_NUMBER:
    print("ERRO: As variáveis de ambiente da Twilio não foram carregadas. Verifique seu arquivo .env")
    # Em um ambiente de produção, você pode querer levantar uma exceção ou parar a aplicação aqui.

client = Client(ACCOUNT_SID, AUTH_TOKEN)

# 🌍 Defina o fuso horário de São Paulo
SAO_PAULO_TZ = pytz.timezone('America/Sao_Paulo')


# 🚀 Função para enviar SMS
def enviar_sms(mensagem, para):
    try:
        message = client.messages.create(
            body=mensagem,
            from_=FROM_NUMBER,
            to=para
        )
        return f"Mensagem enviada: {message.sid}"
    except Exception as e:
        # Registre o erro para depuração, mas retorne uma mensagem amigável
        print(f"Erro ao enviar SMS: {e}")
        return f"Erro ao enviar SMS: {e}"


# 🌦️ Função para consultar previsão
def consultar_previsao(lat, lon):
    url = f"https://api.met.no/weatherapi/locationforecast/2.0/compact?lat={lat}&lon={lon}"
    headers = {
        "User-Agent": "SafeWaterSP/1.0 contato@exemplo.com" # User-Agent é importante para APIs web
    }
    try:
        r = requests.get(url, headers=headers)
        r.raise_for_status() # Lança uma exceção para códigos de status HTTP de erro (4xx ou 5xx)
        return r.json()
    except requests.exceptions.RequestException as e:
        print(f"Erro ao consultar previsão: {e}")
        return None


# 🛑 Classificar risco pela quantidade de chuva
def classificar_risco(precip_mm):
    if precip_mm < 1:
        return "Baixo", "low"
    elif precip_mm < 3:
        return "Médio", "medium"
    elif precip_mm < 6:
        return "Alto", "high"
    else:
        return "Muito Alto", "very-high"


# 🗺️ Gerar mapa com marcador
def gerar_mapa(lat, lon):
    mapa = folium.Map(location=[lat, lon], zoom_start=12)
    folium.Marker(
        [lat, lon],
        popup="Sua localização",
        icon=folium.Icon(color='blue')
    ).add_to(mapa)
    return mapa._repr_html_()


# 🌐 Rotas da aplicação

@app.route('/')
def index():
    return render_template('pages/index.html')


@app.route('/mapa')
def mapa():
    return render_template('pages/mapa.html')


@app.route('/quiz')
def quiz():
    return render_template('pages/quiz.html')


@app.route('/contato')
def contato():
    return render_template('pages/contato.html')

@app.route('/monitoramento')
def monitoramento():
    return render_template('pages/monitoramento.html')


@app.route('/previsao', methods=['POST'])
def previsao():
    data = request.get_json()
    lat = data.get('latitude')
    lon = data.get('longitude')
    telefone = data.get('telefone')

    # Validação de entrada
    if not lat or not lon:
        return "Latitude e longitude são necessárias.", 400
    if not telefone:
        return "Número de telefone é necessário para SMS.", 400

    dados = consultar_previsao(lat, lon)
    if not dados:
        return "Erro ao consultar previsão. Tente novamente mais tarde.", 500

    mapa_html = gerar_mapa(lat, lon)

    horarios = dados['properties']['timeseries']
    linhas = ""
    alerta_sms = ""

    # --- Dados para a previsão AGORA ---
    previsao_agora = {}
    if horarios:
        current_item = horarios[0]
        current_time_str_utc = current_item['time'] # String de tempo em UTC
        current_details = current_item['data'].get('next_1_hours', {}).get('details', {})
        current_precip = current_details.get('precipitation_amount', 0)
        current_risco_text, current_risco_class = classificar_risco(current_precip)

        # Converte a string UTC para um objeto datetime ciente de fuso horário (UTC)
        utc_dt = datetime.fromisoformat(current_time_str_utc.replace('Z', '+00:00'))
        # Converte para o fuso horário de São Paulo
        sp_dt = utc_dt.astimezone(SAO_PAULO_TZ)

        previsao_agora = {
            "time": sp_dt.strftime('%d/%m/%Y %H:%M'), # Formato de exibição local
            "precip": current_precip,
            "risco_text": current_risco_text,
            "risco_class": current_risco_class
        }
    # -----------------------------------

    for item in horarios[:10]: # Exibe as próximas 10 horas na tabela
        hora_str_utc = item['time'] # String de tempo em UTC
        detalhes = item['data'].get('next_1_hours', {}).get('details', {})
        precip = detalhes.get('precipitation_amount', 0)

        risco_text, risco_class = classificar_risco(precip)

        # Converte para o fuso horário de São Paulo para cada item da tabela
        utc_dt_table = datetime.fromisoformat(hora_str_utc.replace('Z', '+00:00'))
        sp_dt_table = utc_dt_table.astimezone(SAO_PAULO_TZ)

        linhas += f"""
        <tr>
            <td>{sp_dt_table.strftime('%d/%m/%Y %H:%M')}</td>
            <td>{precip} mm</td>
            <td><span class="risk-dot {risco_class}"></span> {risco_text}</td>
        </tr>
        """

        # Lógica de alerta SMS (opcionalmente você pode mover isso para depois do loop
        # se quiser verificar o risco mais alto em todas as 10 horas)
        if precip >= 6 and not alerta_sms: # Garante que o SMS só seja gerado uma vez
            alerta_sms = f"🚨 ALTA CHUVA DETECTADA às {sp_dt_table.strftime('%H:%M')}: {precip}mm. Risco de enchente na sua área! 🌧️🌊"
            # Não use 'break' aqui se você quiser que o loop continue para popular a tabela inteira
            # Se quiser que a tabela pare de popular quando o alerta for encontrado, então use o break.
            # Para este caso, vamos manter o loop para popular a tabela toda.

    # Se nenhum alerta de 6mm+ foi gerado, verifique se há um risco ALTO nas próximas horas
    if not alerta_sms and previsao_agora:
        if previsao_agora["precip"] >= 3 and previsao_agora["precip"] < 6: # Risco Alto (3mm a <6mm)
            alerta_sms = f"⚠️ ATENÇÃO: Chuva moderada-forte esperada AGORA ({previsao_agora['time'].split(' ')[1]}): {previsao_agora['precip']}mm. Monitore sua área para possíveis alagamentos."
        elif any(classificar_risco(item['data'].get('next_1_hours', {}).get('precipitation_amount', 0))[0] == 'Alto' for item in horarios[1:10]):
            # Verifica se há risco Alto nas próximas 9 horas (depois da primeira)
            alerta_sms = "⚠️ ATENÇÃO: Chuva forte esperada nas próximas horas. Monitore sua área para possíveis alagamentos."


    if alerta_sms:
        resultado_sms = enviar_sms(alerta_sms, telefone)
    else:
        resultado_sms = "Nenhum alerta de chuva intensa necessário no momento." # Mensagem mais informativa


    return render_template(
        'pages/previsao.html',
        mapa=mapa_html,
        linhas=linhas,
        resultado_sms=resultado_sms,
        previsao_agora=previsao_agora
    )


@app.route('/simular', methods=['POST'])
def simular():
    data = request.get_json()
    telefone = data.get('telefone')

    if not telefone:
        return "Número de telefone é obrigatório", 400

    lat = -23.55052
    lon = -46.633308  # Localização simulada (São Paulo)

    mapa_html = gerar_mapa(lat, lon)

    linhas = ""
    # Dados simulados para "agora" - Ajuste para fuso horário local
    now_sp = datetime.now(SAO_PAULO_TZ) # Pega o horário atual em SP

    # Simulação para ALERTA MUITO ALTO agora
    previsao_agora_simulada = {
        "time": now_sp.strftime('%d/%m/%Y %H:%M'),
        "precip": 10,
        "risco_text": "Muito Alto",
        "risco_class": "very-high"
    }

    # Gera linhas da tabela com dados simulados
    for i in range(10):
        sim_precip = 10 if i == 0 else 0.5 # Apenas a primeira hora com alto risco, depois baixa
        sim_risco_text, sim_risco_class = classificar_risco(sim_precip)
        sim_time_sp = now_sp + timedelta(hours=i)
        
        linhas += f"""
        <tr>
            <td>{sim_time_sp.strftime('%d/%m/%Y %H:%M')}</td>
            <td>{sim_precip} mm</td>
            <td><span class="risk-dot {sim_risco_class}"></span> {sim_risco_text}</td>
        </tr>
        """

    # Mensagem de alerta para simulação
    mensagem = f"🚨 ALERTA DE ENCHENTE GRAVE 🚨\nRisco altíssimo de alagamento na sua região às {now_sp.strftime('%H:%M')}. Tome precauções imediatamente!"

    try:
        enviar_sms(mensagem, telefone)
        resultado_sms = "🔴 Alerta de enchente grave enviado com sucesso!"
    except Exception as e:
        resultado_sms = f"Erro ao enviar SMS: {e}"

    return render_template(
        'pages/previsao.html',
        mapa=mapa_html,
        linhas=linhas,
        resultado_sms=resultado_sms,
        previsao_agora=previsao_agora_simulada
    )


if __name__ == '__main__':
    # Em produção, você não usaria debug=True.
    # Também pode especificar o host para ser acessível externamente (ex: host='0.0.0.0')
    app.run(debug=True)
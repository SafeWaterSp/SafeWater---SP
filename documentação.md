
# SafeWater São Paulo

## Descrição da Solução
O SafeWater São Paulo é uma solução tecnológica pensada para ajudar na prevenção e no controle de enchentes na cidade. A proposta surge da necessidade urgente de lidar com os impactos das mudanças climáticas, que aumentam a frequência e a gravidade dos alagamentos, afetando diretamente a segurança, os bens e a rotina da população.

Nossa solução oferece um sistema de monitoramento em tempo real, que utiliza sensores, análise de dados e alertas automáticos. Por meio de uma plataforma acessível, tanto moradores quanto órgãos públicos podem acompanhar, de forma clara e rápida, os riscos de enchentes e tomar decisões preventivas.

## Problemas que Solucionamos
- Falta de informações atualizadas sobre pontos de alagamento.
- Dificuldade de resposta rápida em situações de emergência.
- Prejuízos econômicos, riscos à vida e danos causados por enchentes.
- Ausência de ferramentas acessíveis para apoiar a população e os gestores.

## Nossos Diferenciais
- Monitoramento em tempo real dos níveis de água em áreas críticas.
- Plataforma digital intuitiva, disponível via site e aplicativo.
- Alertas automáticos e integração com órgãos públicos, como a Defesa Civil.
- Análise de dados para prever riscos e ajudar na prevenção.
- Interface acessível, pensada para todos os perfis de usuários.
- Modelo escalável e sustentável, podendo ser aplicado em outras cidades.

## Resumo de Requisitos

### Requisitos Funcionais
- Cadastro e autenticação de usuários, com controle de acesso por perfis.
- Consultar histórico de consumo de água e leituras do hidrômetro.
- Monitoramento em tempo real dos níveis de reservatórios e indicadores de qualidade.
- Configuração de limites de segurança e envio de alertas automáticos.
- Geração de relatórios e gráficos históricos para análise.
- Exportação de dados em formatos PDF e CSV.
- Integração com bases de dados oficiais.

### Requisitos Não Funcionais
- Alta disponibilidade (≥99% uptime) e backup automático.
- Segurança com autenticação forte e criptografia, em conformidade com a LGPD.
- Desempenho eficiente e escalabilidade.
- Interface responsiva e intuitiva.
- Confiabilidade com logs de auditoria e validação de dados.
- Compatibilidade com padrões abertos e normas técnicas.

### Regras de Negócio
- Apenas usuários autenticados podem executar ações sensíveis.
- Validação de dados: leituras precisam ser plausíveis e dentro dos critérios.
- Processos condicionais para envio de alertas baseados em parâmetros.
- Manutenção de histórico com arquivamento automático após 5 anos.
- Restrições operacionais de acordo com políticas definidas.

## Product Backlog – Histórias do Usuário (Front-end)

### História 1: Visualização em Tempo Real
**Como** usuário da plataforma,  
**Quero** acessar um painel visual que mostre os níveis de água em tempo real,  
**Para que** eu possa acompanhar o status das áreas de risco.

**Critérios de Aceitação:**  
- Painel com mapa interativo e marcadores coloridos (verde, amarelo, vermelho).  
- Dados atualizados automaticamente.  
- Gráficos simples das variações recentes.  
- Interface responsiva para web e mobile.

### História 2: Recebimento e Visualização de Alertas
**Como** cidadão residente em áreas de risco,  
**Quero** receber alertas visuais e notificações na plataforma,  
**Para que** eu possa me preparar para enchentes iminentes.

**Critérios de Aceitação:**  
- Alertas em destaque no site e app.  
- Notificações push para usuários cadastrados.  
- Consulta ao histórico de alertas por região e data.  
- Mensagens com nível de risco e orientações.

### História 3: Consulta ao Histórico de Dados e Relatórios
**Como** gestor público,  
**Quero** consultar dados históricos dos níveis de água,  
**Para que** eu possa planejar ações preventivas.

**Critérios de Aceitação:**  
- Seleção de períodos personalizados para análise.  
- Gráficos interativos e tendências históricas.  
- Exportação de dados em PDF e CSV.  
- Acesso restrito conforme perfil de usuário.

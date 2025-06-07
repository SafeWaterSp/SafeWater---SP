// Lógica para a mudança de cor do header ao rolar a página, padronizada com index.html
window.addEventListener("scroll", function () {
    let header = document.querySelector("header");
    if (header) {
        if (window.scrollY > 10) {
            header.style.backgroundColor = "#072f65";
        } else {
            header.style.backgroundColor = "rgba(242, 241, 241, 0)";
        }
    }
});

// Lógica do mapa (já está boa, não precisa de DOMContentLoaded porque o #map já existe no HTML)
const map = L.map('map').setView([-23.5505, -46.6333], 11);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap'
}).addTo(map);

const apiKey = 'SUA_API_KEY_AQUI'; 
const rainLayer = L.tileLayer(
    `https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${apiKey}`, {
        attribution: 'Dados do mapa © OpenWeatherMap',
        opacity: 0.6
    }
);
rainLayer.addTo(map);

const enchentes = [
    { nome: "Marginal Tietê", coords: [-23.5175, -46.6456] },
    { nome: "Marginal Pinheiros", coords: [-23.5845, -46.7095] },
    { nome: "Avenida do Estado", coords: [-23.5500, -46.6200] },
    { nome: "Itaim Paulista", coords: [-23.4848, -46.4117] },
    { nome: "Vila Prudente", coords: [-23.5850, -46.5900] },
    { nome: "Aricanduva", coords: [-23.5426, -46.5298] },
    { nome: "Mooca", coords: [-23.5545, -46.6017] },
    { nome: "São Mateus", coords: [-23.5803, -46.5162] },
    { nome: "Cangaíba", coords: [-23.4967, -46.5402] },
    { nome: "Freguesia do Ó", coords: [-23.5028, -46.6646] },
    { nome: "Santo Amaro", coords: [-23.6528, -46.7159] },
    { nome: "Ipiranga", coords: [-23.5856, -46.6119] },
    { nome: "Jardim Pantanal", coords: [-23.4910, -46.4980] },
    { nome: "Sapopemba", coords: [-23.6074, -46.5277] },
    { nome: "Lapa", coords: [-23.5273, -46.7031] },
    { nome: "Penha", coords: [-23.5224, -46.5327] },
    { nome: "Jardim Helena", coords: [-23.4649, -46.4346] },
    { nome: "Guaianases", coords: [-23.5397, -46.4084] },
    { nome: "Grajaú", coords: [-23.7503, -46.7010] },
    { nome: "Parelheiros", coords: [-23.8656, -46.7178] }
];

enchentes.forEach(local => {
    L.circle(local.coords, {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.4,
        radius: 1000
    }).addTo(map)
      .bindPopup(`<b>${local.nome}</b><br>Área com risco de enchente.`);
});

const rios = [
    { nome: "Rio Tietê", coords: [-23.5175, -46.6456] },
    { nome: "Rio Pinheiros", coords: [-23.5845, -46.7095] },
    { nome: "Rio Tamanduateí", coords: [-23.5594, -46.6122] },
    { nome: "Rio Aricanduva", coords: [-23.5382, -46.5311] },
    { nome: "Rio Anhangabaú", coords: [-23.5458, -46.6355] }
];

rios.forEach(rio => {
    L.marker(rio.coords, {
        icon: L.icon({
            iconUrl: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png',
            iconSize: [32, 32],
            iconAnchor: [16, 32],
            popupAnchor: [0, -32]
        })
    }).addTo(map)
      .bindPopup(`<b>${rio.nome}</b><br>Rio de São Paulo.`);
});

const legenda = L.control({ position: 'bottomright' });

legenda.onAdd = function (map) {
    const div = L.DomUtil.create('div', 'leaflet-control legend');
    div.innerHTML += `<i style="background: red"></i> Área de risco de enchente<br>`;
    div.innerHTML += `<i style="background: blue"></i> Localização dos rios`;
    return div;
};

legenda.addTo(map);

// Lógica para o menu hambúrguer responsivo, GARANTINDO que o DOM esteja carregado
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOMContentLoaded disparado em mapa.js'); // ✅ Adicionado para depuração
    const toggle = document.querySelector('.menu-toggle');
    const menu = document.querySelector('.menu');

    console.log('menu-toggle encontrado:', toggle); // ✅ Adicionado para depuração
    console.log('menu encontrado:', menu);         // ✅ Adicionado para depuração

    if (toggle && menu) {
        toggle.addEventListener('click', () => {
            console.log('Botão menu-toggle clicado!'); // ✅ Adicionado para depuração
            menu.classList.toggle('active');
        });
    } else {
        console.error("Elementos '.menu-toggle' ou '.menu' não encontrados para o menu responsivo em mapa.js.");
    }
});
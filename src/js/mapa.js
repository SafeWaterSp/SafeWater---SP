// Inicializa o mapa centralizado em São Paulo
const map = L.map('map').setView([-23.5505, -46.6333], 11);

// Camada base OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap'
}).addTo(map);

// Chave da API OpenWeather
const apiKey = 'SUA_API_KEY_AQUI';

// Camada de radar de chuva
const rainLayer = L.tileLayer(
  `https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${apiKey}`, {
    attribution: 'Map data © OpenWeatherMap',
    opacity: 0.6
  }
);
rainLayer.addTo(map);

// 🔴 Locais de risco de enchente
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

// 🔵 Rios principais
const rios = [
  { nome: "Rio Tietê", coords: [-23.5175, -46.6456] },
  { nome: "Rio Pinheiros", coords: [-23.5845, -46.7095] },
  { nome: "Rio Tamanduateí", coords: [-23.5594, -46.6122] },
  { nome: "Rio Aricanduva", coords: [-23.5382, -46.5311] },
  { nome: "Rio Anhangabaú", coords: [-23.5458, -46.6355] }
];

// 🔴 Adiciona círculos para as áreas de enchente
enchentes.forEach(local => {
  L.circle(local.coords, {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.4,
    radius: 1000 // Raio em metros (ajustável)
  }).addTo(map)
    .bindPopup(`<b>${local.nome}</b><br>Área com risco de enchente.`);
});

// 🔵 Adiciona marcadores dos rios
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

// ✅ Legenda
const legenda = L.control({ position: 'bottomright' });

legenda.onAdd = function (map) {
  const div = L.DomUtil.create('div', 'leaflet-control legend');
  div.innerHTML += `<i style="background: red"></i> Área de risco de enchente<br>`;
  div.innerHTML += `<i style="background: blue"></i> Localização dos rios`;
  return div;
};

legenda.addTo(map);

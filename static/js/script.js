// script.js

// Variáveis globais para o slideshow (se necessário)
let slideIndex = 0;
let slideTimer;

// Função principal que é executada quando o DOM está completamente carregado
document.addEventListener("DOMContentLoaded", function() {

    // --- Lógica do Menu Hambúrguer ---
    const menuToggle = document.querySelector(".menu-toggle");
    const menu = document.querySelector(".menu");

    if (menuToggle && menu) { // Verifica se os elementos existem antes de adicionar o listener
        menuToggle.addEventListener("click", function () {
            menu.classList.toggle("active");
        });
    }

    // --- Lógica do Slideshow ---
    const slides = document.getElementsByClassName("mySlides");
    const dots = document.getElementsByClassName("dot");
    const prevButton = document.querySelector(".prev");
    const nextButton = document.querySelector(".next");

    // Somente inicia o slideshow se houver slides no HTML
    if (slides.length > 0) {
        showSlides(); // Inicia o slideshow automático ao carregar a página
    }

    // Funções para os botões de next e prev (precisam ser globais ou anexadas ao window se chamadas de onclick no HTML)
    window.plusSlides = function(n) {
        showSlides(slideIndex += n);
    }

    window.currentSlide = function(n) {
        showSlides(slideIndex = n);
    }

    // Adiciona evento aos botões de navegação do slideshow
    if (prevButton) {
        prevButton.addEventListener("click", () => window.plusSlides(-1));
    }
    if (nextButton) {
        nextButton.addEventListener("click", () => window.plusSlides(1));
    }

    // --- Lógica de Mudança de Tema (agora para Dark Mode) ---
    // Você tinha um "theme-select". Vou adaptar para um botão de dark mode.
    // Se você ainda usa um <select>, me avise para manter a lógica original do select.
    // Assumindo que você adicionou um botão com id="darkModeToggle" no HTML
    const darkModeToggleButton = document.getElementById('darkModeToggle');
    const body = document.body;

    // Função para aplicar ou remover a classe 'dark-mode' do body
    function applyDarkMode(isDarkMode) {
        if (isDarkMode) {
            body.classList.add('dark-mode');
        } else {
            body.classList.remove('dark-mode');
        }
    }

    // Função para alternar o tema Dark/Light
    function toggleDarkMode() {
        const isCurrentlyDarkMode = body.classList.contains('dark-mode');
        applyDarkMode(!isCurrentlyDarkMode); // Inverte o estado
        localStorage.setItem('darkModeEnabled', !isCurrentlyDarkMode); // Salva a preferência
    }

    // Carrega a preferência de Dark Mode salva ao carregar a página
    const savedDarkMode = localStorage.getItem('darkModeEnabled');
    if (savedDarkMode !== null) {
        applyDarkMode(savedDarkMode === 'true'); // Converte "true" string para booleano
    }

    // Adiciona listener ao botão de Dark Mode, se ele existir
    if (darkModeToggleButton) {
        darkModeToggleButton.addEventListener('click', toggleDarkMode);
    }

    // --- Lógica de Mudança de Cor do Header ao Rolar ---
    // Esta lógica não precisa estar dentro do DOMContentLoaded se ela for independente de elementos que carregam após.
    // No entanto, para consistência, podemos mantê-la aqui ou fora, dependendo de outras interações.
    // Se 'header' for sempre o mesmo, pode ser fora. Se houver múltiplos, dentro é mais seguro.
    // Como está acessando 'header', vamos mantê-lo no DOMContentLoaded para garantir que 'header' exista.
    let header = document.querySelector("header");
    window.addEventListener("scroll", function () {
        if (header) { // Verifica se o header existe
            if (window.scrollY > 10) {
                header.style.backgroundColor = "var(--header-scroll-bg)"; // Azul sólido
            } else {
                header.style.backgroundColor = "var(--header-bg)"; // Transparente
            }
        }
    });

}); // Fim do DOMContentLoaded


// --- Funções Auxiliares (podem estar fora do DOMContentLoaded se não dependem de ele estar pronto) ---
// Função showSlides movida para fora do DOMContentLoaded para que possa ser acessada globalmente via window.plusSlides/window.currentSlide
function showSlides(index = null) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");

    // Limpa o timer anterior para evitar múltiplos timers rodando
    clearTimeout(slideTimer);

    // Lógica para controle do índice do slide
    if (index !== null) {
        slideIndex = index;
    } else {
        slideIndex++;
    }

    // Garante que o slideIndex esteja dentro dos limites
    if (slideIndex > slides.length) { slideIndex = 1; }
    if (slideIndex < 1) { slideIndex = slides.length; }

    // Esconde todos os slides e remove classes de animação
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
        slides[i].classList.remove("slide-in"); // Remove a classe de animação anterior
    }

    // Remove classe ativa dos dots
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }

    // Mostra o slide atual e adiciona a classe de animação
    if (slides.length > 0) { // Verifica se há slides para evitar erro se a página não tiver slideshow
        slides[slideIndex - 1].style.display = "block";
        slides[slideIndex - 1].classList.add("slide-in"); // Adiciona a classe para a nova animação
        dots[slideIndex - 1].className += " active";
    }

    // Reinicia o timer automático para o próximo slide
    slideTimer = setTimeout(() => showSlides(), 4000); // Chama showSlides sem argumento para o próximo slide
}
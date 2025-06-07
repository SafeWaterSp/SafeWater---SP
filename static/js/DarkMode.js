// Função para aplicar ou remover a classe 'dark-mode' do body
function applyDarkMode(isDarkMode) {
    const body = document.body;
    if (isDarkMode) {
        body.classList.add('dark-mode');
    } else {
        body.classList.remove('dark-mode');
    }
}

// Função para alternar o tema
function toggleDarkMode() {
    const body = document.body;
    const isCurrentlyDarkMode = body.classList.contains('dark-mode');
    
    // Inverte o estado
    applyDarkMode(!isCurrentlyDarkMode);

    // Salva a preferência no localStorage
    localStorage.setItem('darkModeEnabled', !isCurrentlyDarkMode);
}

// Verifica a preferência do usuário ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    const savedDarkMode = localStorage.getItem('darkModeEnabled');
    
    // Se há uma preferência salva, use-a. Caso contrário, não faça nada (mantém o tema padrão do CSS).
    // O 'true' salvo no localStorage é uma string "true", então convertemos para booleano.
    if (savedDarkMode !== null) {
        applyDarkMode(savedDarkMode === 'true');
    }

    // Você precisará de um botão ou algum elemento no HTML para chamar toggleDarkMode().
    // Exemplo:
    // <button id="darkModeToggle">Modo Escuro</button>
    const darkModeToggleButton = document.getElementById('darkModeToggle');
    if (darkModeToggleButton) {
        darkModeToggleButton.addEventListener('click', toggleDarkMode);
    }

    // Se você tiver um menu móvel como parece ter no index.html
    const menuToggle = document.querySelector('.menu-toggle');
    const menu = document.querySelector('.menu');

    if (menuToggle && menu) {
        menuToggle.addEventListener('click', () => {
            menu.classList.toggle('active');
        });
    }

    // Lógica para o slideshow (seja no index.html ou em outro lugar)
    let slideIndex = 1;
    showSlides(slideIndex);

    // Função para avançar/retroceder slides
    window.plusSlides = function(n) {
        showSlides(slideIndex += n);
    }

    // Função para ir para um slide específico
    window.currentSlide = function(n) {
        showSlides(slideIndex = n);
    }

    function showSlides(n) {
        let i;
        let slides = document.getElementsByClassName("mySlides");
        let dots = document.getElementsByClassName("dot");
        if (n > slides.length) { slideIndex = 1 }
        if (n < 1) { slideIndex = slides.length }
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        for (i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
        }
        if (slides.length > 0) { // Verifica se há slides para exibir
            slides[slideIndex - 1].style.display = "block";
            dots[slideIndex - 1].className += " active";
        }
    }
});
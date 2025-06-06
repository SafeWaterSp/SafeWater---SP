// Mudança de cor do header ao rolar
window.addEventListener("scroll", function () {
    let header = document.querySelector("header");
    if (window.scrollY > 10) {
        header.style.backgroundColor = "var(--header-scroll-bg)"; // Azul sólido
    } else {
        header.style.backgroundColor = "var(--header-bg)"; // Transparente
    }
});

// Menu hamburguer
document.querySelector(".menu-toggle").addEventListener("click", function () {
    document.querySelector(".menu").classList.toggle("active");
});

// Slideshow automático + manual
let slideIndex = 0;
let slideTimer;
function showSlides(index = null) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");
    // Se index for passado manualmente (via botão)
    if (index !== null) {
        slideIndex = index;
    } else {
        slideIndex++;
        if (slideIndex > slides.length) {slideIndex = 1;}
    }

    // Esconde todos os slides e remove classes
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
        slides[i].classList.remove("slide-in");
    }

    // Remove classe ativa dos dots
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }

    // Mostra slide atual
    slides[slideIndex - 1].style.display = "block";
    slides[slideIndex - 1].classList.add("slide-in");
    dots[slideIndex - 1].className += " active";

    // Reinicia timer automático
    clearTimeout(slideTimer);
    slideTimer = setTimeout(showSlides, 4000);
}

// Funções para os botões de next e prev
function nextSlide() {
    slideIndex++;
    if (slideIndex > document.getElementsByClassName("mySlides").length) {slideIndex = 1;}
    showSlides(slideIndex);
}

function prevSlide() {
    slideIndex--;
    if (slideIndex < 1) {slideIndex = document.getElementsByClassName("mySlides").length;}
    showSlides(slideIndex);
}

// Adiciona evento aos botões
document.querySelector(".prev").addEventListener("click", prevSlide);
document.querySelector(".next").addEventListener("click", nextSlide);
// Inicia o slideshow ao carregar
showSlides();

// Theme switcher logic
document.addEventListener("DOMContentLoaded", function() {
    const themeSelect = document.getElementById("theme-select");
    const body = document.body;

    // Load saved theme from local storage
    const savedTheme = localStorage.getItem("safewater-theme");
    if (savedTheme) {
        body.classList.add(`theme-${savedTheme}`);
        themeSelect.value = savedTheme;
    } else {
        // Set default theme if no theme is saved
        body.classList.add("theme-ocean");
    }

    themeSelect.addEventListener("change", function() {
        const selectedTheme = this.value;

        // Remove all existing theme classes
        body.classList.remove("theme-ocean", "theme-forest", "theme-sunset");

        // Add the selected theme class
        body.classList.add(`theme-${selectedTheme}`);

        // Save selected theme to local storage
        localStorage.setItem("safewater-theme", selectedTheme);
    });
});
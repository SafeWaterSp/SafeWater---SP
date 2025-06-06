// Mudança de cor do header ao rolar
window.addEventListener("scroll", function () {
    let header = document.querySelector("header");
    if (window.scrollY > 10) {
        header.style.backgroundColor = "#072f65"; // Azul sólido
    } else {
        header.style.backgroundColor = "rgba(0, 0, 128, 0)"; // Transparente
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

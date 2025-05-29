window.addEventListener("scroll", function () {
  let header = document.querySelector("header");
  if (window.scrollY > 10) { // Se rolou mais de 10px
    header.style.backgroundColor = "#072f65"; // Azul sólido
  } else {
    header.style.backgroundColor = "rgba(0, 0, 128, 0)"; // Transparente
  }
});

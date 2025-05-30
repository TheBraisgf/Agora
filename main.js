// Animaciones de entrada con Anime.js
anime({
  targets: "section",
  opacity: [0, 1],
  translateY: [50, 0],
  delay: anime.stagger(300, { start: 500 }),
  duration: 1000,
  easing: "easeOutCubic",
});

anime({
  targets: ".title",
  scale: [0.9, 1],
  opacity: [0, 1],
  duration: 1500,
  easing: "easeOutElastic(1, .8)",
});

let bocadilloActivo = null;

function presentarMascota(nombre) {
  const bocadillo = document.getElementById("bocadillo");
  const overlay = document.getElementById("overlay");
  const trigger = document.getElementById(nombre);
  const rect = trigger.getBoundingClientRect();
  const frases = {
    griff:
      "¡Hey! Soy Griff, el fuego creativo de Myth Minds. ¡Nada me detiene cuando tengo una idea! 🔥",
    nyx: "Saludos. Soy Nyx, guardiana del saber y las sombras. Estrategia, elegancia y una pizca de caos. 🧠✨",
  };

  // Si ya estaba abierta para la misma mascota → cerrar
  if (bocadilloActivo === nombre) {
    bocadillo.classList.add("oculto");
    overlay.classList.add("oculto");
    bocadilloActivo = null;
    return;
  }

  // Mostrar contenido
  bocadillo.textContent = frases[nombre];
  bocadillo.classList.remove("oculto");
  overlay.classList.remove("oculto");
  bocadilloActivo = nombre;

  // Calcula posición inteligente
  const espacioIzq = rect.left;
  const espacioDer = window.innerWidth - rect.right;
  const margen = 10;
  const top = rect.top + window.scrollY - 20;

  if (espacioDer > espacioIzq) {
    // Mostrar a la derecha
    bocadillo.style.left = `${rect.right + margen}px`;
    bocadillo.style.right = "auto";
    bocadillo.style.transform = "translateX(0)";
  } else {
    // Mostrar a la izquierda
    bocadillo.style.left = "auto";
    bocadillo.style.right = `${window.innerWidth - rect.left + margen}px`;
    bocadillo.style.transform = "translateX(-100%)";
  }

  bocadillo.style.top = `${top}px`;

  clearTimeout(window.bocadilloTimer);
  window.bocadilloTimer = setTimeout(() => {
    bocadillo.classList.add("oculto");
    overlay.classList.add("oculto");
    bocadilloActivo = null;
  }, 6000);
}

// Animación juguetona y aparición aleatoria
function moverMascota(id, invertida = false) {
  const el = document.getElementById(id);

  function nuevaPos() {
    const top = Math.random() * (window.innerHeight - 150);
    const left = Math.random() * (window.innerWidth - 100);

    el.style.top = `${top}px`;
    el.style.left = id === "nyx" ? `${left}px` : "auto";
    el.style.right = id === "griff" ? `${Math.random() * 80}px` : "auto";

    el.style.transform = `scale(${invertida ? "-1,1" : "1,1"})`;
  }

  setInterval(() => {
    nuevaPos();
  }, 5000);

  nuevaPos(); // Primer movimiento
}

document.addEventListener("DOMContentLoaded", () => {
  moverMascota("griff");
  moverMascota("nyx", true);

  document
    .getElementById("griff")
    .addEventListener("click", () => presentarMascota("griff"));
  document
    .getElementById("nyx")
    .addEventListener("click", () => presentarMascota("nyx"));
});

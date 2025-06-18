// main.js
document.addEventListener("DOMContentLoaded", function() {
    fetch('components/header.html')
      .then(response => response.text())
      .then(data => {
        document.getElementById('header-container').innerHTML = data;
      });
  });
  

  // script.js
async function cargarJuego() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  const respuesta = await fetch("juegos.json");
  const juegos = await respuesta.json();

  const juego = juegos[id];

  if (!juego) {
    document.body.innerHTML = "<h2>Juego no encontrado</h2>";
    return;
  }

  document.getElementById("titulo").innerText = juego.titulo;
  document.getElementById("descripcion").innerText = juego.descripcion;
  document.getElementById("jugadores").innerText = juego.jugadores;
  document.getElementById("tiempo").innerText = juego.tiempo;
  document.getElementById("dificultad").innerText = juego.dificultad;

  // Cargar imágenes al carrusel
  const carrusel = document.getElementById("carousel-inner");
  juego.imagenes.forEach((img, index) => {
    const div = document.createElement("div");
    div.className = `carousel-item${index === 0 ? " active" : ""}`;
    div.innerHTML = `<img src="img/${img}" class="d-block w-100">`;
    carrusel.appendChild(div);
  });

  document.getElementById("video").src = juego.video;
}

window.addEventListener("DOMContentLoaded", cargarJuego);


document.addEventListener("DOMContentLoaded", async () => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
  
    const res = await fetch("data/juegos.json");
    const juegos = await res.json();
  
    const juego = juegos.find(j => j.id === id);
    if (!juego) {
      document.body.innerHTML = "<h2>Juego no encontrado</h2>";
      return;
    }
  
    document.getElementById("titulo").innerText = juego.titulo;
    document.getElementById("titlepage").innerText = "KOAN " + juego.titulo;
    document.getElementById("descripcion").innerText = juego.descripcion;
    document.getElementById("jugadores").innerText = juego.jugadores;
    document.getElementById("tiempo").innerText = juego.tiempo;
    document.getElementById("dificultad").innerText = juego.dificultad;
    document.getElementById("video").src = juego.video;
    document.getElementById("precio").innerText = juego.precio;
    document.getElementById("disponible").innerText = juego.disponible;
  
    // Cargar imágenes en el carrusel
    const carrusel = document.getElementById("carousel-inner");
    juego.imagenes.forEach((img, index) => {
      const div = document.createElement("div");
      div.className = `carousel-item${index === 0 ? " active" : ""}`;
      div.innerHTML = `<img src="img/${img}" class="d-block w-100" alt="Imagen de ${juego.titulo}">`;
      carrusel.appendChild(div);
    });
  });
  
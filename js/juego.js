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
    document.getElementById("precio").innerText = juego.precio;
    document.getElementById("disponible").innerText = juego.disponible;
   document.getElementById("video").src = juego.video;

    
    const btnesAccion = document.getElementById("btnsAccion")



    // Cargar imágenes en el carrusel
    const carrusel = document.getElementById("carousel-inner");
    juego.imagenes.forEach((img, index) => {
      const div = document.createElement("div");
      div.className = `carousel-item${index === 0 ? " active" : ""}`;
      div.innerHTML = `<img src="img/${img}" class="d-block w-100" alt="Imagen de ${juego.titulo}">`;
      carrusel.appendChild(div);
    });

let botonesHTML = "";
    if (juego.tipo === "publicado") {
      botonesHTML = `
        <div class="btnsAccion">
          <a href="https://www.instagram.com/koan.juegos/" class="btn btn-primary" target="_blank">Comprar por instagram</a>
          <a href="tiendas.html" class="btn btn-secondary" target="_blank">Comprar en tiendas</a>
        </div>
      `;
    } else if (juego.tipo === "prototipo") {
      botonesHTML = `
        <div class="btnsAccion">
          <a href="https://www.instagram.com/koan.juegos/" class="btn btn-outline-primary" target="_blank">Hablar por instagram</a>
          <a href="eventos.html" class="btn btn-outline-secondary" target="_blank">Buscar evento para probar</a>
        </div>
      `;
    }
    
    btnesAccion.innerHTML = botonesHTML



  });
  
document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("juegos-container");

  try {
    const respuesta = await fetch("data/juegos.json");
    const juegos = await respuesta.json();

    juegos.forEach(juego => {
      if (juego.tipo === "publicado") {
        const card = document.createElement("div");
        card.className = "juego-card";
        card.innerHTML = `
          <img src="img/${juego.imagenes[0]}" alt="${juego.titulo}" />
          <h3>${juego.titulo}</h3>
          <p>${juego.descripcion}</p>
          <a href="juego.html?id=${juego.id}" class="btn btn-primary mt-2">Ver detalles</a>
        `;
        container.appendChild(card);
      }
    });

  } catch (error) {
    console.error("Error al cargar los juegos:", error);
    container.innerHTML = "<p>Error al cargar los juegos.</p>";
  }
});




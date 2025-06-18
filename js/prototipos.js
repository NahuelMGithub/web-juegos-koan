
document.addEventListener("DOMContentLoaded", async () => {
 const container = document.getElementById("prototipos-container");
  container.className = "juegos-flex-container"; // le damos la clase flex

  try {
    const respuesta = await fetch("data/juegos.json");
    const juegos = await respuesta.json();

    juegos.forEach(juego => {
      if (juego.tipo === "prototipo") {
        const card = document.createElement("div");
        card.className = "juego-flex-item";

        card.innerHTML = `
          <a href="juego.html?id=${juego.id}" class="juego-link">
            <img src="img/${juego.imagenes[0]}" alt="${juego.titulo}" class="juego-img" />
            <h5 class="juego-titulo">${juego.titulo}</h5>
          </a>
        `;

        container.appendChild(card);
      }
    });
  } catch (error) {
    console.error("Error al cargar los juegos:", error);
    container.innerHTML = "<p>Error al cargar los juegos.</p>";
  }
});





document.addEventListener("DOMContentLoaded", async () => {
  const containerJuegos = document.getElementById("juegos-container");
  const containerProtos = document.getElementById("prototipos-container"); 

  if (containerJuegos) containerJuegos.className = "juegos-flex-container";
  if (containerProtos) containerProtos.className = "juegos-flex-container";

  try {
    const respuesta = await fetch("data/juegos.json");
    const juegos = await respuesta.json();

    juegos.forEach(juego => {
      const card = document.createElement("div");
      card.className = "juego-flex-item";
      card.innerHTML = `
        <a href="juego.html?id=${juego.id}" class="juego-link">
          <img src="img/${juego.imagenes[0]}" alt="${juego.titulo}" class="juego-img" />
          <h5 class="juego-titulo">${juego.titulo}</h5>
        </a>
      `;

      if (juego.tipo === "publicado" && containerJuegos) {
        containerJuegos.appendChild(card);
      } else if (containerProtos) {
        containerProtos.appendChild(card);
      }
    });
  } catch (error) {
    console.error("Error al cargar los juegos:", error);
    if (containerJuegos) {
      containerJuegos.innerHTML = "<p>Error al cargar los juegos.</p>";
    }
  }
});

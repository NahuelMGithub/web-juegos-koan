document.addEventListener("DOMContentLoaded", async () => {
  const novedadesSection = document.getElementById("novedades");

  try {
    const response = await fetch("data/novedades.json");
    const novedades = await response.json();

    // Filtrar las que se deben mostrar
    const novedadesFiltradas = novedades.filter(n => n.mostrar);

    if (novedadesFiltradas.length === 0) return;

    // Crear indicadores
    const indicadores = novedadesFiltradas.map((_, index) => `
      <button type="button" data-bs-target="#carouselNovedades" data-bs-slide-to="${index}"
        class="${index === 0 ? "active" : ""}" aria-current="${index === 0 ? "true" : "false"}"
        aria-label="Slide ${index + 1}"></button>`).join("");

    // Crear items del carrusel
    const items = novedadesFiltradas.map((novedad, index) => `
      <div class="carousel-item ${index === 0 ? "active" : ""}">
        <img src="${novedad.imagen}" class="d-block w-100" alt="${novedad.alt}">
        <div class="carousel-caption d-none d-md-block">
          <h5>${novedad.titulo}</h5>
        </div>
      </div>`).join("");

    // Armar todo el carrusel
    const carruselHTML = `
      <div id="carouselNovedades" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-indicators">${indicadores}</div>
        <div class="carousel-inner">${items}</div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselNovedades" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Anterior</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselNovedades" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Siguiente</span>
        </button>
      </div>`;

    novedadesSection.innerHTML = carruselHTML;

  } catch (error) {
    console.error("Error al cargar novedades:", error);
  }
});

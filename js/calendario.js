document.addEventListener("DOMContentLoaded", () => {
  fetch("data/eventos.json")
    .then(res => res.json())
    .then(eventos => {
      const hoy = new Date();
      const futuros = [];
      const pasados = [];

      eventos.forEach(evento => {
        const fechaEvento = new Date(evento.fecha);
        if (fechaEvento >= hoy) {
          futuros.push(evento);
        } else {
          pasados.push(evento);
        }
      });

      renderEventos(futuros, "eventos-futuros", false);
      renderEventos(pasados, "eventos-pasados", true);
    })
    .catch(err => console.error("Error al cargar eventos:", err));
});

function renderEventos(lista, contenedorId, esPasado) {
  const contenedor = document.getElementById(contenedorId);
  lista.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));

  lista.forEach(evento => {
    const col = document.createElement("div");
    col.className = "col-md-6 col-lg-4";

    col.innerHTML = `
      <div class="card h-100 shadow">
        <img src="${evento.imagen}" class="card-img-top" alt="${evento.nombre}">
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${evento.nombre}</h5>
          <p class="card-text">
            <strong>📍 ${evento.ciudad}, ${evento.provincia}</strong><br>
            <strong>📅 ${formatFecha(evento.fecha)}</strong>
          </p>
          <div class="mt-auto">
            ${renderRedes(evento.redes)}
            ${esPasado ? `
              <a href="evento.html?id=${evento.id}" class="btn btn-outline-primary mt-3">
                Ver fotos
              </a>` : ""}
          </div>
        </div>
      </div>
    `;
    contenedor.appendChild(col);
  });
}

function renderRedes(redes = {}) {
  let html = '<div class="d-flex gap-2">';
  if (redes.instagram) {
    html += `<a href="${redes.instagram}" target="_blank" class="btn btn-sm btn-outline-dark">Instagram</a>`;
  }
  if (redes.web) {
    html += `<a href="${redes.web}" target="_blank" class="btn btn-sm btn-outline-secondary">Web</a>`;
  }
  html += '</div>';
  return html;
}

function formatFecha(fechaStr) {
  const fecha = new Date(fechaStr);
  return fecha.toLocaleDateString("es-AR", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
}

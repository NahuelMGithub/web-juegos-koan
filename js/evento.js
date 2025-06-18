document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const idEvento = params.get("id");

  if (!idEvento) {
    document.body.innerHTML = "<p class='text-center text-danger mt-5'>No se encontró el evento.</p>";
    return;
  }

  fetch("data/eventos.json")
    .then(res => res.json())
    .then(eventos => {
      const evento = eventos.find(e => e.id === idEvento);
      if (!evento) {
        document.body.innerHTML = "<p class='text-center text-danger mt-5'>Evento no encontrado.</p>";
        return;
      }

      // Título de página y encabezado
      document.getElementById("titlepage").innerText = `${evento.nombre} | KOAN`;
      document.getElementById("titulo-evento").innerText = evento.nombre;

      // Info general
      const fecha = new Date(evento.fecha).toLocaleDateString("es-AR", {
        day: "numeric", month: "long", year: "numeric"
      });
      document.getElementById("info-evento").innerText = `📍 ${evento.ciudad}, ${evento.provincia} — 📅 ${fecha}`;

      // Comentarios
      document.getElementById("comentarios-evento").innerText = evento.comentarios || "Sin comentarios disponibles.";

      // Galería
      const galeria = document.getElementById("galeria-fotos");
      if (evento.fotos && evento.fotos.length > 0) {
        evento.fotos.forEach(url => {
          const col = document.createElement("div");
          col.className = "col-sm-6 col-md-4 col-lg-3";
          col.innerHTML = `
            <div class="card h-100">
              <img src="${url}" class="card-img-top" alt="Foto del evento">
            </div>
          `;
          galeria.appendChild(col);
        });
      } else {
        galeria.innerHTML = "<p class='text-muted'>No hay fotos disponibles para este evento.</p>";
      }
    })
    .catch(err => {
      console.error("Error cargando evento:", err);
      document.body.innerHTML = "<p class='text-center text-danger mt-5'>Ocurrió un error al cargar los datos.</p>";
    });
});

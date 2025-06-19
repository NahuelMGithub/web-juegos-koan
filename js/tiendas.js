document.addEventListener("DOMContentLoaded", async () => {
  const main = document.querySelector("main");
  const contenedor = document.createElement("div");
  contenedor.className = "container my-4";
  main.appendChild(contenedor);

  try {
    const response = await fetch("data/tiendas.json");
    const tiendas = await response.json();

    const row = document.createElement("div");
    row.className = "row g-4"; // g-4 = gutter spacing

    tiendas.forEach(tienda => {
      const col = document.createElement("div");
      col.className = "col-12 col-md-6";

      const card = document.createElement("div");
      card.className = "card h-100";

      // Imagen principal
      const img = document.createElement("img");
      img.src = `img/${tienda.fotos[0]}`;
      img.className = "card-img-top tienda-img";
      img.alt = tienda.nombre;

      // Card body
      const cardBody = document.createElement("div");
      cardBody.className = "card-body d-flex flex-column";

      const title = document.createElement("h5");
      title.className = "card-title";
      title.textContent = tienda.nombre;

      const location = document.createElement("p");
      location.className = "card-subtitle mb-2 text-muted";
      location.textContent = `${tienda.ciudad}, ${tienda.provincia}`;

      // Links web e IG con iconos Bootstrap (o si querés agregar iconos externos)
      const linksDiv = document.createElement("div");
      linksDiv.className = "mb-2";

      if (tienda.web) {
        const aWeb = document.createElement("a");
        aWeb.href = tienda.web;
        aWeb.target = "_blank";
        aWeb.rel = "noopener noreferrer";
        aWeb.className = "me-3";
        aWeb.textContent = "Web";
        linksDiv.appendChild(aWeb);
      }

      // Dirección
/*       if (tienda.instagram) {
        const aIg = document.createElement("a");
        aIg.href = tienda.ig;
        aIg.target = "_blank";
        aIg.rel = "noopener noreferrer";
        aIg.textContent = "Instagram";
        linksDiv.appendChild(aIg);
      } */

      // Dirección
      const direccion = document.createElement("p");
      direccion.textContent = tienda.direccion;

      // Botón para mapa
      const btnMapa = document.createElement("button");
      btnMapa.className = "btn btn-sm btn-outline-primary mt-auto";
      btnMapa.textContent = "Ver mapa";

      // Iframe mapa oculto al inicio
      const mapa = document.createElement("div");
      mapa.className = "mt-3";
      mapa.style.display = "none";
      mapa.innerHTML = tienda.iframe;

      btnMapa.addEventListener("click", () => {
        if (mapa.style.display === "none") {
          mapa.style.display = "block";
          btnMapa.textContent = "Ocultar mapa";
        } else {
          mapa.style.display = "none";
          btnMapa.textContent = "Ver mapa";
        }
      });

      cardBody.appendChild(title);
      cardBody.appendChild(location);
      cardBody.appendChild(linksDiv);
      cardBody.appendChild(direccion);
      cardBody.appendChild(btnMapa);
      cardBody.appendChild(mapa);

      card.appendChild(img);
      card.appendChild(cardBody);
      col.appendChild(card);
      row.appendChild(col);
    });

    contenedor.appendChild(row);

  } catch (error) {
    main.innerHTML = "<p>Error al cargar las tiendas.</p>";
    console.error(error);
  }
});

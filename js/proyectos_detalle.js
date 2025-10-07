document.addEventListener('DOMContentLoaded', function () {
  // 1) Tomar el id de la URL
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');

  // 2) Obtener todos los artículos de detalle
  const detalles = document.querySelectorAll('.proyecto-detalle');
  const noEncontrado = document.getElementById('noEncontrado');
  const tituloProyecto = document.getElementById('tituloProyecto');
  const subtituloProyecto = document.getElementById('subtituloProyecto');

  // 3) Mostrar solo el proyecto que corresponde al id
  let mostrado = false;
  detalles.forEach(tarjeta => {
    const idTarjeta = tarjeta.getAttribute('data-id');
    if (id && idTarjeta === id) {
      tarjeta.style.display = 'block';
      mostrado = true;

      if (tituloProyecto && tarjeta.dataset.title) tituloProyecto.textContent = tarjeta.dataset.title;
      if (subtituloProyecto && tarjeta.dataset.subtitle) subtituloProyecto.textContent = tarjeta.dataset.subtitle;

      const imagenPrincipal = tarjeta.querySelector('.detalle-media > img');
      tarjeta.querySelectorAll('.miniaturas img').forEach(miniatura => {
        miniatura.addEventListener('click', () => {
          if (imagenPrincipal && miniatura.src) imagenPrincipal.src = miniatura.src;
        });
      });

    } else {
      tarjeta.style.display = 'none';
    }
  });

  // 4) Manejo de no encontrado
  if (!mostrado) {
    if (noEncontrado) noEncontrado.hidden = false;
    if (tituloProyecto) tituloProyecto.textContent = 'Proyecto no encontrado';
    if (subtituloProyecto) subtituloProyecto.textContent = 'Verificá el enlace o volvé al listado';
  }
});

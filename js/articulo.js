document.addEventListener('DOMContentLoaded', function () {
  const articulos = Array.from(document.querySelectorAll('.articulo'));
  const heroTitulo = document.getElementById('tituloHeroe');
  const heroSubtitulo = document.getElementById('subtituloHeroe');

  // Obtener id desde ?id=#
  const params = new URLSearchParams(window.location.search);
  let id = parseInt(params.get('id'), 10);

  const idsValidos = articulos.map(a => parseInt(a.dataset.id, 10)).sort((a, b) => a - b);
  if (!idsValidos.includes(id)) id = idsValidos[0];

  function mostrarArticulo(articuloId) {
    articulos.forEach(a => a.classList.remove('activo'));
    const activo = document.querySelector(`.articulo[data-id="${articuloId}"]`);
    if (!activo) return;

    activo.classList.add('activo');

    const elTitulo = activo.querySelector('.articulo-titulo');
    const elCategoria = activo.querySelector('.articulo-categoria');

    if (heroTitulo) {
      heroTitulo.textContent = elTitulo ? elTitulo.textContent : 'Artículo';
    }
    if (heroSubtitulo) {
      heroSubtitulo.textContent = elCategoria
        ? `Categoría: ${elCategoria.textContent}`
        : 'Lecturas y reflexiones de Ecos Arquitectura';
    }

    document.title = (elTitulo ? elTitulo.textContent + ' - ' : '') + 'Ecos Arquitectura';

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  mostrarArticulo(id);

  window.addEventListener('popstate', () => {
    const nuevosParams = new URLSearchParams(window.location.search);
    const nuevoId = parseInt(nuevosParams.get('id'), 10);
    if (idsValidos.includes(nuevoId)) mostrarArticulo(nuevoId);
  });
});

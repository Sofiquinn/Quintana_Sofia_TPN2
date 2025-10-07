document.addEventListener('DOMContentLoaded', () => {
  const botonesFiltro = document.querySelectorAll('.btn-filtro');
  const itemsProyecto = document.querySelectorAll('.proyecto-item');

  function filtrarProyectos(categoria) {
    itemsProyecto.forEach(item => {
      const categoriaItem = item.dataset.category;
      const mostrar = categoria === 'all' || categoriaItem === categoria;

      if (mostrar) {
        item.style.display = 'block';
        item.classList.add('filtrar-entrar');
        setTimeout(() => item.classList.remove('filtrar-entrar'), 500);
      } else {
        item.classList.add('filtrar-salir');
        setTimeout(() => {
          item.style.display = 'none';
          item.classList.remove('filtrar-salir');
        }, 300);
      }
    });
  }

  // Click en botones
  botonesFiltro.forEach(btn => {
    btn.addEventListener('click', () => {
      botonesFiltro.forEach(b => b.classList.remove('activo'));
      btn.classList.add('activo');

      const categoria = btn.getAttribute('data-filter');
      filtrarProyectos(categoria);
    });
  });
});

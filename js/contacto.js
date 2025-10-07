document.addEventListener('DOMContentLoaded', function () {
  const formulario = document.getElementById('formulario-contacto');
  if (!formulario) return; // por si el script carga en otra página

  const btnEnviar = document.getElementById('btn-enviar');
  const estado = document.getElementById('estado-formulario');

  const $ = (id) => document.getElementById(id);
  const campos = {
    nombre: $('nombre'),
    email: $('email'),
    telefono: $('telefono'),
    mensaje: $('mensaje'),
  };
  const errores = {
    nombre: $('err-nombre'),
    email: $('err-email'),
    telefono: $('err-telefono'),
    mensaje: $('err-mensaje'),
  };

  const esEmailValido = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).toLowerCase());

  const esTelefonoValido = (telefono) => {
    const digitos = telefono.replace(/\D/g, '');
    return digitos.length >= 8;
  };

  function marcarError(input, msgEl, mensaje) {
    input.classList.add('error');
    if (msgEl) msgEl.textContent = mensaje || '';
  }

  function limpiarError(input, msgEl) {
    input.classList.remove('error');
    if (msgEl) msgEl.textContent = '';
  }

  function validar() {
    let ok = true;

    if (!campos.nombre.value.trim()) {
      marcarError(campos.nombre, errores.nombre, 'El nombre es obligatorio.');
      ok = false;
    } else {
      limpiarError(campos.nombre, errores.nombre);
    }

    if (!campos.email.value.trim()) {
      marcarError(campos.email, errores.email, 'El email es obligatorio.');
      ok = false;
    } else if (!esEmailValido(campos.email.value)) {
      marcarError(campos.email, errores.email, 'Ingresá un email válido.');
      ok = false;
    } else {
      limpiarError(campos.email, errores.email);
    }

    if (!campos.telefono.value.trim()) {
      marcarError(campos.telefono, errores.telefono, 'El teléfono es obligatorio.');
      ok = false;
    } else if (!esTelefonoValido(campos.telefono.value)) {
      marcarError(campos.telefono, errores.telefono, 'Ingresá un teléfono válido.');
      ok = false;
    } else {
      limpiarError(campos.telefono, errores.telefono);
    }

    if (!campos.mensaje.value.trim()) {
      marcarError(campos.mensaje, errores.mensaje, 'El mensaje es obligatorio.');
      ok = false;
    } else {
      limpiarError(campos.mensaje, errores.mensaje);
    }

    return ok;
  }

  Object.values(campos).forEach((input) => {
    input.addEventListener('blur', validar);
    input.addEventListener('input', () => {
      const clave = input.id; 
      limpiarError(input, errores[clave]);
      if (estado) estado.textContent = '';
    });
  });

  formulario.addEventListener('submit', function (e) {
    e.preventDefault();
    if (estado) estado.textContent = '';

    if (!validar()) {
      if (estado) estado.textContent = 'Revisá los campos marcados en rojo.';
      return;
    }

    // Simular envío
    if (btnEnviar) {
      btnEnviar.disabled = true;
      const original = btnEnviar.textContent;
      btnEnviar.textContent = 'Enviando...';

      setTimeout(() => {
        btnEnviar.disabled = false;
        btnEnviar.textContent = original;
        formulario.reset();
        if (estado) estado.textContent = '¡Gracias! Recibimos tu mensaje y te contactaremos pronto.';
      }, 1200);
    }
  });
});

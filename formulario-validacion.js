$(function () {
  const $form = $('#formulario-contacto');
  if (!$form.length) return;

  const $btn = $('#btn-enviar');
  const $estado = $('#estado-formulario');

  const errorTargets = {
    nombre:   $('#err-nombre'),
    email:    $('#err-email'),
    telefono: $('#err-telefono'),
    mensaje:  $('#err-mensaje')
  };

  $form.validate({
    rules: {
      nombre:   { required: true, minlength: 2 },
      email:    { required: true, email: true },
      telefono: {
        required: true,
        normalizer: function (value) { return value; },
        digitsCount: true
      },
      mensaje:  { required: true, minlength: 1 }
    },
    messages: {
      nombre:   { required: 'El nombre es obligatorio.', minlength: 'Mínimo 2 caracteres.' },
      email:    { required: 'El email es obligatorio.',  email: 'Ingresá un email válido.' },
      telefono: { required: 'El teléfono es obligatorio.' },
      mensaje:  { required: 'El mensaje es obligatorio.' }
    },

    errorElement: 'small',
    errorClass: 'msg-error--visible',
    highlight: function (el) { el.classList.add('error'); },
    unhighlight: function (el) { el.classList.remove('error'); },

    errorPlacement: function (error, element) {
      const id = element.attr('id'); 
      const $target = errorTargets[id];
      if ($target && $target.length) {
        $target.empty().append(error); 
      } else {
        error.insertAfter(element);   
      }
    },

    submitHandler: function (form) {
      if ($estado.length) $estado.text('');
      if ($btn.length) {
        $btn.prop('disabled', true);
        const original = $btn.text();
        $btn.text('Enviando...');

        setTimeout(() => {
          $btn.prop('disabled', false).text(original);
          form.reset();
          if ($estado.length) {
            $estado.text('¡Gracias! Recibimos tu mensaje y te contactaremos pronto.');
          }
        }, 1200);
      } else {
        form.submit();
      }
    }
  });

  $.validator.addMethod('digitsCount', function (value, element) {
    const digits = (value || '').replace(/\D/g, '');
    return digits.length >= 8;
  }, 'Ingresá un teléfono válido.');
});

document.addEventListener("DOMContentLoaded", function () {
  var form = document.getElementById("form-perfil");
  if (!form) {
    return;
  }

  var campos = {
    nombre: document.getElementById("nombre"),
    correo: document.getElementById("correo"),
    telefono: document.getElementById("telefono"),
    nacimiento: document.getElementById("nacimiento"),
    cedula: document.getElementById("cedula"),
    direccion: document.getElementById("direccion"),
  };

  var alerta = document.getElementById("perfil-alerta");
  var tituloPerfil = document.querySelector(".profile-header-info h2");
  var nombreSidebar = document.querySelector(".user-name");

  function texto(campo) {
    return campo.value.trim();
  }

  function mostrarError(campo, mensaje) {
    var aviso = form.querySelector('[data-error-for="' + campo.id + '"]');
    campo.classList.add("is-invalid");
    campo.classList.remove("is-valid");
    if (aviso) {
      aviso.textContent = mensaje;
    }
  }

  function limpiarError(campo) {
    var aviso = form.querySelector('[data-error-for="' + campo.id + '"]');
    campo.classList.remove("is-invalid");
    campo.classList.add("is-valid");
    if (aviso) {
      aviso.textContent = "";
    }
  }

  function mostrarAlerta(tipo, mensaje) {
    alerta.hidden = false;
    alerta.className = "form-alert form-alert--" + tipo;
    alerta.textContent = mensaje;
  }

  function validarNombre(campo) {
    var valor = texto(campo);

    if (!valor) {
      mostrarError(campo, "El nombre es obligatorio.");
      return false;
    }

    if (valor.length < 5) {
      mostrarError(campo, "Escribe al menos 5 caracteres.");
      return false;
    }

    if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñÜü\s]+$/.test(valor)) {
      mostrarError(campo, "El nombre solo puede contener letras y espacios.");
      return false;
    }

    limpiarError(campo);
    return true;
  }

  function validarCorreo(campo) {
    var valor = texto(campo);

    if (!valor) {
      mostrarError(campo, "El correo es obligatorio.");
      return false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor)) {
      mostrarError(campo, "Ingresa un correo electrónico válido.");
      return false;
    }

    limpiarError(campo);
    return true;
  }

  function validarTelefono(campo) {
    var valor = texto(campo);

    if (!valor) {
      mostrarError(campo, "El teléfono es obligatorio.");
      return false;
    }

    if (!/^(809|829|849)[-\s]?\d{3}[-\s]?\d{4}$/.test(valor)) {
      mostrarError(campo, "Usa un teléfono dominicano: 809-000-0000.");
      return false;
    }

    limpiarError(campo);
    return true;
  }

  function validarNacimiento(campo) {
    var valor = texto(campo);

    if (!valor) {
      mostrarError(campo, "La fecha de nacimiento es obligatoria.");
      return false;
    }

    var fecha = new Date(valor + "T00:00:00");
    if (Number.isNaN(fecha.getTime())) {
      mostrarError(campo, "La fecha no es válida.");
      return false;
    }

    var hoy = new Date();
    var edad = hoy.getFullYear() - fecha.getFullYear();
    var mes = hoy.getMonth() - fecha.getMonth();
    if (mes < 0 || (mes === 0 && hoy.getDate() < fecha.getDate())) {
      edad -= 1;
    }

    if (fecha > hoy) {
      mostrarError(campo, "La fecha no puede ser futura.");
      return false;
    }

    if (edad < 16) {
      mostrarError(campo, "Debes tener al menos 16 años.");
      return false;
    }

    if (edad > 90) {
      mostrarError(campo, "Revisa la fecha de nacimiento.");
      return false;
    }

    limpiarError(campo);
    return true;
  }

  function validarCedula(campo) {
    var valor = texto(campo);

    if (!valor) {
      mostrarError(campo, "La cédula es obligatoria.");
      return false;
    }

    if (!/^\d{3}-\d{7}-\d$/.test(valor)) {
      mostrarError(campo, "Usa el formato 000-0000000-0.");
      return false;
    }

    limpiarError(campo);
    return true;
  }

  function validarDireccion(campo) {
    var valor = texto(campo);

    if (!valor) {
      mostrarError(campo, "La dirección es obligatoria.");
      return false;
    }

    if (valor.length < 8) {
      mostrarError(campo, "Escribe una dirección más completa.");
      return false;
    }

    limpiarError(campo);
    return true;
  }

  var validadores = {
    nombre: validarNombre,
    correo: validarCorreo,
    telefono: validarTelefono,
    nacimiento: validarNacimiento,
    cedula: validarCedula,
    direccion: validarDireccion,
  };

  Object.keys(campos).forEach(function (id) {
    var campo = campos[id];
    campo.addEventListener("blur", function () {
      validadores[id](campo);
    });
    campo.addEventListener("input", function () {
      if (campo.classList.contains("is-invalid")) {
        validadores[id](campo);
      }
    });
  });

  form.addEventListener("submit", function (evento) {
    evento.preventDefault();

    var esValido = true;
    Object.keys(campos).forEach(function (id) {
      if (!validadores[id](campos[id])) {
        esValido = false;
      }
    });

    if (!esValido) {
      mostrarAlerta("error", "Revisa los campos marcados antes de guardar.");
      var primero = form.querySelector(".is-invalid");
      if (primero) {
        primero.focus();
      }
      return;
    }

    var nombre = texto(campos.nombre);
    if (tituloPerfil) {
      tituloPerfil.textContent = nombre;
    }
    if (nombreSidebar) {
      nombreSidebar.textContent = nombre;
    }

    mostrarAlerta("ok", "Los datos del perfil se guardaron correctamente.");
  });
});

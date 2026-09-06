// ============================================================
// GAUD - Interactividad del lado cliente (Fase 2)
// Autor: Julio Toribio
// Cubre las tarjetas de ClickUp:
//   - Validaciones Index & Registro
//   - Validaciones de Perfil
//   - Cerrar Sesión & Menú Perfil
// ============================================================

document.addEventListener("DOMContentLoaded", () => {

  // ---------- Variables y tipos de datos ----------
  const MIN_PASSWORD_LENGTH = 8;                 // number
  const NOMBRE_MIN_LENGTH = 3;                    // number
  const REDIRECCION_MS = 1200;                    // number
  const MENSAJE_EXITO_LOGIN = "Inicio de sesión correcto. Redirigiendo...";   // string
  const MENSAJE_EXITO_REGISTRO = "Cuenta creada correctamente. Ya puedes iniciar sesión."; // string

  // Arreglo aplicado a un caso real: reglas de validación reutilizables
  // para los campos de los formularios de autenticación (login / registro)
  const reglasAuth = [
    { id: "email",              tipo: "email",        mensaje: "Ingresa un correo electrónico válido." },
    { id: "password",           tipo: "password",      mensaje: `La contraseña debe tener al menos ${MIN_PASSWORD_LENGTH} caracteres.` },
    { id: "nombre",             tipo: "texto",         mensaje: `El nombre debe tener al menos ${NOMBRE_MIN_LENGTH} caracteres.` },
    { id: "correo",             tipo: "email",         mensaje: "Ingresa un correo electrónico válido." },
    { id: "universidad",       tipo: "select",        mensaje: "Selecciona tu universidad." },
    { id: "carrera",            tipo: "select",        mensaje: "Selecciona tu carrera." },
    { id: "confirmar-password", tipo: "confirmacion",  mensaje: "Las contraseñas no coinciden." },
    { id: "terminos",          tipo: "checkbox",      mensaje: "Debes aceptar los términos y condiciones." },
  ];

  // ---------- Funciones propias (con parámetros y retorno) ----------

  // 1) Valida el formato de un correo con expresión regular.
  function esCorreoValido(valor) {
    const patron = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return patron.test(valor.trim());
  }

  // 2) Valida un campo individual según su regla. Retorna boolean.
  function validarCampo(input, regla) {
    if (!input) return true; // el campo no existe en esta página, se ignora

    const valor = input.type === "checkbox" ? input.checked : input.value.trim();
    let esValido = true;

    switch (regla.tipo) {
      case "email":
        esValido = valor.length > 0 && esCorreoValido(valor);
        break;
      case "password":
        esValido = valor.length >= MIN_PASSWORD_LENGTH;
        break;
      case "texto":
        esValido = valor.length >= NOMBRE_MIN_LENGTH;
        break;
      case "select":
        esValido = valor !== "";
        break;
      case "checkbox":
        esValido = valor === true;
        break;
      case "confirmacion": {
        const passwordInput = document.getElementById("password");
        esValido = passwordInput ? (valor === passwordInput.value.trim() && valor.length > 0) : true;
        break;
      }
      default:
        esValido = valor.length > 0;
    }

    esValido ? limpiarError(input) : mostrarError(input, regla.mensaje);
    return esValido;
  }

  // 3) Muestra un mensaje de error debajo del input (manipulación del DOM).
  function mostrarError(input, mensaje) {
    input.classList.add("input-error");

    let errorSpan = input.parentElement.querySelector(".error-message");
    if (!errorSpan) {
      errorSpan = document.createElement("span");
      errorSpan.className = "error-message";
      input.parentElement.appendChild(errorSpan);
    }
    errorSpan.textContent = mensaje;
  }

  // 4) Limpia el estado de error de un input. Retorna boolean (si había un error).
  function limpiarError(input) {
    const habiaError = input.classList.contains("input-error");
    input.classList.remove("input-error");
    const errorSpan = input.parentElement.querySelector(".error-message");
    if (errorSpan) errorSpan.textContent = "";
    return habiaError;
  }

  // 5) Recorre el arreglo de reglas y valida el formulario completo. Retorna boolean.
  function validarFormulario(form, reglas) {
    let formularioValido = true;
    reglas.forEach((regla) => {
      const input = form.querySelector(`#${regla.id}`);
      if (input && !validarCampo(input, regla)) {
        formularioValido = false;
      }
    });
    return formularioValido;
  }

  // 6) Muestra un mensaje de éxito temporal y redirige sin recargar la página de golpe.
  function mostrarExitoYRedirigir(mensaje, destino) {
    const card = document.querySelector(".auth-card");
    if (!card) return;

    let successBox = card.querySelector(".success-message");
    if (!successBox) {
      successBox = document.createElement("div");
      successBox.className = "success-message";
      card.insertBefore(successBox, card.querySelector("form"));
    }
    successBox.textContent = mensaje;

    setTimeout(() => { window.location.href = destino; }, REDIRECCION_MS);
  }

  // 7) Cierra la sesión del usuario y redirige al login.
  function cerrarSesion() {
    sessionStorage.removeItem("usuarioGAUD");
    window.location.href = "index.html";
  }

  // ---------- Formulario de Login (index.html) ----------
  const formulario = document.querySelector("form");
  const esPaginaLogin = document.getElementById("email") && document.getElementById("password") && !document.getElementById("nombre");

  if (formulario && esPaginaLogin) {
    const camposLogin = reglasAuth.filter(r => ["email", "password"].includes(r.id));

    camposLogin.forEach(regla => {
      const input = document.getElementById(regla.id);
      if (input) input.addEventListener("blur", () => validarCampo(input, regla));
    });

    formulario.addEventListener("submit", (event) => {
      event.preventDefault(); // nunca recarga la página
      if (validarFormulario(formulario, camposLogin)) {
        mostrarExitoYRedirigir(MENSAJE_EXITO_LOGIN, "dashboard-tommisan.html");
      }
    });
  }

  // ---------- Formulario de Registro (registro.html) ----------
  const esPaginaRegistro = document.getElementById("nombre") && document.getElementById("confirmar-password");

  if (formulario && esPaginaRegistro) {
    const camposRegistro = reglasAuth.filter(r =>
      ["nombre", "correo", "universidad", "carrera", "password", "confirmar-password", "terminos"].includes(r.id)
    );

    camposRegistro.forEach(regla => {
      const input = document.getElementById(regla.id);
      if (input) {
        const evento = (regla.tipo === "select" || regla.tipo === "checkbox") ? "change" : "blur";
        input.addEventListener(evento, () => validarCampo(input, regla));
      }
    });

    formulario.addEventListener("submit", (event) => {
      event.preventDefault();
      if (validarFormulario(formulario, camposRegistro)) {
        mostrarExitoYRedirigir(MENSAJE_EXITO_REGISTRO, "index.html");
      }
    });
  }

  // ---------- Menú del avatar + Cerrar sesión (dashboard / perfil) ----------
  const avatar = document.getElementById("ava");
  const menu = document.getElementById("menu");

  if (avatar && menu) {
    avatar.addEventListener("click", (event) => {
      event.stopPropagation(); // evita que el click cierre el menú de inmediato
      menu.classList.toggle("show");
    });

    document.addEventListener("click", () => menu.classList.remove("show"));

    const linkSalir = Array.from(menu.querySelectorAll("a")).find(a => a.textContent.trim().toLowerCase() === "salir");
    if (linkSalir) {
      linkSalir.addEventListener("click", (event) => {
        event.preventDefault();
        cerrarSesion();
      });
    }
  }

  // ---------- Edición de Perfil (perfil.html) ----------
  const btnEditarPerfil = document.getElementById("btnEditarPerfil");

  // 8) Activa el modo edición: convierte los <span> marcados en inputs reales.
  function activarEdicionPerfil() {
    const camposEditables = document.querySelectorAll(".info-value[data-editable]");

    camposEditables.forEach(span => {
      const valorActual = span.textContent.trim();
      const tipo = span.dataset.editable; // "email" | "tel" | "texto"

      const input = document.createElement("input");
      input.type = (tipo === "email") ? "email" : (tipo === "tel") ? "tel" : "text";
      input.value = valorActual;
      input.id = span.dataset.campo;
      input.dataset.editable = tipo;
      input.className = "profile-edit-input";

      span.replaceWith(input);
    });

    btnEditarPerfil.textContent = "Guardar cambios";
    return true;
  }

  // 9) Valida y guarda los cambios del perfil (vuelve a convertir los inputs en <span>). Retorna boolean.
  function guardarPerfil() {
    const inputsEditados = document.querySelectorAll(".profile-edit-input");
    let todoValido = true;

    inputsEditados.forEach(input => {
      let valido = true;
      let mensaje = "Este campo no es válido.";

      if (input.dataset.editable === "email") {
        valido = esCorreoValido(input.value);
        mensaje = "Ingresa un correo institucional válido.";
      } else if (input.dataset.editable === "tel") {
        valido = /^[\d\s()+-]{7,}$/.test(input.value.trim());
        mensaje = "Ingresa un teléfono válido, ej. +1 (809) 555-0123.";
      } else {
        valido = input.value.trim().length >= NOMBRE_MIN_LENGTH;
      }

      valido ? limpiarError(input) : mostrarError(input, mensaje);
      if (!valido) todoValido = false;
    });

    if (!todoValido) return false;

    inputsEditados.forEach(input => {
      const span = document.createElement("span");
      span.className = "info-value";
      span.textContent = input.value.trim();
      span.dataset.editable = input.dataset.editable;
      span.dataset.campo = input.id;
      input.replaceWith(span);
    });

    btnEditarPerfil.textContent = "Editar perfil";
    return true;
  }

  if (btnEditarPerfil) {
    let modoEdicion = false;

    btnEditarPerfil.addEventListener("click", () => {
      if (!modoEdicion) {
        activarEdicionPerfil();
        modoEdicion = true;
      } else {
        const guardadoExitoso = guardarPerfil();
        if (guardadoExitoso) modoEdicion = false;
      }
    });
  }

});

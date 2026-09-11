const GAUD_Validaciones = (function () {
  function esRequerido(valor) {
    if (valor === null || valor === undefined) return false;
    return String(valor).trim().length > 0;
  }

  function esEmailValido(valor) {
    if (!esRequerido(valor)) return false;
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(valor).trim());
  }

  function esNombreValido(valor) {
    if (!esRequerido(valor)) return false;
    const partes = String(valor).trim().split(/\s+/);
    return partes.length >= 2 && partes.every(function (p) { return /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ'-.]+$/.test(p); });
  }

  function longitudMinima(valor, min = 1) {
    if (!esRequerido(valor)) return false;
    return String(valor).trim().length >= min;
  }

  function contrasenasCoinciden(a, b) {
    return esRequerido(a) && String(a) === String(b);
  }

  function esSeleccionado(valor) {
    return esRequerido(valor);
  }

  function esTelefonoValido(valor) {
    if (!esRequerido(valor)) return false;
    return /^\+?[\d\s().-]{7,20}$/.test(String(valor).trim());
  }

  function obtenerCampo(form, id) {
    return form.querySelector(`[name="${id}"], #${id}`);
  }

  function mostrarError(campo, mensaje) {
    if (!campo) return;
    campo.classList.add("campo-invalido");
    let err = campo.parentElement.querySelector(".campo-error");
    if (!err) {
      err = document.createElement("div");
      err.className = "campo-error";
      campo.parentElement.appendChild(err);
    }
    err.textContent = mensaje;
  }

  function limpiarError(campo) {
    if (!campo) return;
    campo.classList.remove("campo-invalido");
    const err = campo.parentElement.querySelector(".campo-error");
    if (err) err.remove();
  }

  function limpiarFormulario(form) {
    form.querySelectorAll(".campo-invalido").forEach(function (el) { el.classList.remove("campo-invalido"); });
    form.querySelectorAll(".campo-error").forEach(function (el) { el.remove(); });
  }

  function validarFormulario(form, config) {
    limpiarFormulario(form);
    let valido = true;
    let primero = null;
    for (const [id, reglas] of Object.entries(config)) {
      const campo = obtenerCampo(form, id);
      if (!campo) continue;
      const valor = campo.type === "checkbox" ? campo.checked : campo.value;
      for (const regla of reglas) {
        if (!regla.valida(valor, campo)) {
          valido = false;
          if (!primero) primero = campo;
          mostrarError(campo, regla.mensaje);
          break;
        }
      }
    }
    if (primero) primero.focus();
    return valido;
  }

  function enlazar(form, config, onExito) {
    if (!form) return;
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (validarFormulario(form, config)) {
        limpiarFormulario(form);
        if (typeof onExito === "function") onExito(form);
      }
    });
    function limpiarAlEditar(e) {
      if (e.target && e.target.classList) limpiarError(e.target);
    }
    form.addEventListener("input", limpiarAlEditar);
    form.addEventListener("change", limpiarAlEditar);
  }

  return {
    esRequerido,
    esEmailValido,
    esNombreValido,
    longitudMinima,
    contrasenasCoinciden,
    esSeleccionado,
    esTelefonoValido,
    obtenerCampo,
    mostrarError,
    limpiarError,
    limpiarFormulario,
    validarFormulario,
    enlazar
  };
})();

if (typeof document !== "undefined") {
  document.addEventListener("DOMContentLoaded", function () {
    const V = GAUD_Validaciones;
    const form = document.querySelector("form");
    if (!form) return;

    const esRegistro = !!form.querySelector("#nombre");

    const reglas = esRegistro
      ? {
          nombre: [
            { valida: function (v) { return V.esRequerido(v); }, mensaje: "El nombre es obligatorio" },
            { valida: function (v) { return V.esNombreValido(v); }, mensaje: "Ingresa tu nombre y apellido" },
          ],
          correo: [
            { valida: function (v) { return V.esRequerido(v); }, mensaje: "El correo es obligatorio" },
            { valida: function (v) { return V.esEmailValido(v); }, mensaje: "Ingresa un correo válido" },
          ],
          universidad: [
            { valida: function (v) { return V.esSeleccionado(v); }, mensaje: "Selecciona una universidad" },
          ],
          carrera: [
            { valida: function (v) { return V.esSeleccionado(v); }, mensaje: "Selecciona una carrera" },
          ],
          password: [
            { valida: function (v) { return V.esRequerido(v); }, mensaje: "La contraseña es obligatoria" },
            { valida: function (v) { return V.longitudMinima(v, 6); }, mensaje: "Mínimo 6 caracteres" },
          ],
          confirmar: [
            {
              valida: function (v, campo) { return V.contrasenasCoinciden(v, campo.form.querySelector("#password").value); },
              mensaje: "Las contraseñas no coinciden"
            },
          ],
          terminos: [
            { valida: function (v) { return v === true; }, mensaje: "Debes aceptar los términos" },
          ],
        }
      : {
          email: [
            { valida: function (v) { return V.esRequerido(v); }, mensaje: "El correo es obligatorio" },
            { valida: function (v) { return V.esEmailValido(v); }, mensaje: "Ingresa un correo válido" },
          ],
          password: [
            { valida: function (v) { return V.esRequerido(v); }, mensaje: "La contraseña es obligatoria" },
            { valida: function (v) { return V.longitudMinima(v, 6); }, mensaje: "Mínimo 6 caracteres" },
          ],
        };

    function irDashboard() {
      window.location.href = "dashboard-tommisan.html";
    }

    function onExito(f) {
      if (esRegistro) {
        irDashboard();
        return;
      }
      const email = f.querySelector("#email").value.trim();
      const password = f.querySelector("#password").value;
      const u = typeof GAUD_DATA !== "undefined" ? GAUD_DATA.usuario : null;
      if (u && email === u.email && password === u.password) {
        sessionStorage.setItem("gaud_sesion", u.email);
        irDashboard();
      } else {
        V.mostrarError(f.querySelector("#password"), "Credenciales incorrectas");
      }
    }

    V.enlazar(form, reglas, onExito);
  });
}

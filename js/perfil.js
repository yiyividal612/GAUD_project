const GAUD_Perfil = (function () {
  function V() {
    return typeof GAUD_Validaciones !== "undefined" ? GAUD_Validaciones : null;
  }

  const CAMPOS = {
    "correo-perfil": { clave: "email", validar: function (v) { return V().esEmailValido(v); }, mensaje: "Ingresa un correo válido" },
    "telefono-perfil": { clave: "telefono", validar: function (v) { return V().esTelefonoValido(v); }, mensaje: "Ingresa un teléfono válido" },
    "direccion-perfil": { clave: "direccion", validar: function (v) { return V().esRequerido(v); }, mensaje: "La dirección es obligatoria" }
  };

  function calcularProgreso(aprobados, totales) {
    if (!totales) return 0;
    return Math.round((aprobados / totales) * 1000) / 10;
  }

  function resumenAcademico(pensum) {
    const aprobadas = pensum.filter(function (a) { return a.estado === "aprobada"; });
    const creditosAprobados = aprobadas.reduce(function (s, a) { return s + a.creditos; }, 0);
    const creditosTotales = pensum.reduce(function (s, a) { return s + a.creditos; }, 0);
    const ponderado = aprobadas.reduce(function (s, a) { return s + a.calificacion * a.creditos; }, 0);
    const indice = creditosAprobados ? Math.round((ponderado / creditosAprobados) * 100) / 100 : 0;
    const pendientes = pensum.filter(function (a) { return a.estado === "pendiente"; }).length;
    return {
      indice,
      creditosAprobados,
      creditosTotales,
      creditosRestantes: creditosTotales - creditosAprobados,
      cursadas: aprobadas.length,
      pendientes,
      porcentaje: calcularProgreso(creditosAprobados, creditosTotales)
    };
  }

  function setTexto(sel, txt) {
    if (typeof document === "undefined") return;
    const el = document.querySelector(sel);
    if (el) el.textContent = txt;
  }

  function poblarPerfil() {
    if (typeof document === "undefined" || typeof GAUD_DATA === "undefined") return;
    const u = GAUD_DATA.usuario;
    setTexto(".profile-header-info h2", u.nombre);
    setTexto('[data-campo="correo-perfil"]', u.email);
    setTexto('[data-campo="telefono-perfil"]', u.telefono);
    setTexto('[data-campo="direccion-perfil"]', u.direccion);
  }

  function poblarAcademico() {
    if (typeof document === "undefined" || typeof GAUD_DATA === "undefined") return;
    const res = resumenAcademico(GAUD_DATA.pensum);
    const fill = document.querySelector(".progress-fill");
    if (!fill) return;
    fill.style.width = `${res.porcentaje}%`;
    const card = fill.closest ? fill.closest(".card") : null;
    if (card) {
      const badge = card.querySelector(".badge");
      if (badge) badge.textContent = `${res.porcentaje}%`;
    }
    const labels = document.querySelectorAll(".progress-labels span");
    if (labels.length >= 2) {
      labels[0].textContent = `${res.creditosAprobados} créditos aprobados`;
      labels[1].textContent = `${res.creditosRestantes} créditos restantes`;
    }
  }

  let editando = false;
  let originales = {};

  function mostrarBotones(enEdicion) {
    if (typeof document === "undefined") return;
    const editar = document.querySelector("#btnEditarPerfil");
    const guardar = document.querySelector("#btnGuardarPerfil");
    const cancelar = document.querySelector("#btnCancelarPerfil");
    if (editar) editar.style.display = enEdicion ? "none" : "";
    if (guardar) guardar.style.display = enEdicion ? "" : "none";
    if (cancelar) cancelar.style.display = enEdicion ? "" : "none";
  }

  function limpiarErrores() {
    if (typeof document === "undefined") return;
    document.querySelectorAll(".campo-error").forEach(function (e) { e.remove(); });
    document.querySelectorAll(".campo-invalido").forEach(function (e) { e.classList.remove("campo-invalido"); });
  }

  function iniciarEdicion() {
    if (typeof document === "undefined" || typeof GAUD_DATA === "undefined") return;
    if (editando) return;
    editando = true;
    const campos = document.querySelectorAll(".info-value[data-editable]");
    originales = {};
    campos.forEach(function (campo) {
      const clave = campo.dataset.campo;
      originales[clave] = { texto: campo.textContent, editable: campo.dataset.editable };
      const input = document.createElement("input");
      input.className = "profile-edit-input";
      input.dataset.campo = clave;
      input.value = campo.textContent;
      campo.replaceWith(input);
    });
    mostrarBotones(true);
  }

  function finalizarEdicion(valores) {
    if (typeof document === "undefined") return;
    Object.entries(valores).forEach(function ([clave, txt]) {
      const input = document.querySelector(`input[data-campo="${clave}"]`);
      if (!input) return;
      const span = document.createElement("span");
      span.className = "info-value";
      span.dataset.editable = (originales[clave] && originales[clave].editable) || "texto";
      span.dataset.campo = clave;
      span.textContent = txt;
      input.replaceWith(span);
    });
    limpiarErrores();
    editando = false;
    originales = {};
    mostrarBotones(false);
  }

  function guardarEdicion() {
    if (typeof document === "undefined" || typeof GAUD_DATA === "undefined") return false;
    let valido = true;
    const nuevos = {};
    Object.entries(CAMPOS).forEach(function ([clave, cfg]) {
      const input = document.querySelector(`input[data-campo="${clave}"]`);
      if (!input) return;
      const valor = input.value;
      if (cfg.validar(valor)) {
        GAUD_DATA.usuario[cfg.clave] = valor.trim();
        nuevos[clave] = valor.trim();
        if (V()) V().limpiarError(input);
      } else {
        valido = false;
        if (V()) V().mostrarError(input, cfg.mensaje);
      }
    });
    if (valido) finalizarEdicion(nuevos);
    return valido;
  }

  function cancelarEdicion() {
    if (typeof document === "undefined") return;
    const originalesTextos = {};
    Object.keys(CAMPOS).forEach(function (clave) {
      if (originales[clave]) originalesTextos[clave] = originales[clave].texto;
    });
    finalizarEdicion(originalesTextos);
  }

  function enlazar() {
    if (typeof document === "undefined" || typeof GAUD_DATA === "undefined") return;
    poblarPerfil();
    poblarAcademico();
    const editar = document.querySelector("#btnEditarPerfil");
    if (!editar) return;
    const header = editar.parentElement;
    let guardar = document.querySelector("#btnGuardarPerfil");
    let cancelar = document.querySelector("#btnCancelarPerfil");
    if (!guardar && header) {
      guardar = document.createElement("button");
      guardar.id = "btnGuardarPerfil";
      guardar.className = "btn btn-primary";
      guardar.type = "button";
      guardar.textContent = "Guardar";
      guardar.style.display = "none";
      header.appendChild(guardar);
    }
    if (!cancelar && header) {
      cancelar = document.createElement("button");
      cancelar.id = "btnCancelarPerfil";
      cancelar.className = "btn btn-outline";
      cancelar.type = "button";
      cancelar.textContent = "Cancelar";
      cancelar.style.display = "none";
      header.appendChild(cancelar);
    }
    editar.addEventListener("click", function () { iniciarEdicion(); });
    if (guardar) guardar.addEventListener("click", function () { guardarEdicion(); });
    if (cancelar) cancelar.addEventListener("click", function () { cancelarEdicion(); });
  }

  return {
    CAMPOS,
    calcularProgreso,
    resumenAcademico,
    poblarPerfil,
    poblarAcademico,
    iniciarEdicion,
    guardarEdicion,
    cancelarEdicion,
    enlazar
  };
})();

if (typeof document !== "undefined") {
  document.addEventListener("DOMContentLoaded", function () { GAUD_Perfil.enlazar(); });
}

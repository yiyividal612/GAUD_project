const GAUD_Terminos = (function () {
  const CLAVE = "gaud_terminos_aceptados";

  function estaAceptado() {
    try {
      return sessionStorage.getItem(CLAVE) === "1";
    } catch (e) {
      return false;
    }
  }

  function aceptar() {
    try {
      sessionStorage.setItem(CLAVE, "1");
    } catch (e) {}
    return true;
  }

  function rechazar() {
    try {
      sessionStorage.removeItem(CLAVE);
    } catch (e) {}
    if (typeof window !== "undefined") {
      window.location.href = "index.html";
    }
  }

  function mostrar(overlay) {
    if (!overlay) return;
    overlay.removeAttribute("hidden");
    if (typeof document !== "undefined") document.body.classList.add("terminos-abiertos");
  }

  function ocultar(overlay) {
    if (!overlay) return;
    overlay.setAttribute("hidden", "");
    if (typeof document !== "undefined") document.body.classList.remove("terminos-abiertos");
  }

  function obtenerOverlay() {
    if (typeof document === "undefined") return null;
    return document.querySelector("#terminos-overlay");
  }

  function enlazar() {
    const overlay = obtenerOverlay();
    if (!overlay) return;
    const aceptarBtn = overlay.querySelector("#aceptar-terminos");
    const rechazarBtn = overlay.querySelector("#rechazar-terminos");

    if (!estaAceptado()) mostrar(overlay);

    if (aceptarBtn) {
      aceptarBtn.addEventListener("click", function () {
        aceptar();
        ocultar(overlay);
      });
    }
    if (rechazarBtn) {
      rechazarBtn.addEventListener("click", function () { rechazar(); });
    }
  }

  return { CLAVE, estaAceptado, aceptar, rechazar, mostrar, ocultar, obtenerOverlay, enlazar };
})();

if (typeof document !== "undefined") {
  document.addEventListener("DOMContentLoaded", function () { GAUD_Terminos.enlazar(); });
}

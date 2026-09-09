document.addEventListener("DOMContentLoaded", () => {
  const CLAVE_TERMINOS_PENDIENTES = "gaudTerminosPendientes";
  const overlay = document.getElementById("terminos-overlay");
  const contenidoPrincipal = document.querySelector(".app-layout");
  const botonAceptar = document.getElementById("aceptar-terminos");
  const botonRechazar = document.getElementById("rechazar-terminos");

  if (!overlay || !contenidoPrincipal || !botonAceptar || !botonRechazar) {
    return;
  }

  const terminosPendientes = localStorage.getItem(CLAVE_TERMINOS_PENDIENTES) === "true";

  if (!terminosPendientes) {
    return;
  }

  overlay.hidden = false;
  contenidoPrincipal.inert = true;
  contenidoPrincipal.setAttribute("aria-hidden", "true");
  document.body.classList.add("terminos-abiertos");
  botonAceptar.focus();

  function bloquearEscape(evento) {
    if (evento.key === "Escape") {
      evento.preventDefault();
    }
  }

  document.addEventListener("keydown", bloquearEscape);

  botonAceptar.addEventListener("click", () => {
    localStorage.removeItem(CLAVE_TERMINOS_PENDIENTES);
    overlay.hidden = true;
    contenidoPrincipal.inert = false;
    contenidoPrincipal.removeAttribute("aria-hidden");
    document.body.classList.remove("terminos-abiertos");
    document.removeEventListener("keydown", bloquearEscape);
  });

  botonRechazar.addEventListener("click", () => {
    sessionStorage.removeItem("usuarioGAUD");
    window.location.replace("index.html");
  });
});

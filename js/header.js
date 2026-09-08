// Datos del estudiante (por ahora fijos; mas adelante se conecta a la sesion real)
const usuarioActual = {
    nombre: "Luis Manuel Peña",
    matricula: "2021-0458"
};

// Devuelve la fecha de hoy en español, ej: "Martes, 8 de septiembre de 2026"
function obtenerFechaFormateada() {
    const opciones = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const fecha = new Date();
    const texto = fecha.toLocaleDateString('es-DO', opciones);
    return texto.charAt(0).toUpperCase() + texto.slice(1);
}

// Arma el HTML que va a reemplazar los botones "Volver" / "Ver perfil"
function construirInfoHeader(usuario, fechaTexto) {
    return `
        <div class="header-info">
            <span class="header-info-fecha">${fechaTexto}</span>
            <span class="header-info-usuario">${usuario.nombre} · ${usuario.matricula}</span>
        </div>
    `;
}

// Busca el contenedor de botones en el topbar y le mete la info nueva
function actualizarHeader() {
    const contenedorAcciones = document.querySelector('.topbar-actions');
    if (!contenedorAcciones) return;

    const fechaTexto = obtenerFechaFormateada();
    contenedorAcciones.innerHTML = construirInfoHeader(usuarioActual, fechaTexto);
}

document.addEventListener('DOMContentLoaded', actualizarHeader);

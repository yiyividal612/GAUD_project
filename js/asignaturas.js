// Renderizado dinamico del grid de asignaturas a partir de asignaturasData
// (definido en js/asignaturas-data.js). Tarea: Dinamizacion Grid Asignaturas.

// Crea el HTML de una sola tarjeta de materia
function crearTarjetaMateria(materia) {
    const div = document.createElement("div");
    div.className = `course status-${materia.estado}`;
    div.innerHTML = `
        <div class="course-code">${materia.codigo}</div>
        <p class="course-name">${materia.nombre}</p>
        <div class="course-foot"><span class="credits">${materia.creditos} CR</span><span class="status-bar"></span></div>
    `;
    return div;
}

// Crea el bloque completo de un trimestre con todas sus materias adentro
function crearBloqueTrimestre(trimestre) {
    const div = document.createElement("div");
    div.className = "term";

    const head = document.createElement("div");
    head.className = "term-head";
    head.innerHTML = `
        <div class="term-num">${trimestre.trimestre}</div>
        <div class="term-credits">${trimestre.creditos} CR</div>
    `;
    div.appendChild(head);

    trimestre.materias.forEach(materia => {
        div.appendChild(crearTarjetaMateria(materia));
    });

    return div;
}

// Pinta el listado de "Materias cursando actualmente"
function renderizarMateriasActuales(materias) {
    const contenedor = document.querySelector(".current-list");
    if (!contenedor) return 0;

    contenedor.innerHTML = "";
    materias.forEach(m => {
        const item = document.createElement("div");
        item.className = "current-item";
        item.innerHTML = `
            <span class="item-code">${m.codigo}</span>
            <span class="item-name">${m.nombre}</span>
            <span class="item-credits">${m.creditos} CR</span>
        `;
        contenedor.appendChild(item);
    });

    return materias.length;
}

// Pinta el grid completo del pensum, trimestre por trimestre
function renderizarPensum(pensum) {
    const contenedor = document.querySelector(".pensum-grid");
    if (!contenedor) return 0;

    contenedor.innerHTML = "";
    pensum.forEach(trimestre => {
        contenedor.appendChild(crearBloqueTrimestre(trimestre));
    });

    return pensum.length;
}

document.addEventListener("DOMContentLoaded", () => {
    if (typeof asignaturasData === "undefined") return; // por si esta pagina no tiene el archivo de datos

    renderizarMateriasActuales(asignaturasData.materiasActuales);
    const totalTrimestres = renderizarPensum(asignaturasData.pensum);
    console.log("Trimestres renderizados:", totalTrimestres);
});

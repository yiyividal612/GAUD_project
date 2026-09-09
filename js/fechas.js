// =====================================================
// MANEJO DINÁMICO DE FECHAS Y ALERTAS TEMPORALES
// FASE 2 - GAUD
// =====================================================

// Fechas importantes del período académico
const fechasAcademicas = {
    inicioPeriodo: new Date(2026, 7, 1),
    finPeriodo: new Date(2026, 9, 31),
    entregaFase1: new Date(2026, 8, 8),
    seleccionInicio: new Date(2026, 9, 5),
    seleccionFin: new Date(2026, 9, 12),
    retiroAsignaturas: new Date(2026, 8, 30)
};

// Calcula cuántos días faltan para una fecha determinada
function calcularDiasRestantes(fechaObjetivo) {
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    const objetivo = new Date(fechaObjetivo);
    objetivo.setHours(0, 0, 0, 0);

    const diferencia = objetivo - hoy;

    return Math.ceil(
        diferencia / (1000 * 60 * 60 * 24)
    );
}

// Convierte una fecha a formato legible en español
function formatearFecha(fecha) {
    return fecha.toLocaleDateString("es-DO", {
        day: "numeric",
        month: "long",
        year: "numeric"
    });
}

// Formatea el rango del período académico
function formatearRango(inicio, fin) {
    const mesInicio = inicio.toLocaleDateString(
        "es-DO",
        { month: "short" }
    );

    const mesFin = fin.toLocaleDateString(
        "es-DO",
        { month: "short" }
    );

    return `${mesInicio} - ${mesFin} ${fin.getFullYear()}`;
}

// Genera mensajes dependiendo de los días restantes
function mensajeTemporal(dias) {

    if (dias === 0) {
        return "Hoy";
    }

    if (dias === 1) {
        return "Mañana";
    }

    if (dias > 1) {
        return `Faltan ${dias} días`;
    }

    if (dias === -1) {
        return "Fue ayer";
    }

    return `Pasó hace ${Math.abs(dias)} días`;
}

// Actualiza dinámicamente el rango del período
function actualizarRangoPeriodo() {

    const elemento =
        document.getElementById("rango-periodo");

    if (elemento) {
        elemento.textContent = formatearRango(
            fechasAcademicas.inicioPeriodo,
            fechasAcademicas.finPeriodo
        );
    }
}

// Actualiza las alertas temporales del dashboard
function actualizarAvisosTemporales() {

    const avisoEntrega =
        document.getElementById("aviso-entrega");

    const avisoSeleccion =
        document.getElementById("aviso-seleccion");

    const avisoRetiro =
        document.getElementById("aviso-retiro");


    const diasEntrega =
        calcularDiasRestantes(
            fechasAcademicas.entregaFase1
        );

    const diasSeleccion =
        calcularDiasRestantes(
            fechasAcademicas.seleccionInicio
        );

    const diasRetiro =
        calcularDiasRestantes(
            fechasAcademicas.retiroAsignaturas
        );


    if (avisoEntrega) {

        avisoEntrega.textContent =
            `Entrega Fase 1 de ISW-306: ${
                formatearFecha(fechasAcademicas.entregaFase1)
            } · ${mensajeTemporal(diasEntrega)}`;
    }


    if (avisoSeleccion) {

        avisoSeleccion.textContent =
            `Selección de asignaturas próximo período: ${
                formatearFecha(fechasAcademicas.seleccionInicio)
            } al ${
                formatearFecha(fechasAcademicas.seleccionFin)
            } · ${mensajeTemporal(diasSeleccion)}`;
    }


    if (avisoRetiro) {

        avisoRetiro.textContent =
            `Fecha límite retiro de asignaturas: ${
                formatearFecha(fechasAcademicas.retiroAsignaturas)
            } · ${mensajeTemporal(diasRetiro)}`;
    }
}

// Ejecutar cuando el contenido de la página esté cargado
document.addEventListener(
    "DOMContentLoaded",
    () => {

        actualizarRangoPeriodo();
        actualizarAvisosTemporales();

    }
);

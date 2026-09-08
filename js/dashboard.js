// Misma logica de clase que se usa para el perfil (StudentProfile),
// aplicada aqui a los datos del Dashboard.
// Cuando Reynaldo entregue el JSON de la base de datos local, esto se reemplaza
// por la lectura de ese archivo en vez de datos fijos.
class StudentProfile {
    constructor(indiceAcademico, creditosAprobados, creditosTotales, asignaturasCursadas, asignaturasPendientes) {
        this.indiceAcademico = indiceAcademico;
        this.creditosAprobados = creditosAprobados;
        this.creditosTotales = creditosTotales;
        this.asignaturasCursadas = asignaturasCursadas;
        this.asignaturasPendientes = asignaturasPendientes;
    }

    // Calcula el % de la carrera completado
    calcularProgreso() {
        return (this.creditosAprobados / this.creditosTotales) * 100;
    }
}

// Datos de prueba (mismos que perfil.html, para que ambas paginas cuadren)
const perfilDashboard = new StudentProfile(3.62, 96, 225, 34, 39);

// Mete los valores del objeto en el HTML de las 4 tarjetas
function actualizarStatsDashboard(perfil) {
    document.getElementById("indice-academico-dashboard").textContent = perfil.indiceAcademico.toFixed(2);
    document.getElementById("creditos-aprobados-dashboard").textContent = perfil.creditosAprobados;
    document.getElementById("asignaturas-cursadas-dashboard").textContent = perfil.asignaturasCursadas;
    document.getElementById("asignaturas-pendientes-dashboard").textContent = perfil.asignaturasPendientes;

    return perfil.calcularProgreso();
}

document.addEventListener("DOMContentLoaded", () => {
    const progreso = actualizarStatsDashboard(perfilDashboard);
    console.log("Progreso de la carrera:", progreso.toFixed(1) + "%");
});

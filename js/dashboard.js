const GAUD_Dashboard = (function () {
  const ID_ESTADISTICAS = {
    indice: "indice-academico-dashboard",
    creditos: "creditos-aprobados-dashboard",
    cursadas: "asignaturas-cursadas-dashboard",
    pendientes: "asignaturas-pendientes-dashboard"
  };

  function porEstado(pensum, estado) {
    return pensum.filter(function (a) { return a.estado === estado; });
  }

  function calcularIndice(pensum) {
    const aprobadas = porEstado(pensum, "aprobada");
    const totalCr = aprobadas.reduce(function (s, a) { return s + a.creditos; }, 0);
    if (totalCr === 0) return 0;
    const ponderado = aprobadas.reduce(function (s, a) { return s + a.calificacion * a.creditos; }, 0);
    return Math.round((ponderado / totalCr) * 100) / 100;
  }

  function calcularCreditosAprobados(pensum) {
    return porEstado(pensum, "aprobada").reduce(function (s, a) { return s + a.creditos; }, 0);
  }

  function contarPorEstado(pensum, estado) {
    return porEstado(pensum, estado).length;
  }

  function asignaturasDePeriodo(pensum, trimestre) {
    return pensum.filter(function (a) { return a.trimestre === trimestre; });
  }

  function resumen(pensum) {
    return {
      indice: calcularIndice(pensum),
      creditosAprobados: calcularCreditosAprobados(pensum),
      cursadas: contarPorEstado(pensum, "aprobada"),
      pendientes: contarPorEstado(pensum, "pendiente")
    };
  }

  function rangoDePeriodo(periodo) {
    if (typeof GAUD_Fechas !== "undefined" && typeof GAUD_Fechas.rangoPeriodo === "function") {
      return GAUD_Fechas.rangoPeriodo(periodo.inicio, periodo.fin);
    }
    return periodo.rango;
  }

  function texto(id, valor) {
    if (typeof document === "undefined") return;
    const el = document.getElementById(id);
    if (el) el.textContent = String(valor);
  }

  function poblarEstadisticas(res) {
    texto(ID_ESTADISTICAS.indice, res.indice.toFixed(2));
    texto(ID_ESTADISTICAS.creditos, res.creditosAprobados);
    texto(ID_ESTADISTICAS.cursadas, res.cursadas);
    texto(ID_ESTADISTICAS.pendientes, res.pendientes);
  }

  function poblarPeriodo(periodo) {
    texto("rango-periodo", rangoDePeriodo(periodo));
  }

  function renderPeriodo(asignaturas) {
    if (typeof document === "undefined") return;
    const cont = document.getElementById("lista-periodo");
    if (!cont) return;
    cont.innerHTML = "";
    asignaturas.forEach(function (a) {
      const item = document.createElement("div");
      item.className = "subject-list-item";
      const info = document.createElement("div");
      info.className = "subject-info";
      const h4 = document.createElement("h4");
      h4.textContent = `${a.codigo} - ${a.nombre}`;
      const p = document.createElement("p");
      p.textContent = `${a.creditos} créditos`;
      info.appendChild(h4);
      info.appendChild(p);
      const badge = document.createElement("span");
      const retirada = a.estado === "retirada";
      badge.className = retirada ? "badge badge-danger" : "badge badge-success";
      badge.textContent = retirada ? "Retirada" : "Cursando";
      item.appendChild(info);
      item.appendChild(badge);
      cont.appendChild(item);
    });
  }

  function renderAvisos(avisos) {
    if (typeof document === "undefined") return;
    const cont = document.getElementById("lista-avisos");
    if (!cont) return;
    cont.innerHTML = "";
    avisos.forEach(function (av) {
      const item = document.createElement("div");
      item.className = "subject-list-item";
      item.style.cssText = "flex-direction:column; align-items:flex-start; gap:0.5rem;";
      const h4 = document.createElement("h4");
      h4.textContent = av.titulo;
      h4.style.cssText = av.urgente
        ? "color:var(--danger); font-weight:600; font-size:0.9rem;"
        : "font-size:0.9rem;";
      const p = document.createElement("p");
      p.textContent = av.descripcion;
      p.style.cssText = "font-size:0.85rem;";
      item.appendChild(h4);
      item.appendChild(p);
      cont.appendChild(item);
    });
  }

  function enlazar() {
    if (typeof GAUD_DATA === "undefined") return;
    const pensum = GAUD_DATA.pensum;
    poblarEstadisticas(resumen(pensum));
    poblarPeriodo(GAUD_DATA.periodoActual);
    renderPeriodo(asignaturasDePeriodo(pensum, GAUD_DATA.usuario.trimestreActual));
    renderAvisos(GAUD_DATA.avisos);
  }

  return {
    ID_ESTADISTICAS,
    porEstado,
    calcularIndice,
    calcularCreditosAprobados,
    contarPorEstado,
    asignaturasDePeriodo,
    resumen,
    rangoDePeriodo,
    poblarEstadisticas,
    poblarPeriodo,
    renderPeriodo,
    renderAvisos,
    enlazar
  };
})();

if (typeof document !== "undefined") {
  document.addEventListener("DOMContentLoaded", function () { GAUD_Dashboard.enlazar(); });
}

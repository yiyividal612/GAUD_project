const GAUD_Asignaturas = (function () {
  const CLAVE_LS = "gaud_asignaturas";
  const ESTADOS_VALIDOS = ["aprobada", "en-curso", "pendiente"];

  let guardado = {};
  const overridesColapso = new Map();

  function normalizar(texto) {
    return String(texto || "")
      .toLowerCase()
      .trim()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  }

  function cargarGuardado(pensum) {
    if (typeof localStorage === "undefined") return;
    try {
      guardado = JSON.parse(localStorage.getItem(CLAVE_LS) || "{}");
    } catch (e) {
      guardado = {};
    }
    if (!Array.isArray(pensum)) return;
    pensum.forEach(function (a) {
      const g = guardado[a.codigo];
      if (!g) return;
      if (ESTADOS_VALIDOS.includes(g.estado)) a.estado = g.estado;
      a.calificacion = typeof g.calificacion === "number" ? g.calificacion : null;
    });
  }

  function guardarCambios(a) {
    if (typeof localStorage === "undefined") return;
    guardado[a.codigo] = { estado: a.estado, calificacion: a.calificacion };
    try {
      localStorage.setItem(CLAVE_LS, JSON.stringify(guardado));
    } catch (e) {
      /* almacenamiento no disponible: se mantiene solo en memoria */
    }
  }

  function claseEstado(estado) {
    const mapa = { aprobada: "approved", "en-curso": "current", pendiente: "pending" };
    return mapa[estado] || "pending";
  }

  const ORDEN_ESTADOS = ["pendiente", "en-curso", "aprobada"];

  function ciclarEstado(estado) {
    return ORDEN_ESTADOS[(ORDEN_ESTADOS.indexOf(estado) + 1) % ORDEN_ESTADOS.length];
  }

  function asignaturasDePeriodo(pensum, trimestre) {
    return pensum.filter(function (a) { return a.trimestre === trimestre; });
  }

  function calcularCreditos(asignaturas) {
    return asignaturas.reduce(function (s, a) { return s + a.creditos; }, 0);
  }

  function contarAprobadas(asignaturas) {
    return asignaturas.filter(function (a) { return a.estado === "aprobada"; }).length;
  }

  function todasAprobadas(asignaturas) {
    return asignaturas.length > 0 && asignaturas.every(function (a) { return a.estado === "aprobada"; });
  }

  function colapsoEfectivo(trimestre, asigs) {
    const ov = overridesColapso.get(trimestre);
    return ov !== undefined ? ov : todasAprobadas(asigs);
  }

  function agruparPorTrimestre(pensum) {
    const mapa = new Map();
    pensum.forEach(function (a) {
      if (!mapa.has(a.trimestre)) mapa.set(a.trimestre, []);
      mapa.get(a.trimestre).push(a);
    });
    return new Map([...mapa.entries()].sort(function (x, y) { return x[0] - y[0]; }));
  }

  function coincideBusqueda(asignatura, texto) {
    const q = normalizar(texto);
    if (q === "") return true;
    return normalizar(`${asignatura.codigo} ${asignatura.nombre}`).includes(q);
  }

  function coincideEstado(asignatura, estado) {
    return estado === "todas" || asignatura.estado === estado;
  }

  function filtrarPensum(pensum, busqueda, estado) {
    return pensum.filter(function (a) { return coincideBusqueda(a, busqueda) && coincideEstado(a, estado); });
  }

  function renderCurrent(asignaturas) {
    if (typeof document === "undefined") return;
    const cont = document.querySelector(".current-list");
    if (!cont) return;
    cont.innerHTML = "";
    asignaturas.forEach(function (a) {
      const item = document.createElement("div");
      item.className = "current-item";
      const code = document.createElement("div");
      code.className = "item-code";
      code.textContent = a.codigo;
      const name = document.createElement("div");
      name.className = "item-name";
      name.textContent = a.nombre;
      const credits = document.createElement("div");
      credits.className = "item-credits";
      credits.textContent = `${a.creditos} cr`;
      item.appendChild(code);
      item.appendChild(name);
      item.appendChild(credits);
      cont.appendChild(item);
    });
    const badge = document.querySelector(".period-badge");
    if (badge)
      badge.textContent = `${asignaturas.length} ${asignaturas.length === 1 ? "materia" : "materias"} en curso`;
  }

  function renderCalif(a, cell) {
    cell.innerHTML = "";
    if (a.estado !== "aprobada") return;
    const label = document.createElement("label");
    label.className = "calif-label";
    label.textContent = "Calificación";
    const input = document.createElement("input");
    input.type = "number";
    input.min = "0";
    input.max = "5";
    input.step = "0.01";
    input.className = "calif-input";
    input.value = a.calificacion == null ? "" : a.calificacion;
    input.addEventListener("click", function (e) { e.stopPropagation(); });
    input.addEventListener("change", function () {
      const v = String(input.value).trim();
      if (v === "") {
        a.calificacion = null;
        input.classList.remove("campo-invalido");
      } else {
        const n = Number(v);
        if (!Number.isFinite(n) || n < 0 || n > 5) {
          input.classList.add("campo-invalido");
          return;
        }
        input.classList.remove("campo-invalido");
        a.calificacion = n;
      }
      guardarCambios(a);
    });
    cell.appendChild(label);
    cell.appendChild(input);
  }

  function actualizarFila(fila, a) {
    fila.className = `course status-${claseEstado(a.estado)}`;
    fila.dataset.estado = a.estado;
    renderCalif(a, fila.querySelector(".course-calif"));
  }

  function renderPensum(pensum) {
    if (typeof document === "undefined") return;
    const cont = document.querySelector(".pensum-grid");
    if (!cont) return;
    cont.innerHTML = "";
    agruparPorTrimestre(pensum).forEach(function (asigs, tri) {
      const term = document.createElement("table");
      term.className = "term";
      term.dataset.trimestre = tri;

      const head = document.createElement("thead");
      head.className = "term-head";
      head.setAttribute("role", "button");
      head.setAttribute("aria-expanded", "true");
      const headRow = document.createElement("tr");
      const thMain = document.createElement("th");
      const num = document.createElement("span");
      num.className = "term-num";
      num.textContent = `Trimestre ${tri}`;
      const progress = document.createElement("span");
      progress.className = "term-progress";
      thMain.appendChild(num);
      thMain.appendChild(progress);
      const thCredits = document.createElement("th");
      thCredits.className = "term-credits";
      const thChevron = document.createElement("th");
      const chevron = document.createElement("span");
      chevron.className = "term-chevron";
      chevron.setAttribute("aria-hidden", "true");
      chevron.textContent = "▾";
      thChevron.appendChild(chevron);
      headRow.appendChild(thMain);
      headRow.appendChild(thCredits);
      headRow.appendChild(thChevron);
      head.appendChild(headRow);
      term.appendChild(head);

      const body = document.createElement("tbody");
      body.className = "term-body";
      asigs.forEach(function (a) {
        const fila = document.createElement("tr");
        fila.className = `course status-${claseEstado(a.estado)}`;
        fila.dataset.codigo = a.codigo;
        fila.dataset.estado = a.estado;
        const tdMain = document.createElement("td");
        tdMain.className = "course-main";
        const name = document.createElement("div");
        name.className = "course-name";
        name.textContent = a.nombre;
        const code = document.createElement("div");
        code.className = "course-code";
        code.textContent = a.codigo;
        tdMain.appendChild(name);
        tdMain.appendChild(code);
        const tdCredits = document.createElement("td");
        tdCredits.className = "course-credits";
        tdCredits.textContent = `${a.creditos} cr`;
        const tdCalif = document.createElement("td");
        tdCalif.className = "course-calif";
        renderCalif(a, tdCalif);
        fila.appendChild(tdMain);
        fila.appendChild(tdCredits);
        fila.appendChild(tdCalif);
        body.appendChild(fila);
      });
      term.appendChild(body);
      cont.appendChild(term);
      sincronizarTerm(term, asigs);
    });
  }

  function actualizarCabecera(termEl, asigs) {
    const progress = termEl.querySelector(".term-progress");
    if (progress) progress.textContent = `· ${contarAprobadas(asigs)}/${asigs.length}`;
    const credits = termEl.querySelector(".term-credits");
    if (credits) credits.textContent = `${calcularCreditos(asigs)} cr`;
  }

  function sincronizarTerm(termEl, asigs, forzarExpandido) {
    actualizarCabecera(termEl, asigs);
    const tri = Number(termEl.dataset.trimestre);
    const colapsado = forzarExpandido ? false : colapsoEfectivo(tri, asigs);
    termEl.classList.toggle("term-collapsed", colapsado);
    termEl.classList.toggle("term-current", asigs.some(function (a) { return a.estado === "en-curso"; }));
    const head = termEl.querySelector(".term-head");
    if (head) head.setAttribute("aria-expanded", String(!colapsado));
  }

  function alternarTerm(termEl) {
    const tri = Number(termEl.dataset.trimestre);
    const data = typeof GAUD_DATA !== "undefined" ? GAUD_DATA.pensum : [];
    const asigs = asignaturasDePeriodo(data, tri);
    if (!asigs.length) return;
    overridesColapso.set(tri, !colapsoEfectivo(tri, asigs));
    sincronizarTerm(termEl, asigs);
  }

  let busquedaEl = null;
  let botonesFiltro = [];

  function estadoActivo() {
    const activo = botonesFiltro.find(function (b) { return b.classList.contains("activo"); });
    return activo ? activo.dataset.estado : "todas";
  }

  function marcarActivo(btn) {
    botonesFiltro.forEach(function (b) { b.classList.toggle("activo", b === btn); });
  }

  function aplicarFiltro(busqueda, estado, pensum) {
    if (typeof document === "undefined") return 0;
    const data = pensum || (typeof GAUD_DATA !== "undefined" ? GAUD_DATA.pensum : []);
    const visibles = new Set(filtrarPensum(data, busqueda, estado).map(function (a) { return a.codigo; }));
    let count = 0;
    document.querySelectorAll(".pensum-grid .course").forEach(function (c) {
      const visible = visibles.has(c.dataset.codigo);
      c.classList.toggle("oculto", !visible);
      if (visible) count++;
    });
    document.querySelectorAll(".pensum-grid .term").forEach(function (t) {
      const visible = t.querySelector(".course:not(.oculto)") !== null;
      t.classList.toggle("oculto", !visible);
    });
    const filtrando = String(busqueda || "").trim() !== "" || estado !== "todas";
    document.querySelectorAll(".pensum-grid .term").forEach(function (t) {
      if (t.classList.contains("oculto")) return;
      const asigs = data.filter(function (a) { return a.trimestre === Number(t.dataset.trimestre); });
      if (!asigs.length) return;
      sincronizarTerm(t, asigs, filtrando);
    });
    const countEl = document.querySelector(".pensum-count");
    if (countEl) countEl.textContent = `${count} asignaturas`;
    return count;
  }

  function aplicar() {
    return aplicarFiltro(busquedaEl ? busquedaEl.value : "", estadoActivo());
  }

  function enlazarGrid() {
    if (typeof document === "undefined") return;
    const cont = document.querySelector(".pensum-grid");
    if (!cont) return;
    cont.addEventListener("click", function (e) {
      const head = e.target.closest(".term-head");
      if (head) {
        const termEl = head.closest(".term");
        if (termEl) alternarTerm(termEl);
        return;
      }
      const fila = e.target.closest(".course");
      if (!fila || e.target.closest(".course-calif")) return;
      const pensum = typeof GAUD_DATA !== "undefined" ? GAUD_DATA.pensum : [];
      const a = pensum.find(function (x) { return x.codigo === fila.dataset.codigo; });
      if (!a) return;
      a.estado = ciclarEstado(a.estado);
      if (a.estado !== "aprobada") a.calificacion = null;
      guardarCambios(a);
      actualizarFila(fila, a);
      const termEl = fila.closest(".term");
      if (termEl)
        sincronizarTerm(termEl, asignaturasDePeriodo(pensum, Number(termEl.dataset.trimestre)));
      renderCurrent(pensum.filter(function (x) { return x.estado === "en-curso"; }));
      aplicar();
    });
    cont.querySelectorAll(".term-head").forEach(function (head) {
      head.setAttribute("tabindex", "0");
      head.setAttribute("role", "button");
      head.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") {
          const termEl = head.closest(".term");
          if (termEl) alternarTerm(termEl);
        }
      });
    });
  }

  function enlazarHerramientas() {
    if (typeof document === "undefined") return;
    busquedaEl = document.querySelector(".pensum-search input");
    botonesFiltro = Array.from(document.querySelectorAll(".pensum-filters button"));
    if (!busquedaEl && botonesFiltro.length === 0) return;
    if (busquedaEl) busquedaEl.addEventListener("input", aplicar);
    botonesFiltro.forEach(function (btn) {
      btn.addEventListener("click", function () {
        marcarActivo(btn);
        aplicar();
      });
    });
    aplicar();
  }

  function enlazar() {
    if (typeof GAUD_DATA === "undefined") return;
    const pensum = GAUD_DATA.pensum;
    cargarGuardado(pensum);
    renderCurrent(pensum.filter(function (a) { return a.estado === "en-curso"; }));
    renderPensum(pensum);
    enlazarGrid();
    enlazarHerramientas();
  }

  return {
    CLAVE_LS,
    ESTADOS_VALIDOS,
    ORDEN_ESTADOS,
    normalizar,
    cargarGuardado,
    guardarCambios,
    claseEstado,
    ciclarEstado,
    asignaturasDePeriodo,
    calcularCreditos,
    contarAprobadas,
    todasAprobadas,
    colapsoEfectivo,
    agruparPorTrimestre,
    coincideBusqueda,
    coincideEstado,
    filtrarPensum,
    renderCurrent,
    renderCalif,
    actualizarFila,
    renderPensum,
    actualizarCabecera,
    sincronizarTerm,
    alternarTerm,
    estadoActivo,
    marcarActivo,
    aplicarFiltro,
    aplicar,
    enlazarGrid,
    enlazarHerramientas,
    enlazar
  };
})();

if (typeof document !== "undefined") {
  document.addEventListener("DOMContentLoaded", function () { GAUD_Asignaturas.enlazar(); });
}

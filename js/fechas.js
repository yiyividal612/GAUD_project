const GAUD_Fechas = (function () {
  const MESES_LARGO = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
  const MESES_CORTO = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];

  function aFecha(iso) {
    const [y, m, d] = iso.split("-").map(Number);
    return new Date(y, m - 1, d);
  }

  function capitalizar(s) {
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  function hoy() {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  }

  function formatearLarga(iso) {
    const f = aFecha(iso);
    return `${f.getDate()} de ${MESES_LARGO[f.getMonth()]} de ${f.getFullYear()}`;
  }

  function formatearCorta(iso) {
    const f = aFecha(iso);
    return `${String(f.getDate()).padStart(2, "0")}/${String(f.getMonth() + 1).padStart(2, "0")}/${f.getFullYear()}`;
  }

  function diasHasta(iso, refIso = hoy()) {
    return Math.round((aFecha(iso) - aFecha(refIso)) / 86400000);
  }

  function relativa(iso, refIso = hoy()) {
    const d = diasHasta(iso, refIso);
    if (d === 0) return "hoy";
    if (d === 1) return "mañana";
    if (d === -1) return "ayer";
    if (d > 1) return `en ${d} días`;
    return `hace ${Math.abs(d)} días`;
  }

  function rangoPeriodo(inicioIso, finIso) {
    const ini = aFecha(inicioIso);
    const fin = aFecha(finIso);
    const mesIni = capitalizar(MESES_CORTO[ini.getMonth()]);
    const mesFin = capitalizar(MESES_CORTO[fin.getMonth()]);
    const anio = fin.getFullYear();
    return mesIni === mesFin ? `${mesIni} ${anio}` : `${mesIni} - ${mesFin} ${anio}`;
  }

  function esHoy(iso, refIso = hoy()) {
    return diasHasta(iso, refIso) === 0;
  }

  return { hoy, formatearLarga, formatearCorta, diasHasta, relativa, rangoPeriodo, esHoy };
})();

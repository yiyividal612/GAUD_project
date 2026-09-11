/* ============================================================
 * GAUD · Datos semilla para pruebas de la app (dashboard, perfil, pensum, etc.)
 * ============================================================ */

const GAUD_DATA = {

  usuario: {
    nombre: "Luis Manuel Peña Rodríguez",
    matricula: "2021-0458",
    email: "20210458@p.uapa.edu.do",
    password: "gaud2026",
    universidad: "UAPA",
    carrera: "Ingeniería en Software",
    modalidad: "A distancia (Virtual)",
    telefono: "+1 (809) 555-0142",
    direccion: "Santo Domingo, DN",
    trimestreActual: 7,
    iniciales: "LP"
  },

  periodoActual: {
    nombre: "7mo Trimestre",
    rango: "Ago - Oct 2026",
    inicio: "2026-08-03",
    fin: "2026-10-24",
    anio: 2026
  },

  /* 62 asignaturas: 24 aprobadas (T1–T6) + 4 en curso (T7) + 34 pendientes (T8–T16) */
  pensum: [
    /* ---- T1 ---- */
    { codigo: "CBC-103", nombre: "Orientación a la Educación a Distancia Virtual", creditos: 3, trimestre: 1, estado: "aprobada", calificacion: null },
    { codigo: "CBC-105", nombre: "Tecnología para el Aprendizaje Virtual", creditos: 3, trimestre: 1, estado: "aprobada", calificacion: null },
    { codigo: "CBE-109", nombre: "Comunicación Oral y Escrita", creditos: 4, trimestre: 1, estado: "aprobada", calificacion: null },
    { codigo: "CBM-107", nombre: "Razonamiento Lógico Matemático", creditos: 4, trimestre: 1, estado: "aprobada", calificacion: null },
    /* ---- T2 ---- */
    { codigo: "FGI-103", nombre: "Lógica Computacional", creditos: 4, trimestre: 2, estado: "aprobada", calificacion: null },
    { codigo: "CBC-107", nombre: "Ser Humano y Desarrollo Sostenible", creditos: 3, trimestre: 2, estado: "aprobada", calificacion: null },
    { codigo: "FGI-102", nombre: "Álgebra y Geometría para Ingenieros", creditos: 4, trimestre: 2, estado: "aprobada", calificacion: null },
    { codigo: "ING-103", nombre: "Inglés Comunicativo", creditos: 3, trimestre: 2, estado: "aprobada", calificacion: null },
    /* ---- T3 ---- */
    { codigo: "CBE-110", nombre: "Análisis y Producción de Textos", creditos: 4, trimestre: 3, estado: "aprobada", calificacion: null },
    { codigo: "FGI-104", nombre: "Programación I", creditos: 4, trimestre: 3, estado: "aprobada", calificacion: null },
    { codigo: "FGM-102", nombre: "Análisis Matemático I", creditos: 5, trimestre: 3, estado: "aprobada", calificacion: null },
    { codigo: "FGM-205", nombre: "Matemática Discreta", creditos: 3, trimestre: 3, estado: "aprobada", calificacion: null },
    /* ---- T4 ---- */
    { codigo: "FGC-105", nombre: "Metodología de la Investigación Científica", creditos: 4, trimestre: 4, estado: "aprobada", calificacion: null },
    { codigo: "FGI-106", nombre: "Sistema de Base de Datos", creditos: 4, trimestre: 4, estado: "aprobada", calificacion: null },
    { codigo: "FGI-105", nombre: "Programación II", creditos: 4, trimestre: 4, estado: "aprobada", calificacion: null },
    { codigo: "FGM-103", nombre: "Análisis Matemático II", creditos: 5, trimestre: 4, estado: "aprobada", calificacion: null },
    /* ---- T5 ---- */
    { codigo: "FGC-203", nombre: "Filosofía y Sociedad", creditos: 3, trimestre: 5, estado: "aprobada", calificacion: null },
    { codigo: "ISW-305", nombre: "Estructura de Datos y Algoritmos", creditos: 4, trimestre: 5, estado: "aprobada", calificacion: null },
    { codigo: "ING-213", nombre: "Inglés Técnico para Ingenieros", creditos: 3, trimestre: 5, estado: "aprobada", calificacion: null },
    { codigo: "FGC-204", nombre: "Investigación Aplicada", creditos: 4, trimestre: 5, estado: "aprobada", calificacion: null },
    /* ---- T6 ---- */
    { codigo: "FGF-201", nombre: "Física General", creditos: 4, trimestre: 6, estado: "aprobada", calificacion: null },
    { codigo: "LAF-201", nombre: "Práctica de Física General", creditos: 1, trimestre: 6, estado: "aprobada", calificacion: null },
    { codigo: "ISW-204", nombre: "Diseño de Interfaz de Usuario", creditos: 4, trimestre: 6, estado: "aprobada", calificacion: null },
    { codigo: "ISW-201", nombre: "Ingeniería de Software I", creditos: 4, trimestre: 6, estado: "aprobada", calificacion: null },
    /* ---- T7 (actual) ---- */
    { codigo: "FGC-106", nombre: "Historia Social Dominicana", creditos: 3, trimestre: 7, estado: "en-curso", calificacion: null },
    { codigo: "ISW-202", nombre: "Ingeniería de Software II", creditos: 4, trimestre: 7, estado: "en-curso", calificacion: null },
    { codigo: "ISW-306", nombre: "Desarrollo de Aplicaciones Web", creditos: 4, trimestre: 7, estado: "en-curso", calificacion: null },
    { codigo: "OP1", nombre: "Optativa 1", creditos: 3, trimestre: 7, estado: "en-curso", calificacion: null },
    /* ---- T8 ---- */
    { codigo: "FGM-206", nombre: "Álgebra Lineal", creditos: 4, trimestre: 8, estado: "pendiente", calificacion: null },
    { codigo: "FGI-209", nombre: "Electrónica Básica", creditos: 4, trimestre: 8, estado: "pendiente", calificacion: null },
    { codigo: "ISW-203", nombre: "Calidad de Software", creditos: 4, trimestre: 8, estado: "pendiente", calificacion: null },
    { codigo: "OP2", nombre: "Optativa 2", creditos: 3, trimestre: 8, estado: "pendiente", calificacion: null },
    /* ---- T9 ---- */
    { codigo: "FGC-208", nombre: "Educación Constitucional", creditos: 3, trimestre: 9, estado: "pendiente", calificacion: null },
    { codigo: "FGM-314", nombre: "Matemática Numérica", creditos: 4, trimestre: 9, estado: "pendiente", calificacion: null },
    { codigo: "FGI-210", nombre: "Arquitectura de Hardware", creditos: 4, trimestre: 9, estado: "pendiente", calificacion: null },
    { codigo: "FGM-207", nombre: "Estadística y Probabilidades", creditos: 4, trimestre: 9, estado: "pendiente", calificacion: null },
    /* ---- T10 ---- */
    { codigo: "FGC-409", nombre: "Ética Profesional", creditos: 3, trimestre: 10, estado: "pendiente", calificacion: null },
    { codigo: "INF-304", nombre: "Informática Gerencial", creditos: 4, trimestre: 10, estado: "pendiente", calificacion: null },
    { codigo: "ISW-412", nombre: "Minería de Datos", creditos: 4, trimestre: 10, estado: "pendiente", calificacion: null },
    { codigo: "OP3", nombre: "Optativa 3", creditos: 3, trimestre: 10, estado: "pendiente", calificacion: null },
    /* ---- T11 ---- */
    { codigo: "FGI-312", nombre: "Redes y Servicios Telemáticos", creditos: 4, trimestre: 11, estado: "pendiente", calificacion: null },
    { codigo: "LAT-312", nombre: "Labo. Redes y Servicios Telemáticos", creditos: 1, trimestre: 11, estado: "pendiente", calificacion: null },
    { codigo: "ISW-309", nombre: "Inteligencia Artificial", creditos: 4, trimestre: 11, estado: "pendiente", calificacion: null },
    { codigo: "INF-305", nombre: "Sistemas Distribuidos", creditos: 4, trimestre: 11, estado: "pendiente", calificacion: null },
    /* ---- T12 ---- */
    { codigo: "COE-101", nombre: "Contabilidad I", creditos: 4, trimestre: 12, estado: "pendiente", calificacion: null },
    { codigo: "CID-115", nombre: "Procesamiento del Lenguaje Natural", creditos: 4, trimestre: 12, estado: "pendiente", calificacion: null },
    { codigo: "ISW-420", nombre: "Ciberseguridad", creditos: 4, trimestre: 12, estado: "pendiente", calificacion: null },
    { codigo: "LAS-313", nombre: "Labo. de Ciberseguridad", creditos: 1, trimestre: 12, estado: "pendiente", calificacion: null },
    /* ---- T13 ---- */
    { codigo: "INF-408", nombre: "Investigación de Operaciones", creditos: 4, trimestre: 13, estado: "pendiente", calificacion: null },
    { codigo: "ISW-425", nombre: "Programación Multiplataforma Móvil", creditos: 4, trimestre: 13, estado: "pendiente", calificacion: null },
    { codigo: "LAP-414", nombre: "Labo. Programación Multiplataforma", creditos: 1, trimestre: 13, estado: "pendiente", calificacion: null },
    { codigo: "ISW-304", nombre: "Desarrollo de Proyectos con Software Libre", creditos: 4, trimestre: 13, estado: "pendiente", calificacion: null },
    /* ---- T14 ---- */
    { codigo: "ISW-414", nombre: "Fundamentos de Inteligencia de Negocios", creditos: 4, trimestre: 14, estado: "pendiente", calificacion: null },
    { codigo: "ISW-413", nombre: "Simulación Digital", creditos: 4, trimestre: 14, estado: "pendiente", calificacion: null },
    { codigo: "ISW-415", nombre: "Ingeniería Robótica para Software Virtuales I", creditos: 4, trimestre: 14, estado: "pendiente", calificacion: null },
    { codigo: "LAR-415", nombre: "Labo. Robótica para Software Virtuales I", creditos: 1, trimestre: 14, estado: "pendiente", calificacion: null },
    { codigo: "PPS-400", nombre: "Práctica Profesional (Pasantía)", creditos: 8, trimestre: 14, estado: "pendiente", calificacion: null },
    /* ---- T15 ---- */
    { codigo: "INF-307", nombre: "Gestión del Conocimiento y Toma de Decisiones", creditos: 4, trimestre: 15, estado: "pendiente", calificacion: null },
    { codigo: "ISW-416", nombre: "Ingeniería Robótica para Software Virtuales II", creditos: 4, trimestre: 15, estado: "pendiente", calificacion: null },
    { codigo: "LAR-416", nombre: "Labo. Robótica para Software Virtuales II", creditos: 1, trimestre: 15, estado: "pendiente", calificacion: null },
    { codigo: "ISW-417", nombre: "Seminario de Proyectos de Software", creditos: 4, trimestre: 15, estado: "pendiente", calificacion: null },
    /* ---- T16 ---- */
    { codigo: "ISW-400", nombre: "Curso Final de Grado", creditos: 6, trimestre: 16, estado: "pendiente", calificacion: null }
  ],

  /* Historial de inscripciones: 28 registros (T1–T7) */
  inscripciones: [
    { codigo: "CBC-103", nombre: "Orientación a la Educación a Distancia Virtual", trimestre: 1, creditos: 3, estado: "aprobada", calificacion: null, fecha: "2025-02-03" },
    { codigo: "CBC-105", nombre: "Tecnología para el Aprendizaje Virtual", trimestre: 1, creditos: 3, estado: "aprobada", calificacion: null, fecha: "2025-02-03" },
    { codigo: "CBE-109", nombre: "Comunicación Oral y Escrita", trimestre: 1, creditos: 4, estado: "aprobada", calificacion: null, fecha: "2025-02-03" },
    { codigo: "CBM-107", nombre: "Razonamiento Lógico Matemático", trimestre: 1, creditos: 4, estado: "aprobada", calificacion: null, fecha: "2025-02-03" },
    { codigo: "FGI-103", nombre: "Lógica Computacional", trimestre: 2, creditos: 4, estado: "aprobada", calificacion: null, fecha: "2025-05-05" },
    { codigo: "CBC-107", nombre: "Ser Humano y Desarrollo Sostenible", trimestre: 2, creditos: 3, estado: "aprobada", calificacion: null, fecha: "2025-05-05" },
    { codigo: "FGI-102", nombre: "Álgebra y Geometría para Ingenieros", trimestre: 2, creditos: 4, estado: "aprobada", calificacion: null, fecha: "2025-05-05" },
    { codigo: "ING-103", nombre: "Inglés Comunicativo", trimestre: 2, creditos: 3, estado: "aprobada", calificacion: null, fecha: "2025-05-05" },
    { codigo: "CBE-110", nombre: "Análisis y Producción de Textos", trimestre: 3, creditos: 4, estado: "aprobada", calificacion: null, fecha: "2025-08-04" },
    { codigo: "FGI-104", nombre: "Programación I", trimestre: 3, creditos: 4, estado: "aprobada", calificacion: null, fecha: "2025-08-04" },
    { codigo: "FGM-102", nombre: "Análisis Matemático I", trimestre: 3, creditos: 5, estado: "aprobada", calificacion: null, fecha: "2025-08-04" },
    { codigo: "FGM-205", nombre: "Matemática Discreta", trimestre: 3, creditos: 3, estado: "aprobada", calificacion: null, fecha: "2025-08-04" },
    { codigo: "FGC-105", nombre: "Metodología de la Investigación Científica", trimestre: 4, creditos: 4, estado: "aprobada", calificacion: null, fecha: "2025-11-03" },
    { codigo: "FGI-106", nombre: "Sistema de Base de Datos", trimestre: 4, creditos: 4, estado: "aprobada", calificacion: null, fecha: "2025-11-03" },
    { codigo: "FGI-105", nombre: "Programación II", trimestre: 4, creditos: 4, estado: "aprobada", calificacion: null, fecha: "2025-11-03" },
    { codigo: "FGM-103", nombre: "Análisis Matemático II", trimestre: 4, creditos: 5, estado: "aprobada", calificacion: null, fecha: "2025-11-03" },
    { codigo: "FGC-203", nombre: "Filosofía y Sociedad", trimestre: 5, creditos: 3, estado: "aprobada", calificacion: null, fecha: "2026-02-02" },
    { codigo: "ISW-305", nombre: "Estructura de Datos y Algoritmos", trimestre: 5, creditos: 4, estado: "aprobada", calificacion: null, fecha: "2026-02-02" },
    { codigo: "ING-213", nombre: "Inglés Técnico para Ingenieros", trimestre: 5, creditos: 3, estado: "aprobada", calificacion: null, fecha: "2026-02-02" },
    { codigo: "FGC-204", nombre: "Investigación Aplicada", trimestre: 5, creditos: 4, estado: "aprobada", calificacion: null, fecha: "2026-02-02" },
    { codigo: "FGF-201", nombre: "Física General", trimestre: 6, creditos: 4, estado: "aprobada", calificacion: null, fecha: "2026-05-04" },
    { codigo: "LAF-201", nombre: "Práctica de Física General", trimestre: 6, creditos: 1, estado: "aprobada", calificacion: null, fecha: "2026-05-04" },
    { codigo: "ISW-204", nombre: "Diseño de Interfaz de Usuario", trimestre: 6, creditos: 4, estado: "aprobada", calificacion: null, fecha: "2026-05-04" },
    { codigo: "ISW-201", nombre: "Ingeniería de Software I", trimestre: 6, creditos: 4, estado: "aprobada", calificacion: null, fecha: "2026-05-04" },
    { codigo: "FGC-106", nombre: "Historia Social Dominicana", trimestre: 7, creditos: 3, estado: "en-curso", calificacion: null, fecha: "2026-08-03" },
    { codigo: "ISW-202", nombre: "Ingeniería de Software II", trimestre: 7, creditos: 4, estado: "en-curso", calificacion: null, fecha: "2026-08-03" },
    { codigo: "ISW-306", nombre: "Desarrollo de Aplicaciones Web", trimestre: 7, creditos: 4, estado: "en-curso", calificacion: null, fecha: "2026-08-03" },
    { codigo: "OP1", nombre: "Optativa 1", trimestre: 7, creditos: 3, estado: "en-curso", calificacion: null, fecha: "2026-08-03" }
  ],

  avisos: [
    { id: "av-1", titulo: "ISW-306 · Fase 1", descripcion: "Entrega de la Fase 1 de Desarrollo de Aplicaciones Web (ISW-306).", fecha: "2026-09-08", tipo: "urgente", urgente: true },
    { id: "av-2", titulo: "Selección de asignaturas", descripcion: "Período de selección de asignaturas del próximo período: 5 al 12 de octubre.", fecha: "2026-10-05", tipo: "info", urgente: false },
    { id: "av-3", titulo: "Límite de retiro", descripcion: "Fecha límite para retiro de asignaturas del período actual: 30 de septiembre.", fecha: "2026-09-30", tipo: "aviso", urgente: false },
    { id: "av-4", titulo: "Índice para beca", descripcion: "Mantén un índice académico mayor a 2.00 para conservar tu beca.", fecha: "2026-09-01", tipo: "aviso", urgente: false }
  ]
};

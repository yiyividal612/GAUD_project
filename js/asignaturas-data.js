// Datos de prueba del pensum, en formato de arreglo/objeto JS.
// Cuando Reynaldo entregue el JSON real de la base de datos local, este archivo
// se reemplaza por la carga de ese archivo, sin tocar el codigo que lo usa (asignaturas.js).
const asignaturasData = {
  "periodoActual": "7mo Trimestre · Ago - Oct 2026",
  "materiasActuales": [
    {
      "codigo": "FGC-106",
      "nombre": "Historia Social Dominicana",
      "creditos": 3
    },
    {
      "codigo": "ISW-202",
      "nombre": "Ingeniería de Software II",
      "creditos": 4
    },
    {
      "codigo": "ISW-306",
      "nombre": "Desarrollo de Aplicaciones Web",
      "creditos": 4
    },
    {
      "codigo": "OP1",
      "nombre": "Optativa 1",
      "creditos": 3
    }
  ],
  "pensum": [
    {
      "trimestre": "1er Trimestre",
      "creditos": 14,
      "materias": [
        {
          "codigo": "CBC-103",
          "nombre": "Orientación a la Educación a Distancia Virtual",
          "creditos": 3,
          "estado": "approved"
        },
        {
          "codigo": "CBC-105",
          "nombre": "Tecnología para el Aprendizaje Virtual",
          "creditos": 3,
          "estado": "approved"
        },
        {
          "codigo": "CBE-109",
          "nombre": "Comunicación Oral y Escrita",
          "creditos": 4,
          "estado": "approved"
        },
        {
          "codigo": "CBM-107",
          "nombre": "Razonamiento Lógico Matemático",
          "creditos": 4,
          "estado": "approved"
        }
      ]
    },
    {
      "trimestre": "2do Trimestre",
      "creditos": 14,
      "materias": [
        {
          "codigo": "FGI-103",
          "nombre": "Lógica Computacional",
          "creditos": 4,
          "estado": "approved"
        },
        {
          "codigo": "CBC-107",
          "nombre": "Ser Humano y Desarrollo Sostenible",
          "creditos": 3,
          "estado": "approved"
        },
        {
          "codigo": "FGI-102",
          "nombre": "Álgebra y Geometría para Ingenieros",
          "creditos": 4,
          "estado": "approved"
        },
        {
          "codigo": "ING-103",
          "nombre": "Inglés Comunicativo",
          "creditos": 3,
          "estado": "approved"
        }
      ]
    },
    {
      "trimestre": "3er Trimestre",
      "creditos": 16,
      "materias": [
        {
          "codigo": "CBE-110",
          "nombre": "Análisis y Producción de Textos",
          "creditos": 4,
          "estado": "approved"
        },
        {
          "codigo": "FGI-104",
          "nombre": "Programación I",
          "creditos": 4,
          "estado": "approved"
        },
        {
          "codigo": "FGM-102",
          "nombre": "Análisis Matemático I",
          "creditos": 5,
          "estado": "approved"
        },
        {
          "codigo": "FGM-205",
          "nombre": "Matemática Discreta",
          "creditos": 3,
          "estado": "approved"
        }
      ]
    },
    {
      "trimestre": "4to Trimestre",
      "creditos": 17,
      "materias": [
        {
          "codigo": "FGC-105",
          "nombre": "Metodología de la Investigación Científica",
          "creditos": 4,
          "estado": "approved"
        },
        {
          "codigo": "FGI-106",
          "nombre": "Sistema de Base de Datos",
          "creditos": 4,
          "estado": "approved"
        },
        {
          "codigo": "FGI-105",
          "nombre": "Programación II",
          "creditos": 4,
          "estado": "approved"
        },
        {
          "codigo": "FGM-103",
          "nombre": "Análisis Matemático II",
          "creditos": 5,
          "estado": "approved"
        }
      ]
    },
    {
      "trimestre": "5to Trimestre",
      "creditos": 14,
      "materias": [
        {
          "codigo": "FGC-203",
          "nombre": "Filosofía y Sociedad",
          "creditos": 3,
          "estado": "approved"
        },
        {
          "codigo": "ISW-305",
          "nombre": "Estructura de Datos y Algoritmos",
          "creditos": 4,
          "estado": "approved"
        },
        {
          "codigo": "ING-213",
          "nombre": "Inglés Técnico para Ingenieros",
          "creditos": 3,
          "estado": "approved"
        },
        {
          "codigo": "FGC-204",
          "nombre": "Investigación Aplicada",
          "creditos": 4,
          "estado": "approved"
        }
      ]
    },
    {
      "trimestre": "6to Trimestre",
      "creditos": 13,
      "materias": [
        {
          "codigo": "FGF-201",
          "nombre": "Física General",
          "creditos": 4,
          "estado": "approved"
        },
        {
          "codigo": "LAF-201",
          "nombre": "Práctica de Física General",
          "creditos": 1,
          "estado": "approved"
        },
        {
          "codigo": "ISW-204",
          "nombre": "Diseño de Interfaz de Usuario",
          "creditos": 4,
          "estado": "approved"
        },
        {
          "codigo": "ISW-201",
          "nombre": "Ingeniería de Software I",
          "creditos": 4,
          "estado": "approved"
        }
      ]
    },
    {
      "trimestre": "7mo Trimestre",
      "creditos": 14,
      "materias": [
        {
          "codigo": "FGC-106",
          "nombre": "Historia Social Dominicana",
          "creditos": 3,
          "estado": "current"
        },
        {
          "codigo": "ISW-202",
          "nombre": "Ingeniería de Software II",
          "creditos": 4,
          "estado": "current"
        },
        {
          "codigo": "ISW-306",
          "nombre": "Desarrollo de Aplicaciones Web",
          "creditos": 4,
          "estado": "current"
        },
        {
          "codigo": "OP1",
          "nombre": "Optativa 1",
          "creditos": 3,
          "estado": "current"
        }
      ]
    },
    {
      "trimestre": "8vo Trimestre",
      "creditos": 15,
      "materias": [
        {
          "codigo": "FGM-206",
          "nombre": "Álgebra Lineal",
          "creditos": 4,
          "estado": "pending"
        },
        {
          "codigo": "FGI-209",
          "nombre": "Electrónica Básica",
          "creditos": 4,
          "estado": "pending"
        },
        {
          "codigo": "ISW-203",
          "nombre": "Calidad de Software",
          "creditos": 4,
          "estado": "pending"
        },
        {
          "codigo": "OP2",
          "nombre": "Optativa 2",
          "creditos": 3,
          "estado": "pending"
        }
      ]
    },
    {
      "trimestre": "9no Trimestre",
      "creditos": 15,
      "materias": [
        {
          "codigo": "FGC-208",
          "nombre": "Educación Constitucional",
          "creditos": 3,
          "estado": "pending"
        },
        {
          "codigo": "FGM-314",
          "nombre": "Matemática Numérica",
          "creditos": 4,
          "estado": "pending"
        },
        {
          "codigo": "FGI-210",
          "nombre": "Arquitectura de Hardware",
          "creditos": 4,
          "estado": "pending"
        },
        {
          "codigo": "FGM-207",
          "nombre": "Estadística y Probabilidades",
          "creditos": 4,
          "estado": "pending"
        }
      ]
    },
    {
      "trimestre": "10mo Trimestre",
      "creditos": 14,
      "materias": [
        {
          "codigo": "FGC-409",
          "nombre": "Ética Profesional",
          "creditos": 3,
          "estado": "pending"
        },
        {
          "codigo": "INF-304",
          "nombre": "Informática Gerencial",
          "creditos": 4,
          "estado": "pending"
        },
        {
          "codigo": "ISW-412",
          "nombre": "Minería de Datos",
          "creditos": 4,
          "estado": "pending"
        },
        {
          "codigo": "OP3",
          "nombre": "Optativa 3",
          "creditos": 3,
          "estado": "pending"
        }
      ]
    },
    {
      "trimestre": "11vo Trimestre",
      "creditos": 13,
      "materias": [
        {
          "codigo": "FGI-312",
          "nombre": "Redes y Servicios Telemáticos",
          "creditos": 4,
          "estado": "pending"
        },
        {
          "codigo": "LAT-312",
          "nombre": "Labo. Redes y Servicios Telemáticos",
          "creditos": 1,
          "estado": "pending"
        },
        {
          "codigo": "ISW-309",
          "nombre": "Inteligencia Artificial",
          "creditos": 4,
          "estado": "pending"
        },
        {
          "codigo": "INF-305",
          "nombre": "Sistemas Distribuidos",
          "creditos": 4,
          "estado": "pending"
        }
      ]
    },
    {
      "trimestre": "12vo Trimestre",
      "creditos": 13,
      "materias": [
        {
          "codigo": "COE-101",
          "nombre": "Contabilidad I",
          "creditos": 4,
          "estado": "pending"
        },
        {
          "codigo": "CID-115",
          "nombre": "Procesamiento del Lenguaje Natural",
          "creditos": 4,
          "estado": "pending"
        },
        {
          "codigo": "ISW-420",
          "nombre": "Ciberseguridad",
          "creditos": 4,
          "estado": "pending"
        },
        {
          "codigo": "LAS-313",
          "nombre": "Labo. de Ciberseguridad",
          "creditos": 1,
          "estado": "pending"
        }
      ]
    },
    {
      "trimestre": "13vo Trimestre",
      "creditos": 13,
      "materias": [
        {
          "codigo": "INF-408",
          "nombre": "Investigación de Operaciones",
          "creditos": 4,
          "estado": "pending"
        },
        {
          "codigo": "ISW-425",
          "nombre": "Programación Multiplataforma Móvil",
          "creditos": 4,
          "estado": "pending"
        },
        {
          "codigo": "LAP-414",
          "nombre": "Labo. Programación Multiplataforma",
          "creditos": 1,
          "estado": "pending"
        },
        {
          "codigo": "ISW-304",
          "nombre": "Desarrollo de Proyectos con Software Libre",
          "creditos": 4,
          "estado": "pending"
        }
      ]
    },
    {
      "trimestre": "14to Trimestre",
      "creditos": 21,
      "materias": [
        {
          "codigo": "ISW-414",
          "nombre": "Fundamentos de Inteligencia de Negocios",
          "creditos": 4,
          "estado": "pending"
        },
        {
          "codigo": "ISW-413",
          "nombre": "Simulación Digital",
          "creditos": 4,
          "estado": "pending"
        },
        {
          "codigo": "ISW-415",
          "nombre": "Ingeniería Robótica para Software Virtuales I",
          "creditos": 4,
          "estado": "pending"
        },
        {
          "codigo": "LAR-415",
          "nombre": "Labo. Robótica para Software Virtuales I",
          "creditos": 1,
          "estado": "pending"
        },
        {
          "codigo": "PPS-400",
          "nombre": "Práctica Profesional (Pasantía)",
          "creditos": 8,
          "estado": "pending"
        }
      ]
    },
    {
      "trimestre": "15to Trimestre",
      "creditos": 13,
      "materias": [
        {
          "codigo": "INF-307",
          "nombre": "Gestión del Conocimiento y Toma de Decisiones",
          "creditos": 4,
          "estado": "pending"
        },
        {
          "codigo": "ISW-416",
          "nombre": "Ingeniería Robótica para Software Virtuales II",
          "creditos": 4,
          "estado": "pending"
        },
        {
          "codigo": "LAR-416",
          "nombre": "Labo. Robótica para Software Virtuales II",
          "creditos": 1,
          "estado": "pending"
        },
        {
          "codigo": "ISW-417",
          "nombre": "Seminario de Proyectos de Software",
          "creditos": 4,
          "estado": "pending"
        }
      ]
    },
    {
      "trimestre": "16to Trimestre",
      "creditos": 6,
      "materias": [
        {
          "codigo": "ISW-400",
          "nombre": "Curso Final de Grado",
          "creditos": 6,
          "estado": "pending"
        }
      ]
    }
  ]
};

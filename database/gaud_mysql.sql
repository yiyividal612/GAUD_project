-- ============================================================
-- GAUD - Gestión Académica Universitaria Dominicana
-- Base de datos compatible con MySQL / MariaDB - XAMPP
-- ============================================================

CREATE DATABASE IF NOT EXISTS gaud
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE gaud;

-- ============================================================
-- 1. Registro y autenticación de usuarios
-- ============================================================

CREATE TABLE IF NOT EXISTS usuarios (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    correo VARCHAR(150) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    fecha_registro DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- ============================================================
-- 2. Perfil académico de usuarios
-- ============================================================

CREATE TABLE IF NOT EXISTS perfiles (
    id_perfil INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL UNIQUE,
    universidad VARCHAR(100) NOT NULL DEFAULT 'UAPA',
    carrera VARCHAR(150) NOT NULL DEFAULT 'Ingeniería de Software',
    modalidad VARCHAR(100) NOT NULL DEFAULT 'A distancia (Virtual)',
    indice_academico DECIMAL(3,2) NOT NULL DEFAULT 0.00,
    creditos_aprobados INT NOT NULL DEFAULT 0,
    creditos_totales INT NOT NULL DEFAULT 225,

    CONSTRAINT fk_perfil_usuario
        FOREIGN KEY (id_usuario)
        REFERENCES usuarios(id_usuario)
        ON DELETE CASCADE
) ENGINE=InnoDB;

-- ============================================================
-- 3. Catálogo de asignaturas
-- ============================================================

CREATE TABLE IF NOT EXISTS asignaturas (
    id_asignatura INT AUTO_INCREMENT PRIMARY KEY,
    codigo VARCHAR(20) NOT NULL UNIQUE,
    nombre VARCHAR(150) NOT NULL,
    creditos TINYINT UNSIGNED NOT NULL,
    periodo TINYINT UNSIGNED NOT NULL,

    CONSTRAINT chk_asignatura_creditos
        CHECK (creditos > 0),

    CONSTRAINT chk_asignatura_periodo
        CHECK (periodo > 0)
) ENGINE=InnoDB;

-- ============================================================
-- 4. Relación estudiante - asignatura
-- ============================================================

CREATE TABLE IF NOT EXISTS estudiante_asignatura (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    id_asignatura INT NOT NULL,
    calificacion DECIMAL(5,2) NULL,
    estado VARCHAR(20) NOT NULL DEFAULT 'Pendiente',

    CONSTRAINT fk_estudiante_asignatura_usuario
        FOREIGN KEY (id_usuario)
        REFERENCES usuarios(id_usuario)
        ON DELETE CASCADE,

    CONSTRAINT fk_estudiante_asignatura_asignatura
        FOREIGN KEY (id_asignatura)
        REFERENCES asignaturas(id_asignatura)
        ON DELETE CASCADE,

    CONSTRAINT uq_estudiante_asignatura
        UNIQUE (id_usuario, id_asignatura),

    CONSTRAINT chk_estado_enum
        CHECK (estado IN ('Pendiente', 'Cursando', 'Aprobada', 'Reprobada')),

    CONSTRAINT chk_calificacion
        CHECK (
            calificacion IS NULL
            OR (calificacion >= 0 AND calificacion <= 100)
        )
) ENGINE=InnoDB;

-- ============================================================
-- 5. Datos iniciales de asignaturas
-- ============================================================

INSERT INTO asignaturas (codigo, nombre, creditos, periodo)
VALUES
    ('FGC-106', 'Historia Social Dominicana', 3, 7),
    ('ISW-202', 'Ingeniería de Software II', 4, 7),
    ('ISW-306', 'Desarrollo de Aplicaciones Web', 4, 7),
    ('OP1', 'Optativa 1', 3, 7)
ON DUPLICATE KEY UPDATE
    nombre = VALUES(nombre),
    creditos = VALUES(creditos),
    periodo = VALUES(periodo);

-- ============================================================
-- 6. Consultas de comprobación
-- ============================================================

SHOW TABLES;

SELECT * FROM usuarios;
SELECT * FROM perfiles;
SELECT * FROM asignaturas;
SELECT * FROM estudiante_asignatura;

-- ============================================================
-- 7. Ejemplo de consulta relacionada
-- ============================================================

SELECT
    u.nombre AS estudiante,
    a.codigo,
    a.nombre AS asignatura,
    a.creditos,
    a.periodo,
    ea.calificacion,
    ea.estado
FROM estudiante_asignatura AS ea
INNER JOIN usuarios AS u
    ON ea.id_usuario = u.id_usuario
INNER JOIN asignaturas AS a
    ON ea.id_asignatura = a.id_asignatura
ORDER BY u.nombre, a.periodo, a.codigo;
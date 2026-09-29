-- ============================================================
-- GAUD - Gestión Académica Universitaria Dominicana
-- ============================================================

-- Crear base de datos si no existe
IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'gaud')
BEGIN
    CREATE DATABASE gaud;
END
GO

USE gaud;
GO

-- ============================================================
-- 1. Registro y autenticación de usuario
-- ============================================================

IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[usuarios]') AND type in (N'U'))
BEGIN
    CREATE TABLE usuarios (
        id_usuario INT IDENTITY(1,1) PRIMARY KEY,
        nombre VARCHAR(100) NOT NULL,
        correo VARCHAR(150) NOT NULL UNIQUE,
        password_hash VARCHAR(255) NOT NULL,
        fecha_registro DATETIME2 NOT NULL DEFAULT GETDATE()
    );
END
GO

-- ============================================================
-- 2. Perfil académico de usuarios
-- ============================================================

IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[perfiles]') AND type in (N'U'))
BEGIN
    CREATE TABLE perfiles (
        id_perfil INT IDENTITY(1,1) PRIMARY KEY,
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
    );
END
GO

-- ============================================================
-- 3. Catálogo de asignaturas de Ingeniería de Software
-- ============================================================

IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[asignaturas]') AND type in (N'U'))
BEGIN
    CREATE TABLE asignaturas (
        id_asignatura INT IDENTITY(1,1) PRIMARY KEY,
        codigo VARCHAR(20) NOT NULL UNIQUE,
        nombre VARCHAR(150) NOT NULL,
        creditos TINYINT NOT NULL,
        periodo TINYINT NOT NULL,

        CONSTRAINT chk_asignatura_creditos
            CHECK (creditos > 0),

        CONSTRAINT chk_asignatura_periodo
            CHECK (periodo > 0)
    );
END
GO

-- ============================================================
-- 4. Relación ESTUDIANTE_ASIGNATURA
-- ============================================================

IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[estudiante_asignatura]') AND type in (N'U'))
BEGIN
    CREATE TABLE estudiante_asignatura (
        id INT IDENTITY(1,1) PRIMARY KEY,
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
    );
END
GO

-- ============================================================
-- 5. Datos iniciales
-- ============================================================

MERGE INTO asignaturas AS target
USING (VALUES 
    ('FGC-106', 'Historia Social Dominicana', 3, 7),
    ('ISW-202', 'Ingeniería de Software II', 4, 7),
    ('ISW-306', 'Desarrollo de Aplicaciones Web', 4, 7),
    ('OP1', 'Optativa 1', 3, 7)
) AS source (codigo, nombre, creditos, periodo)
ON (target.codigo = source.codigo)
WHEN MATCHED THEN
    UPDATE SET 
        target.nombre = source.nombre,
        target.creditos = source.creditos,
        target.periodo = source.periodo
WHEN NOT MATCHED THEN
    INSERT (codigo, nombre, creditos, periodo)
    VALUES (source.codigo, source.nombre, source.creditos, source.periodo);
GO

-- ============================================================
-- 6. Consultas de comprobación
-- ============================================================

-- Listar tablas en SQL Server
SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE = 'BASE TABLE';

SELECT * FROM usuarios;
SELECT * FROM perfiles;
SELECT * FROM asignaturas;
SELECT * FROM estudiante_asignatura;
GO

-- ============================================================
-- 7. Ejemplo de consulta
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
GO
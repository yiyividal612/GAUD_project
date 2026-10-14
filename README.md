# GAUD

## Definición del proyecto

Aplicación web orientada a estudiantes universitarios en República Dominicana, para facilitar la gestión y consulta de su progreso académico. Proyecto del grupo 10, desarrollado por fases con Git, GitHub y ClickUp.

En la **Fase 4** la aplicación (login, sesiones y CRUD de la Fase 3) se integró en el framework **Laravel 12**.

## Funcionalidades

- **Login con sesiones:** el acceso se valida contra la base de datos y el usuario queda guardado en la sesión.
- **Páginas protegidas:** el panel y el módulo de asignaturas solo se abren con una sesión iniciada; sin ella redirigen al login.
- **Cierre de sesión seguro.**
- **CRUD de asignaturas:** crear, listar, editar y eliminar, con confirmación antes de borrar.
- **Mensajes de éxito y error** en los formularios y un aviso cuando no hay asignaturas registradas.

## Tecnologías y versiones

| Tecnología | Versión probada |
|---|---|
| PHP | 8.3.35 (el proyecto exige 8.2 o superior) |
| Laravel | 12.69.3 (`^12.0` en `composer.json`) |
| Composer | 2.10.3 |
| Base de datos | MySQL / MariaDB (incluida en XAMPP) |
| Plantillas | Blade |

Node.js y npm **no** son necesarios para ejecutar la aplicación.

## Requisitos previos

- **PHP 8.2 o superior** con las extensiones `curl`, `fileinfo`, `mbstring`, `mysqli`, `openssl`, `pdo_mysql` y `zip` activadas en `php.ini`.
- **Composer** 2.x.
- **MySQL o MariaDB** en ejecución (por ejemplo, el de XAMPP, con el módulo MySQL iniciado).
- **Git**.

## Instalación y configuración

Los comandos están pensados para Git Bash o una terminal equivalente.

### 1. Clonar el repositorio

```bash
git clone https://github.com/yiyividal612/GAUD_project.git
cd GAUD_project
git checkout fase-4-despliegue
```

> El `checkout` solo hace falta mientras la rama `fase-4-despliegue` no se haya unido a `main`.

### 2. Instalar las dependencias

```bash
composer install
```

### 3. Configurar el entorno

```bash
cp .env.example .env
php artisan key:generate
```

Abre el archivo `.env` y verifica que estas líneas tengan los siguientes valores (en `.env.example` algunas vienen con otro valor por defecto):

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=gaud
DB_USERNAME=root
DB_PASSWORD=

SESSION_DRIVER=file
CACHE_STORE=file
```

El archivo `.env` es personal y **nunca se sube al repositorio**.

Después de configurar el entorno, continúa con la sección **Base de datos**.

## Base de datos

La aplicación usa la base de datos `gaud`, con cuatro tablas:

| Tabla | Contenido |
|---|---|
| `usuarios` | Cuentas de acceso: nombre, correo (único) y contraseña guardada con hash |
| `perfiles` | Datos académicos de cada usuario (universidad, carrera, índice y créditos); un perfil por usuario |
| `asignaturas` | Código (único), nombre, créditos y periodo de cada asignatura |
| `estudiante_asignatura` | Relaciona a los usuarios con las asignaturas, con su calificación y estado |

### Crear la base de datos con datos de prueba

Con MySQL iniciado, desde la carpeta del proyecto:

```bash
mysql -u root < database/gaud_mysql.sql
mysql -u root gaud < database/usuario_prueba.sql
```

El orden importa: el primer script crea la base `gaud`, y el segundo inserta el usuario en ella.

En XAMPP el programa `mysql` está en `C:\xampp\mysql\bin\mysql.exe`. Alternativa con phpMyAdmin: en la pestaña **Importar** (sin seleccionar ninguna base) cargar `database/gaud_mysql.sql`; luego seleccionar la base `gaud` en el menú de la izquierda e importar `database/usuario_prueba.sql`.

Qué contiene cada script:

- `database/gaud_mysql.sql`: crea la base `gaud`, sus 4 tablas y carga asignaturas de ejemplo.
- `database/usuario_prueba.sql`: crea el usuario de demostración.

## Credenciales del usuario de demostración

| Correo | Contraseña |
|---|---|
| `admin@gaud.com` | `Admin123` |

Son credenciales de prueba, solo para uso local.

## Cómo ejecutar

1. Inicia MySQL (en XAMPP, el botón **Start** del módulo MySQL).
2. Desde la carpeta del proyecto, arranca el servidor de desarrollo de Laravel:

```bash
php artisan serve
```

3. Abre `http://127.0.0.1:8000/login` en el navegador e inicia sesión con el usuario de demostración.

Deja la terminal abierta mientras uses la aplicación; si la cierras, el servidor se detiene.

## Estructura del proyecto

| Ruta | Contenido |
|---|---|
| `routes/web.php` | Rutas de la aplicación |
| `app/Http/Controllers/` | `LoginController`, `DashboardController` y `AsignaturaController` |
| `resources/views/` | Vistas Blade: `login`, `dashboard`, `welcome` y `asignaturas/` (`index`, `edit`) |
| `resources/views/layouts/` | Plantilla base compartida (`app.blade.php`) |
| `resources/views/partials/` | Fragmentos reutilizables: `sidebar` y `alerts` |
| `public/css/` y `public/icon/` | Estilos del diseño GAUD (`styles.css`) e íconos |
| `database/` | Scripts SQL (estructura, datos de prueba y usuario de demostración) |
| `.env.example` | Plantilla de configuración del entorno |
| `fase3_backup/` | Copia del archivo de conexión a la base de datos de la Fase 3 (`conexion.php`) |

### Rutas principales

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/` | Página de inicio |
| GET / POST | `/login` | Mostrar el formulario y validar el acceso |
| POST | `/logout` | Cerrar sesión |
| GET | `/dashboard` | Panel con datos de la base de datos (requiere sesión) |
| GET / POST | `/asignaturas` | Listar y crear asignaturas |
| GET | `/asignaturas/{id}/editar` | Formulario de edición |
| PUT | `/asignaturas/{id}` | Actualizar una asignatura |
| DELETE | `/asignaturas/{id}` | Eliminar una asignatura |

## Conceptos de Laravel aplicados

- **Rutas y controladores:** `routes/web.php` asocia cada URL con un método de un controlador (por ejemplo, `asignaturas.store` con `AsignaturaController@store`), de modo que la lógica queda separada de la presentación.
- **Vistas Blade:** el HTML vive en `resources/views`; Blade permite usar directivas como `@foreach`, `@forelse`, `@error` y `@csrf`.
- **Plantilla compartida:** `layouts/app.blade.php` y los fragmentos de `partials/` (barra lateral y mensajes) evitan repetir el diseño en cada vista.
- **Protección CSRF:** todos los formularios incluyen `@csrf`; los de edición y borrado usan `@method('PUT')` y `@method('DELETE')`.
- **Sesiones:** el controlador de login guarda al usuario en la sesión y la usan las páginas protegidas.

## Solución de problemas

- **El navegador dice `ERR_CONNECTION_REFUSED`:** el servidor no está corriendo. Ejecuta `php artisan serve` y no cierres esa terminal.
- **Error de conexión a la base de datos:** confirma que MySQL está iniciado y que los datos `DB_*` del `.env` son correctos.
- **`could not find driver`:** activa la extensión `pdo_mysql` en el `php.ini` de la versión de PHP que usas.
- **`composer install` pide una versión de PHP mayor:** actualiza PHP a 8.2 o superior.

## Flujo de trabajo en equipo

- Rama de la fase: `fase-4-despliegue`, creada a partir de `main`.
- Commits individuales de cada integrante, sin credenciales en el código.
- Entrega mediante Pull Request hacia `main`; tras su aprobación se etiqueta la versión `v4.0`.
- Gestión de tareas en ClickUp (espacio *Pensum GAUD*).

## Integrantes

| Integrante | Aporte en la Fase 4 |
|---|---|
| Yudelka Corcino Pérez | Integración inicial y configuración del framework Laravel en GAUD_project, conexión con MySQL, adaptación del login, autenticación y manejo de sesiones, protección del dashboard, configuración de rutas y controladores, implementación y funcionamiento del CRUD de asignaturas mediante vistas Blade y publicación de los cambios en GitHub. |
| Julio Toribio | Vistas Blade (tabla con aviso cuando no hay asignaturas) y documentación (README) |
| Reynaldo Jesús Peña | Migración del backend a Laravel |
| Yerlin De León Vidal | Integración general e integración del frontend en Laravel |
| Tommysam Regalado | Integración del frontend en Laravel |
| Lancelot Rubiera | UI/UX y revisión visual |
| Starling Batista | UI/UX y revisión visual |

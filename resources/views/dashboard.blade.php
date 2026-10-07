<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>GAUD - Panel</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 0; background: #f2f4f8; }
        header { background: #1a3a6b; color: #fff; padding: 14px 24px; display: flex; justify-content: space-between; align-items: center; }
        header a, header button { color: #fff; margin-left: 16px; }
        header button { background: none; border: none; text-decoration: underline; cursor: pointer; font-size: inherit; }
        main { padding: 24px; }
        .logout-form { display: inline; }
    </style>
</head>
<body>
    <header>
        <strong>GAUD</strong>

        <span>
            Sesión de: {{ session('nombre') }}

            <a href="/asignaturas">Asignaturas</a>

            <form method="POST" action="{{ route('logout') }}" class="logout-form">
                @csrf
                <button type="submit">Cerrar sesión</button>
            </form>
        </span>
    </header>

    <main>
        <h2>Bienvenido, {{ session('nombre') }}</h2>
        <p>Esta página solo es visible con una sesión iniciada.</p>
    </main>
</body>
</html>
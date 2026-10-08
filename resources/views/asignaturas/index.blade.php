<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>GAUD - Asignaturas</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 0; background: #f2f4f8; }
        header { background: #1a3a6b; color: #fff; padding: 14px 24px; display: flex; justify-content: space-between; align-items: center; }
        header a, header button { color: #fff; margin-left: 16px; }
        header button { background: none; border: none; text-decoration: underline; cursor: pointer; font-size: inherit; }
        main { padding: 24px; max-width: 900px; margin: auto; }
        .tarjeta { background: #fff; padding: 20px; border-radius: 10px; margin-bottom: 20px; box-shadow: 0 2px 8px rgba(0,0,0,.08); }
        .fila { display: flex; gap: 10px; flex-wrap: wrap; }
        input { padding: 9px; border: 1px solid #ccc; border-radius: 6px; }
        button, .btn { padding: 9px 14px; background: #1a3a6b; color: #fff; border: 0; border-radius: 6px; cursor: pointer; text-decoration: none; font-size: 14px; }
        .rojo { background: #b00020; }
        table { width: 100%; border-collapse: collapse; }
        th, td { padding: 10px; text-align: left; border-bottom: 1px solid #e3e6ec; }
        .ok { background: #e6f4ea; color: #1e6b34; padding: 10px; border-radius: 6px; margin-bottom: 16px; }
        .error { background: #fde8e8; color: #b00020; padding: 10px; border-radius: 6px; margin-bottom: 16px; }
        .inline { display: inline; }
        /* Diseño responsivo para Asignaturas */

.tabla-responsive {
    width: 100%;
    overflow-x: auto;
}

@media (max-width: 768px) {
    header {
        flex-direction: column;
        align-items: flex-start;
        gap: 12px;
    }

    main {
        padding: 12px;
    }

    .tarjeta {
        padding: 15px;
    }

    .fila {
        flex-direction: column;
    }

    .fila input,
    .fila button {
        width: 100%;
        box-sizing: border-box;
    }

    .tabla-responsive table {
        min-width: 600px;
    }
}
    </style>
</head>
<body>
    <header>
        <strong>GAUD</strong>
        <span>
            Sesión de: {{ session('nombre') }}
            <a href="{{ route('dashboard') }}">Panel</a>

            <form method="POST" action="{{ route('logout') }}" class="inline">
                @csrf
                <button type="submit">Cerrar sesión</button>
            </form>
        </span>
    </header>

    <main>
        @if(session('ok'))
            <div class="ok">{{ session('ok') }}</div>
        @endif

        @if(session('error'))
            <div class="error">{{ session('error') }}</div>
        @endif

        @if($errors->any())
            <div class="error">{{ $errors->first() }}</div>
        @endif

        <div class="tarjeta">
            <h3>Nueva asignatura</h3>

            <form method="POST" action="{{ route('asignaturas.store') }}" class="fila">
                @csrf
                <input type="text" name="codigo" placeholder="Código" maxlength="20" value="{{ old('codigo') }}" required>
                <input type="text" name="nombre" placeholder="Nombre" maxlength="150" value="{{ old('nombre') }}" required>
                <input type="number" name="creditos" placeholder="Créditos" min="1" max="20" value="{{ old('creditos') }}" required>
                <input type="number" name="periodo" placeholder="Periodo" min="1" max="20" value="{{ old('periodo') }}" required>
                <button type="submit">Guardar</button>
            </form>
        </div>

        <div class="tarjeta">
            <h3>Listado de asignaturas</h3>

            <div class="tabla-responsive">
    <table>
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Nombre</th>
                        <th>Créditos</th>
                        <th>Periodo</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach($asignaturas as $asignatura)
                        <tr>
                            <td>{{ $asignatura->codigo }}</td>
                            <td>{{ $asignatura->nombre }}</td>
                            <td>{{ $asignatura->creditos }}</td>
                            <td>{{ $asignatura->periodo }}</td>
                            <td>
                                <a class="btn" href="{{ route('asignaturas.edit', $asignatura->id_asignatura) }}">Editar</a>

                                <form class="inline" method="POST" action="{{ route('asignaturas.destroy', $asignatura->id_asignatura) }}"
                                      onsubmit="return confirm('¿Seguro que deseas eliminar esta asignatura?');">
                                    @csrf
                                    @method('DELETE')
                                    <button type="submit" class="rojo">Eliminar</button>
                                </form>
                            </td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
        </div>
        </div>
    </main>
</body>
</html>

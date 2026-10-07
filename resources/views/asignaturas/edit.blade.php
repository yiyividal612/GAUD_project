<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>GAUD - Editar asignatura</title>
    <style>
        body { font-family: Arial, sans-serif; background: #f2f4f8; display: flex; justify-content: center; padding-top: 50px; }
        .caja { background: #fff; padding: 28px; border-radius: 10px; width: 340px; box-shadow: 0 2px 10px rgba(0,0,0,.1); }
        label { display: block; margin-top: 12px; font-size: 14px; }
        input { width: 100%; padding: 9px; margin-top: 5px; box-sizing: border-box; border: 1px solid #ccc; border-radius: 6px; }
        button, .btn { display: inline-block; margin-top: 18px; padding: 10px 14px; background: #1a3a6b; color: #fff; border: 0; border-radius: 6px; cursor: pointer; text-decoration: none; font-size: 14px; }
        .error { background: #fde8e8; color: #b00020; padding: 10px; border-radius: 6px; margin-top: 12px; }
    </style>
</head>
<body>
    <div class="caja">
        <h2>Editar asignatura</h2>

        @if($errors->any())
            <div class="error">{{ $errors->first() }}</div>
        @endif

        <form method="POST" action="{{ route('asignaturas.update', $asignatura->id_asignatura) }}">
            @csrf
            @method('PUT')

            <label for="codigo">Código</label>
            <input type="text" id="codigo" name="codigo" maxlength="20"
                   value="{{ old('codigo', $asignatura->codigo) }}" required>

            <label for="nombre">Nombre</label>
            <input type="text" id="nombre" name="nombre" maxlength="150"
                   value="{{ old('nombre', $asignatura->nombre) }}" required>

            <label for="creditos">Créditos</label>
            <input type="number" id="creditos" name="creditos" min="1" max="20"
                   value="{{ old('creditos', $asignatura->creditos) }}" required>

            <label for="periodo">Periodo</label>
            <input type="number" id="periodo" name="periodo" min="1" max="20"
                   value="{{ old('periodo', $asignatura->periodo) }}" required>

            <button type="submit">Guardar cambios</button>
            <a class="btn" href="{{ route('asignaturas.index') }}">Cancelar</a>
        </form>
    </div>
</body>
</html>
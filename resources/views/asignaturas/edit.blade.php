<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>GAUD - Editar asignatura</title>

    <style>
        * {
            box-sizing: border-box;
        }

        body {
            font-family: Arial, sans-serif;
            background: #f2f4f8;
            margin: 0;
            padding: 40px 16px;
            display: flex;
            justify-content: center;
            align-items: flex-start;
            min-height: 100vh;
        }

        .caja {
            background: #fff;
            padding: 28px;
            border-radius: 12px;
            width: 100%;
            max-width: 460px;
            box-shadow: 0 3px 14px rgba(0, 0, 0, .10);
        }

        h2 {
            color: #1a3a6b;
            margin-top: 0;
            margin-bottom: 8px;
        }

        .descripcion {
            color: #596579;
            font-size: 14px;
            line-height: 1.5;
            margin-bottom: 22px;
        }

        label {
            display: block;
            margin-top: 16px;
            margin-bottom: 6px;
            font-size: 14px;
            font-weight: bold;
            color: #26354a;
        }

        input {
            display: block;
            width: 100%;
            padding: 11px 12px;
            border: 1px solid #b9c3d0;
            border-radius: 7px;
            font-size: 15px;
            background: #fff;
        }

        input:focus-visible {
            outline: 2px solid #1a3a6b;
            outline-offset: 2px;
            border-color: #1a3a6b;
        }

        input[aria-invalid="true"] {
            border-color: #b00020;
        }

        .error {
            background: #fde8e8;
            color: #9d1025;
            padding: 12px;
            border-radius: 7px;
            margin: 14px 0;
            font-size: 14px;
            line-height: 1.5;
        }

        .error ul {
            margin: 0;
            padding-left: 20px;
        }

        .error-campo {
            color: #9d1025;
            font-size: 13px;
            margin-top: 5px;
        }

        .acciones {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            margin-top: 24px;
        }

        button, .btn {
            display: inline-flex;
            justify-content: center;
            align-items: center;
            padding: 12px 16px;
            border-radius: 7px;
            font-size: 14px;
            font-weight: bold;
            text-decoration: none;
            cursor: pointer;
            transition: background-color .2s ease;
        }

        button {
            background: #1a3a6b;
            color: #fff;
            border: 1px solid #1a3a6b;
        }

        button:hover {
            background: #102b51;
        }

        .btn {
            background: #eef1f5;
            color: #26354a;
            border: 1px solid #cbd3df;
        }

        .btn:hover {
            background: #dfe5ed;
        }

        button:focus-visible,
        .btn:focus-visible {
            outline: 3px solid #638de0;
            outline-offset: 3px;
        }

        @media (max-width: 480px) {
            body {
                padding: 20px 12px;
            }

            .caja {
                padding: 20px 16px;
            }

            .acciones {
                flex-direction: column;
            }

            button, .btn {
                width: 100%;
            }
        }
    </style>
</head>

<body>
    <main class="caja">
        <h2>Editar asignatura</h2>
        <p class="descripcion">
            Actualiza los datos de la asignatura y guarda los cambios.
        </p>

        @if($errors->any())
            <div class="error" role="alert">
                <strong>Revisa los siguientes errores:</strong>
                <ul>
                    @foreach($errors->all() as $error)
                        <li>{{ $error }}</li>
                    @endforeach
                </ul>
            </div>
        @endif

        <form method="POST"
              action="{{ route('asignaturas.update', $asignatura->id_asignatura) }}">
            @csrf
            @method('PUT')

            <label for="codigo">Código</label>
            <input
                type="text"
                id="codigo"
                name="codigo"
                maxlength="20"
                value="{{ old('codigo', $asignatura->codigo) }}"
                aria-invalid="{{ $errors->has('codigo') ? 'true' : 'false' }}"
                required
            >
            @error('codigo')
                <div class="error-campo">{{ $message }}</div>
            @enderror

            <label for="nombre">Nombre de la asignatura</label>
            <input
                type="text"
                id="nombre"
                name="nombre"
                maxlength="150"
                value="{{ old('nombre', $asignatura->nombre) }}"
                aria-invalid="{{ $errors->has('nombre') ? 'true' : 'false' }}"
                required
            >
            @error('nombre')
                <div class="error-campo">{{ $message }}</div>
            @enderror

            <label for="creditos">Créditos</label>
            <input
                type="number"
                id="creditos"
                name="creditos"
                min="1"
                max="20"
                value="{{ old('creditos', $asignatura->creditos) }}"
                aria-invalid="{{ $errors->has('creditos') ? 'true' : 'false' }}"
                required
            >
            @error('creditos')
                <div class="error-campo">{{ $message }}</div>
            @enderror

            <label for="periodo">Período</label>
            <input
                type="number"
                id="periodo"
                name="periodo"
                min="1"
                max="20"
                value="{{ old('periodo', $asignatura->periodo) }}"
                aria-invalid="{{ $errors->has('periodo') ? 'true' : 'false' }}"
                required
            >
            @error('periodo')
                <div class="error-campo">{{ $message }}</div>
            @enderror

            <div class="acciones">
                <button type="submit">Guardar cambios</button>
                <a class="btn" href="{{ route('asignaturas.index') }}">
                    Cancelar
                </a>
            </div>
        </form>
    </main>
</body>
</html>

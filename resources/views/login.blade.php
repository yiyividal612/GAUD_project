<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>GAUD - Iniciar sesión</title>

    <style>
        body {
            font-family: Arial, sans-serif;
            background: #f2f4f8;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            margin: 0;
        }

        .caja {
            background: #fff;
            padding: 32px;
            border-radius: 10px;
            width: 320px;
            box-shadow: 0 2px 10px rgba(0,0,0,.1);
        }

        h1 {
            margin-top: 0;
            font-size: 22px;
            text-align: center;
        }

        label {
            display: block;
            margin-top: 14px;
            font-size: 14px;
        }

        input {
            width: 100%;
            padding: 10px;
            margin-top: 6px;
            box-sizing: border-box;
            border: 1px solid #ccc;
            border-radius: 6px;
        }

        button {
            width: 100%;
            margin-top: 20px;
            padding: 11px;
            background: #1a3a6b;
            color: #fff;
            border: 0;
            border-radius: 6px;
            cursor: pointer;
            font-size: 15px;
        }

        .error {
            background: #fde8e8;
            color: #b00020;
            padding: 10px;
            border-radius: 6px;
            margin-top: 14px;
            font-size: 14px;
        }
    </style>
</head>

<body>
    <div class="caja">
        <h1>GAUD - Iniciar sesión</h1>

        @if(session('error'))
            <div class="error">{{ session('error') }}</div>
        @endif

        @if($errors->any())
            <div class="error">
                Complete correctamente el correo y la contraseña.
            </div>
        @endif

        <form method="POST" action="{{ route('login.procesar') }}">
            @csrf

            <label for="correo">Correo</label>
            <input
                type="email"
                id="correo"
                name="correo"
                value="{{ old('correo') }}"
                required
            >

            <label for="password">Contraseña</label>
            <input
                type="password"
                id="password"
                name="password"
                required
            >

            <button type="submit">Entrar</button>
        </form>
    </div>
</body>
</html>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Iniciar sesión | Gestión Académica GAUD</title>
    <link rel="icon" href="{{ asset('icon/icon-web.png') }}" type="image/png">
    <link rel="stylesheet" href="{{ asset('css/styles.css') }}">
</head>
<body>

    <div class="auth-container">

        <div class="auth-card">

            <div class="auth-logo">
                <div class="logo-icon">
                    <img src="{{ asset('icon/icon-web.png') }}" alt="GAUD">
                </div>
                <h1>Gestión Académica</h1>
                <p>Inicia sesión en tu cuenta</p>
            </div>

            @if(session('error'))
                <div class="alert alert-danger" role="alert">{{ session('error') }}</div>
            @endif

            @if($errors->any())
                <div class="alert alert-danger" role="alert">
                    Completa correctamente el correo y la contraseña.
                </div>
            @endif

            <form method="POST" action="{{ route('login.procesar') }}">
                @csrf

                <div class="form-group">
                    <label for="correo">Correo electrónico</label>
                    <input
                        type="email"
                        id="correo"
                        name="correo"
                        value="{{ old('correo') }}"
                        placeholder="ejemplo@gmail.com"
                        autocomplete="email"
                        aria-invalid="{{ $errors->has('correo') ? 'true' : 'false' }}"
                        required
                    >
                    @error('correo')
                        <div class="field-error">{{ $message }}</div>
                    @enderror
                </div>

                <div class="form-group">
                    <label for="password">Contraseña</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Ingresa tu contraseña"
                        autocomplete="current-password"
                        aria-invalid="{{ $errors->has('password') ? 'true' : 'false' }}"
                        required
                    >
                    @error('password')
                        <div class="field-error">{{ $message }}</div>
                    @enderror
                </div>

                <button type="submit" class="btn btn-primary">Iniciar sesión</button>

            </form>

        </div>

    </div>

</body>
</html>

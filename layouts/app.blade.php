<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@yield('title', 'GAUD') | Gestión Académica GAUD</title>
    <link rel="icon" href="{{ asset('icon/icon-web.png') }}" type="image/png">
    <link rel="stylesheet" href="{{ asset('css/styles.css') }}">
</head>
<body>

    <div class="app-layout">

        {{-- Checkbox oculto que abre y cierra el menú en celulares --}}
        <input type="checkbox" id="menu-toggle" class="menu-toggle" aria-hidden="true">

        @include('partials.sidebar')

        <label for="menu-toggle" class="sidebar-overlay" aria-hidden="true"></label>

        <div class="main-content">

            <header class="topbar">
                <label for="menu-toggle" class="menu-button" aria-label="Abrir menú">
                    <span></span><span></span><span></span>
                </label>

                <div class="topbar-title">
                    <h1>@yield('page-title')</h1>
                    <p>@yield('page-subtitle')</p>
                </div>

                <div class="topbar-actions">
                    @yield('topbar-actions')
                </div>
            </header>

            <main class="page-content">
                @include('partials.alerts')

                @yield('content')
            </main>

            <footer class="app-footer">
                GAUD &middot; Gestión Académica Universitaria Dominicana &middot; Grupo 10 &middot; {{ date('Y') }}
            </footer>

        </div>

    </div>

</body>
</html>

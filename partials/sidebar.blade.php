<aside class="sidebar">
    <div class="sidebar-header">
        <div class="logo-img">
            <img src="{{ asset('icon/icon-web.png') }}" alt="GAUD">
        </div>
        <h2>GAUD</h2>
        <p>Gestión Académica</p>
    </div>

    <nav class="sidebar-nav">
        <a href="{{ route('dashboard') }}" class="{{ request()->routeIs('dashboard') ? 'active' : '' }}">
            <span class="nav-icon"><img src="{{ asset('icon/tachometer-average.png') }}" alt=""></span> Dashboard
        </a>

        <a href="{{ route('asignaturas.index') }}" class="{{ request()->routeIs('asignaturas.*') ? 'active' : '' }}">
            <span class="nav-icon"><img src="{{ asset('icon/books.png') }}" alt=""></span> Asignaturas
        </a>
<a href="{{ route('perfil.index') }}"
rfil.*') ? 'active' : '' }}">

    <span class="nav-icon">
         }}" alt="">
    </span>

    Mi Perfil
</a>
        {{-- Cerrar sesión: es POST con @csrf porque Laravel lo exige para la ruta logout --}}
        <form method="POST" action="{{ route('logout') }}">
            @csrf
            <button type="submit" class="nav-button">
                <span class="nav-icon"><img src="{{ asset('icon/user-logout.png') }}" alt=""></span> Cerrar sesión
            </button>
        </form>
    </nav>

    <div class="sidebar-footer">
        <div class="user-mini">
            <div class="user-avatar"><img src="{{ asset('icon/user.png') }}" alt=""></div>
            <div class="user-info">
                <div class="user-name">{{ session('nombre', 'Estudiante') }}</div>
                <div class="user-role">Estudiante</div>
            </div>
        </div>
    </div>
</aside>
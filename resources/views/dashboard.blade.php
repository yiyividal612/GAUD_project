@extends('layouts.app')

@section('title', 'Dashboard')

@section('page-title', 'Bienvenido, ' . session('nombre', 'Estudiante'))

@section('page-subtitle')
    {{ $perfil->carrera ?? 'Ingeniería de Software' }} &middot; {{ $perfil->universidad ?? 'UAPA' }}
@endsection

@section('topbar-actions')
    <a href="{{ route('asignaturas.index') }}" class="btn btn-outline">Ver asignaturas</a>
@endsection

@section('content')

    {{-- Stats --}}
    <div class="stats-grid">
        <div class="stat-card">
            <div class="stat-icon blue"><img src="{{ asset('icon/tachometer-average.png') }}" alt=""></div>
            <div class="stat-value">{{ $stats['indice'] }}</div>
            <div class="stat-label">Índice académico</div>
        </div>
        <div class="stat-card">
            <div class="stat-icon green"><img src="{{ asset('icon/check.png') }}" alt=""></div>
            <div class="stat-value">{{ $stats['creditos'] }}</div>
            <div class="stat-label">Créditos aprobados</div>
        </div>
        <div class="stat-card">
            <div class="stat-icon orange"><img src="{{ asset('icon/books.png') }}" alt=""></div>
            <div class="stat-value">{{ $stats['aprobadas'] }}</div>
            <div class="stat-label">Asignaturas aprobadas</div>
        </div>
        <div class="stat-card">
            <div class="stat-icon purple"><img src="{{ asset('icon/duration-alt.png') }}" alt=""></div>
            <div class="stat-value">{{ $stats['pendientes'] }}</div>
            <div class="stat-label">Asignaturas pendientes</div>
        </div>
        <div class="stat-card">
            <div class="stat-icon blue"><img src="{{ asset('icon/tachometer-average.png') }}" alt=""></div>
            <div class="stat-value">{{ $stats['progreso'] }}%</div>
            <div class="stat-label">Progreso de carrera</div>
        </div>
    </div>

    {{-- Dashboard Grid --}}
    <div class="dashboard-grid">

        {{-- Asignaturas que cursa el estudiante --}}
        <div class="card">
            <div class="card-header">
                <h3>Asignaturas del período actual</h3>
                <span class="badge badge-info">{{ $cursando->count() }} cursando</span>
            </div>
            <div class="card-body">
                @forelse($cursando as $asignatura)
                    <div class="subject-list-item">
                        <div class="subject-info">
                            <h4>{{ $asignatura->codigo }} - {{ $asignatura->nombre }}</h4>
                            <p>{{ $asignatura->creditos }} créditos &middot; Período {{ $asignatura->periodo }}</p>
                        </div>
                        <span class="badge badge-success">Cursando</span>
                    </div>
                @empty
                    <div class="subject-list-item">
                        <div class="subject-info">
                            <p>Todavía no tienes asignaturas en curso registradas.</p>
                        </div>
                    </div>
                @endforelse
            </div>
        </div>

        {{-- Resumen del catálogo (datos del CRUD) --}}
        <div class="card">
            <div class="card-header">
                <h3>Catálogo de asignaturas</h3>
                <span class="badge badge-info">{{ $catalogo['total'] }} &middot; {{ $catalogo['creditos'] }} CR</span>
            </div>
            <div class="card-body">
                @forelse($catalogo['recientes'] as $asignatura)
                    <div class="subject-list-item">
                        <div class="subject-info">
                            <h4>{{ $asignatura->codigo }} - {{ $asignatura->nombre }}</h4>
                            <p>{{ $asignatura->creditos }} créditos &middot; Período {{ $asignatura->periodo }}</p>
                        </div>
                    </div>
                @empty
                    <div class="subject-list-item">
                        <div class="subject-info">
                            <p>Aún no hay asignaturas registradas.</p>
                        </div>
                    </div>
                @endforelse

                <div class="form-actions">
                    <a href="{{ route('asignaturas.index') }}" class="btn btn-outline btn-sm">Gestionar asignaturas</a>
                </div>
            </div>
        </div>

    </div>

@endsection

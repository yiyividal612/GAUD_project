@extends('layouts.app')

@section('title', 'Asignaturas')

@section('page-title', 'Mis Asignaturas')

@section('page-subtitle', 'Gestión del catálogo de asignaturas del pénsum')

@section('topbar-actions')
    <a href="{{ route('dashboard') }}" class="btn btn-outline">Volver</a>
@endsection

@section('content')

    {{-- Crear asignatura --}}
    <div class="card">
        <div class="card-header">
            <h3>Nueva asignatura</h3>
        </div>
        <div class="card-body">
            <form method="POST" action="{{ route('asignaturas.store') }}" class="crud-form">
                @csrf

                <div class="form-group">
                    <label for="codigo">Código</label>
                    <input type="text" id="codigo" name="codigo" placeholder="Ej. ISW-306"
                           maxlength="20" value="{{ old('codigo') }}"
                           aria-invalid="{{ $errors->has('codigo') ? 'true' : 'false' }}" required>
                </div>

                <div class="form-group">
                    <label for="nombre">Nombre de la asignatura</label>
                    <input type="text" id="nombre" name="nombre" placeholder="Ej. Desarrollo de Aplicaciones Web"
                           maxlength="150" value="{{ old('nombre') }}"
                           aria-invalid="{{ $errors->has('nombre') ? 'true' : 'false' }}" required>
                </div>

                <div class="form-group">
                    <label for="creditos">Créditos</label>
                    <input type="number" id="creditos" name="creditos" placeholder="Ej. 4"
                           min="1" max="20" value="{{ old('creditos') }}"
                           aria-invalid="{{ $errors->has('creditos') ? 'true' : 'false' }}" required>
                </div>

                <div class="form-group">
                    <label for="periodo">Período</label>
                    <input type="number" id="periodo" name="periodo" placeholder="Ej. 7"
                           min="1" max="20" value="{{ old('periodo') }}"
                           aria-invalid="{{ $errors->has('periodo') ? 'true' : 'false' }}" required>
                </div>

                <button type="submit" class="btn btn-primary btn-auto">Guardar</button>
            </form>
        </div>
    </div>

    {{-- Listado de asignaturas --}}
    <div class="card">
        <div class="card-header">
            <h3>Listado de asignaturas</h3>
            <span class="badge badge-info">{{ $asignaturas->count() }} registradas</span>
        </div>
        <div class="card-body">
            <div class="table-responsive">
                <table class="table">
                    <thead>
                        <tr>
                            <th>Código</th>
                            <th>Nombre</th>
                            <th>Créditos</th>
                            <th>Período</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        @forelse($asignaturas as $asignatura)
                            <tr>
                                <td>{{ $asignatura->codigo }}</td>
                                <td>{{ $asignatura->nombre }}</td>
                                <td>{{ $asignatura->creditos }}</td>
                                <td>{{ $asignatura->periodo }}</td>
                                <td>
                                    <div class="actions">
                                        <a class="btn btn-outline btn-sm" href="{{ route('asignaturas.edit', $asignatura->id_asignatura) }}">Editar</a>

                                        <form method="POST" action="{{ route('asignaturas.destroy', $asignatura->id_asignatura) }}"
                                              onsubmit="return confirm('¿Seguro que deseas eliminar esta asignatura?');">
                                            @csrf
                                            @method('DELETE')
                                            <button type="submit" class="btn btn-danger btn-sm">Eliminar</button>
                                        </form>
                                    </div>
                                </td>
                            </tr>
                        @empty
                            <tr>
                                <td colspan="5" class="empty">
                                    Aún no hay asignaturas registradas. Usa el formulario de arriba para crear la primera.
                                </td>
                            </tr>
                        @endforelse
                    </tbody>
                </table>
            </div>
        </div>
    </div>

@endsection

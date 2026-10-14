@extends('layouts.app')

@section('title', 'Editar asignatura')

@section('page-title', 'Editar asignatura')

@section('page-subtitle', 'Actualiza los datos de la asignatura y guarda los cambios')

@section('topbar-actions')
    <a href="{{ route('asignaturas.index') }}" class="btn btn-outline">Volver</a>
@endsection

@section('content')

    <div class="card card-narrow">
        <div class="card-header">
            <h3>{{ $asignatura->codigo }} - {{ $asignatura->nombre }}</h3>
        </div>
        <div class="card-body">
            <form method="POST" action="{{ route('asignaturas.update', $asignatura->id_asignatura) }}">
                @csrf
                @method('PUT')

                <div class="form-group">
                    <label for="codigo">Código</label>
                    <input type="text" id="codigo" name="codigo" maxlength="20"
                           value="{{ old('codigo', $asignatura->codigo) }}"
                           aria-invalid="{{ $errors->has('codigo') ? 'true' : 'false' }}" required>
                    @error('codigo')
                        <div class="field-error">{{ $message }}</div>
                    @enderror
                </div>

                <div class="form-group">
                    <label for="nombre">Nombre de la asignatura</label>
                    <input type="text" id="nombre" name="nombre" maxlength="150"
                           value="{{ old('nombre', $asignatura->nombre) }}"
                           aria-invalid="{{ $errors->has('nombre') ? 'true' : 'false' }}" required>
                    @error('nombre')
                        <div class="field-error">{{ $message }}</div>
                    @enderror
                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label for="creditos">Créditos</label>
                        <input type="number" id="creditos" name="creditos" min="1" max="20"
                               value="{{ old('creditos', $asignatura->creditos) }}"
                               aria-invalid="{{ $errors->has('creditos') ? 'true' : 'false' }}" required>
                        @error('creditos')
                            <div class="field-error">{{ $message }}</div>
                        @enderror
                    </div>

                    <div class="form-group">
                        <label for="periodo">Período</label>
                        <input type="number" id="periodo" name="periodo" min="1" max="20"
                               value="{{ old('periodo', $asignatura->periodo) }}"
                               aria-invalid="{{ $errors->has('periodo') ? 'true' : 'false' }}" required>
                        @error('periodo')
                            <div class="field-error">{{ $message }}</div>
                        @enderror
                    </div>
                </div>

                <div class="form-actions">
                    <button type="submit" class="btn btn-primary btn-auto">Guardar cambios</button>
                    <a class="btn btn-outline" href="{{ route('asignaturas.index') }}">Cancelar</a>
                </div>
            </form>
        </div>
    </div>

@endsection

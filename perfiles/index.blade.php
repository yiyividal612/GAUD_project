@extends('layouts.app')

@section('title', 'Mi Perfil')

@section('page-title', 'Mi Perfil')

@section('page-subtitle', 'Información personal y académica')

@section('topbar-actions')
    <a href="/dashboard" class="btn btn-outline">Volver</a>
@endsection

@section('content')

<div class="card">

    <div class="card-header">
        <h3>Datos Académicos</h3>
    </div>

    <div class="card-body">

        @if($perfil)

            <div class="info-row">
                <span class="info-label">Universidad</span>
                <span class="info-value">{{ $perfil->universidad }}</span>
            </div>

            <div class="info-row">
                <span class="info-label">Carrera</span>
                <span class="info-value">{{ $perfil->carrera }}</span>
            </div>

            <div class="info-row">
                <span class="info-label">Modalidad</span>
                <span class="info-value">{{ $perfil->modalidad }}</span>
            </div>

            <div class="info-row">
                <span class="info-label">Índice Académico</span>
                <span class="info-value">{{ $perfil->indice_academico }}</span>
            </div>

            <div class="info-row">
                <span class="info-label">Créditos Aprobados</span>
                <span class="info-value">{{ $perfil->creditos_aprobados }}</span>
            </div>

            <div class="info-row">
                <span class="info-label">Créditos Totales</span>
                <span class="info-value">{{ $perfil->creditos_totales }}</span>
            </div>

        @else

            <p>No existe información de perfil.</p>

        @endif

    </div>

</div>

@endsection
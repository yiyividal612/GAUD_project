@extends('layouts.app')

@section('title', 'Dashboard')

@section('page-title', 'Dashboard')

@section('page-subtitle', 'Panel principal de GAUD')

@section('content')

<div class="card">
    <div class="card-header">
        <h3>Bienvenido, {{ session('nombre') }}</h3>
    </div>

    <div class="card-body">
        <p>Esta página solo es visible con una sesión iniciada.</p>
    </div>
</div>

@endsection
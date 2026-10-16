{{-- Mensajes que mandan los controladores con ->with('ok') o ->with('error') --}}
@if(session('ok'))
    <div class="alert alert-success" role="status">{{ session('ok') }}</div>
@endif

@if(session('error'))
    <div class="alert alert-danger" role="alert">{{ session('error') }}</div>
@endif

{{-- Errores de validación del servidor ($request->validate) --}}
@if($errors->any())
    <div class="alert alert-danger" role="alert">
        <strong>Por favor, revisa los siguientes errores:</strong>
        <ul>
            @foreach($errors->all() as $error)
                <li>{{ $error }}</li>
            @endforeach
        </ul>
    </div>
@endif

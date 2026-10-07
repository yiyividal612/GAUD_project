<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\AsignaturaController;

Route::get('/', function () {
    return redirect('/login');
});

Route::get('/login', [LoginController::class, 'mostrarLogin'])->name('login');

Route::post('/login', [LoginController::class, 'iniciarSesion'])->name('login.procesar');

Route::get('/dashboard', function () {
    if (!session()->has('id_usuario')) {
        return redirect('/login');
    }

    return view('dashboard');
})->name('dashboard');

Route::post('/logout', [LoginController::class, 'cerrarSesion'])->name('logout');
Route::get('/asignaturas', [AsignaturaController::class, 'index'])->name('asignaturas.index');
Route::post('/asignaturas', [AsignaturaController::class, 'store'])->name('asignaturas.store');
Route::get('/asignaturas/{id}/editar', [AsignaturaController::class, 'edit'])->name('asignaturas.edit');
Route::put('/asignaturas/{id}', [AsignaturaController::class, 'update'])->name('asignaturas.update');
Route::delete('/asignaturas/{id}', [AsignaturaController::class, 'destroy'])->name('asignaturas.destroy');
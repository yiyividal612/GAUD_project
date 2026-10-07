<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class LoginController extends Controller
{
    public function mostrarLogin(Request $request)
    {
        if ($request->session()->has('id_usuario')) {
            return redirect('/dashboard');
        }

        return view('login');
    }

    public function iniciarSesion(Request $request)
    {
        $request->validate([
            'correo' => 'required|email',
            'password' => 'required',
        ]);

        $usuario = DB::table('usuarios')
            ->where('correo', $request->correo)
            ->first();

        if ($usuario && password_verify($request->password, $usuario->password_hash)) {
            $request->session()->regenerate();

            $request->session()->put('id_usuario', $usuario->id_usuario);
            $request->session()->put('nombre', $usuario->nombre);

            return redirect('/dashboard');
        }

        return back()
            ->withInput($request->only('correo'))
            ->with('error', 'Correo o contraseña incorrectos.');
    }

    public function cerrarSesion(Request $request)
    {
        $request->session()->flush();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/login');
    }
}

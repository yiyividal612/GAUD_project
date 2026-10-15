<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PerfilController extends Controller
{
    private function verificarSesion(Request $request)
    {
        if (!$request->session()->has('id_usuario')) {
            return redirect('/login');
        }

        return null;
    }

    public function index(Request $request)
    {
        if ($respuesta = $this->verificarSesion($request)) {
            return $respuesta;
        }
	

       $perfil = DB::table('perfiles')
    ->where('id_usuario', session('id_usuario'))
    ->first();

        return view('perfiles.index', compact('perfil'));
    }
}

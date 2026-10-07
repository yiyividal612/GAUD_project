<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AsignaturaController extends Controller
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

        $asignaturas = DB::table('asignaturas')
            ->orderBy('periodo')
            ->orderBy('codigo')
            ->get();

        return view('asignaturas.index', compact('asignaturas'));
    }

    public function store(Request $request)
    {
        if ($respuesta = $this->verificarSesion($request)) {
            return $respuesta;
        }

        $datos = $request->validate([
            'codigo' => 'required|string|max:20|unique:asignaturas,codigo',
            'nombre' => 'required|string|max:150',
            'creditos' => 'required|integer|min:1|max:20',
            'periodo' => 'required|integer|min:1|max:20',
        ]);

        DB::table('asignaturas')->insert($datos);

        return redirect('/asignaturas')
            ->with('ok', 'Asignatura creada correctamente.');
    }

    public function edit(Request $request, $id)
    {
        if ($respuesta = $this->verificarSesion($request)) {
            return $respuesta;
        }

        $asignatura = DB::table('asignaturas')
            ->where('id_asignatura', $id)
            ->first();

        if (!$asignatura) {
            return redirect('/asignaturas')
                ->with('error', 'La asignatura no existe.');
        }

        return view('asignaturas.edit', compact('asignatura'));
    }

    public function update(Request $request, $id)
    {
        if ($respuesta = $this->verificarSesion($request)) {
            return $respuesta;
        }

        $datos = $request->validate([
            'codigo' => 'required|string|max:20|unique:asignaturas,codigo,' . $id . ',id_asignatura',
            'nombre' => 'required|string|max:150',
            'creditos' => 'required|integer|min:1|max:20',
            'periodo' => 'required|integer|min:1|max:20',
        ]);

        DB::table('asignaturas')
            ->where('id_asignatura', $id)
            ->update($datos);

        return redirect('/asignaturas')
            ->with('ok', 'Asignatura actualizada correctamente.');
    }

    public function destroy(Request $request, $id)
    {
        if ($respuesta = $this->verificarSesion($request)) {
            return $respuesta;
        }

        try {
            DB::table('asignaturas')
                ->where('id_asignatura', $id)
                ->delete();

            return redirect('/asignaturas')
                ->with('ok', 'Asignatura eliminada.');
        } catch (\Exception $e) {
            return redirect('/asignaturas')
                ->with('error', 'No se pudo eliminar: la asignatura está en uso.');
        }
    }
}
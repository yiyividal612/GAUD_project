<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    /**
     * Muestra el panel del estudiante con datos reales de la base de datos.
     * Laravel inyecta el objeto Request automáticamente (contenedor de dependencias).
     */
    public function index(Request $request)
    {
        if (!$request->session()->has('id_usuario')) {
            return redirect('/login');
        }

        $idUsuario = $request->session()->get('id_usuario');

        // Perfil académico del usuario (puede no existir todavía)
        $perfil = DB::table('perfiles')
            ->where('id_usuario', $idUsuario)
            ->first();

        // Conteo de asignaturas del estudiante por estado
        $porEstado = DB::table('estudiante_asignatura')
            ->select('estado', DB::raw('COUNT(*) as total'))
            ->where('id_usuario', $idUsuario)
            ->groupBy('estado')
            ->pluck('total', 'estado');

        $creditosAprobados = $perfil->creditos_aprobados ?? 0;
        $creditosTotales   = $perfil->creditos_totales ?? 225;

        $stats = [
            'indice'      => number_format($perfil->indice_academico ?? 0, 2),
            'creditos'    => $creditosAprobados,
            'aprobadas'   => $porEstado['Aprobada'] ?? 0,
            'pendientes'  => $porEstado['Pendiente'] ?? 0,
            'progreso'    => $creditosTotales > 0
                                ? round($creditosAprobados / $creditosTotales * 100)
                                : 0,
        ];

        // Asignaturas que el estudiante está cursando
        $cursando = DB::table('estudiante_asignatura as ea')
            ->join('asignaturas as a', 'ea.id_asignatura', '=', 'a.id_asignatura')
            ->where('ea.id_usuario', $idUsuario)
            ->where('ea.estado', 'Cursando')
            ->orderBy('a.codigo')
            ->get(['a.codigo', 'a.nombre', 'a.creditos', 'a.periodo']);

        // Resumen del catálogo de asignaturas (CRUD)
        $catalogo = [
            'total'    => DB::table('asignaturas')->count(),
            'creditos' => DB::table('asignaturas')->sum('creditos'),
            'recientes' => DB::table('asignaturas')
                ->orderByDesc('id_asignatura')
                ->limit(5)
                ->get(['codigo', 'nombre', 'creditos', 'periodo']),
        ];

        return view('dashboard', compact('perfil', 'stats', 'cursando', 'catalogo'));
    }
}

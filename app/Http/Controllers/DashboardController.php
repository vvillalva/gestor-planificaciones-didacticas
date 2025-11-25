<?php

namespace App\Http\Controllers;

use App\Models\Planeacion;

class DashboardController extends Controller
{
    public function index()
    {
        // === MÉTRICAS ===
        $totalPlaneaciones = Planeacion::count();
        $planeacionesActivas = Planeacion::where('estatus', 'Activo')->count();
        $planeacionesInactivas = Planeacion::where('estatus', 'Inactivo')->count();

        // Por grado (si lo usas)
        $porGrado = Planeacion::selectRaw('grado, COUNT(*) as total')
            ->groupBy('grado')
            ->get();

        // === LISTA DE PLANEACIONES ===
        $planeaciones = Planeacion::with('usuario')
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        return inertia('Dashboard/Index', [
            'stats' => [
                'total' => $totalPlaneaciones,
                'activas' => $planeacionesActivas,
                'inactivas' => $planeacionesInactivas,
                'por_grado' => $porGrado,
            ],
            'planeaciones' => $planeaciones,
        ]);
    }
}
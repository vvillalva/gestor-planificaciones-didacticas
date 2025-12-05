<?php

namespace App\Http\Controllers;

use App\Models\Documento;
use App\Models\Planeacion;
use Dom\Document;

class DashboardController extends Controller
{
    public function index()
    {
        $user = auth()->user();

        // ============================
        //   FILTRO POR ROL
        // ============================

        $esAdmin = $user->hasAnyRole(['Administrador', 'Director']);

        // Base query según el rol
        $baseQuery = Planeacion::query();

        if (!$esAdmin) {
            $baseQuery->where('usuario_id', $user->id);
        }

        // ============================
        //   MÉTRICAS GENERALES
        // ============================

        // Total de planeaciones (según rol)
        $totalPlaneaciones = (clone $baseQuery)->count();

        // Totales por estatus
        $porEstatus = (clone $baseQuery)
            ->selectRaw('estatus, COUNT(*) as total')
            ->groupBy('estatus')
            ->get();

        // Totales por grado
        $porGrado = (clone $baseQuery)
            ->selectRaw('grado, COUNT(*) as total')
            ->groupBy('grado')
            ->get();

        // ============================
        //   MÉTRICAS POR USUARIO (solo admin)
        // ============================

        $planeacionesPorUsuario = [];

        if ($esAdmin) {
            $planeacionesPorUsuario = Planeacion::selectRaw('usuario_id, COUNT(*) as total')
                ->with('usuario:id,nombre')
                ->groupBy('usuario_id')
                ->get()
                ->map(function ($item) {
                    return [
                        'usuario' => $item->usuario->nombre ?? 'Sin nombre',
                        'total' => $item->total,
                    ];
                });
        }

        // ============================
        //   LISTADO DE PLANEACIONES
        // ============================

        $query = Planeacion::with([
            'usuario:id,nombre',
            'documents',
            'horario:id,materia,dia,hora_inicio,hora_fin' // 👈 AQUI
        ])->orderBy('created_at', 'desc');

        if (!$user->hasAnyRole(['Administrador', 'Director'])) {
            $query->where('usuario_id', $user->id);
        }

        $planeaciones = $query->take(10)->get();

        // ============================
        //   TOTAL DE DOCUMENTOS
        // ============================

        if ($esAdmin) {
            // Total de documentos del sistema
            $totalDocumentos = Documento::count();
        } else {
            // Solo documentos del usuario
            $totalDocumentos = Documento::whereIn(
                'planeacion_id',
                (clone $baseQuery)->pluck('id')
            )->count();
        }

        // ============================
        //   RESPUESTA A INERTIA
        // ============================


        return inertia('dashboard', [
            'stats' => [
                'total' => $totalPlaneaciones,
                'por_estatus' => $porEstatus,
                'por_grado' => $porGrado,
                'por_usuario' => $planeacionesPorUsuario,
                'total_documentos' => $totalDocumentos,
            ],
            'planeaciones' => $planeaciones,
            'esAdmin' => $esAdmin,
        ]);
    }
}
<?php

namespace App\Http\Controllers;

use App\Models\Horario;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class HorarioController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Traemos solo los usuarios que son DOCENTES
        $docentes = User::role('docente')
            ->withCount('horarios')           // Cuenta los horarios del docente
            ->with('horarios')                // Para verificar si tiene horarios
            ->get();

        return Inertia::render('horarios/lista-horarios', [
            'docentes' => $docentes,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('horarios/nuevo-horario', [
            'docentes' => User::role('Docente')->select('id', 'nombre')->get(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // VALIDAR
        $request->validate([
            'usuario_id' => 'required|exists:users,id',
            'horarios' => 'required|array|min:1',

            'horarios.*.dia' => 'required|string',
            'horarios.*.hora_inicio' => 'required|string',
            'horarios.*.hora_fin' => 'required|string',
            'horarios.*.materia' => 'required|string',
        ]);

        // GUARDAR CADA CELDA COMO UN HORARIO
        foreach ($request->horarios as $h) {
            Horario::create([
                'usuario_id' => $request->usuario_id,
                'dia' => $h['dia'],
                'hora_inicio' => $h['hora_inicio'],
                'hora_fin' => $h['hora_fin'],
                'materia' => $h['materia'],
            ]);
        }

        return to_route("horarios.index");
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        // Obtener al docente y sus horarios
        $usuario = User::with('horarios')
            ->findOrFail($id);

        return Inertia::render('horarios/detalle-horario', [
            'usuario' => $usuario,
            'horarios' => $usuario->horarios,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    public function miHorario()
    {
        $usuarioId = Auth::id();

        // obtener todos los horarios del docente
        $horarios = Horario::where('usuario_id', $usuarioId)
            ->orderBy('dia')
            ->orderBy('hora_inicio')
            ->get();

        return Inertia::render('horarios/mi-horario', [
            'usuario' => Auth::user(),
            'horarios' => $horarios,
        ]);
    }
}

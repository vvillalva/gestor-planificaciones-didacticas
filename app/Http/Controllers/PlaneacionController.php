<?php

namespace App\Http\Controllers;

use App\Models\Documento;
use App\Models\Planeacion;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;

class PlaneacionController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        // Si el usuario es administrador, ve todos los casos
        // if ($user->hasRole('Director') || $user->hasRole('Administrador')) {
        //     $cases = Planeacion::with('victim_id')->get();
        // } else {
        //     // Si no es admin, solo ve los casos que él registró
        //     $cases = Planeacion::with('victim_id')
        //         ->where('user_id' , $user->id) // o 'user_id' según tu campo
        //         ->get();
        // }
        $planeaciones = Planeacion::with('documents')->get();
        return Inertia::render('planeaciones/lista-planeaciones', [
            'planeaciones' => $planeaciones
        ]);
    }

    public function create()
    {
        return Inertia::render('planeaciones/crear-planeaciones');
    }

    public function store(Request $request)
    {
        $request->validate(
            [
                'titulo' => 'required|string|max:255',
                'descripcion' => 'required|string',
                'planeacion_archivo' => 'required|file|mimes:pdf,doc,docx,png,jpg,jpeg|max:5120',
                'grado' => 'nullable|string|max:10',
                'grupo' => 'nullable|string|max:2',
            ],
            [
                'titulo.max' => 'El título no puede exceder los 255 caracteres.',
                'titulo.required' => 'El título es obligatorio.',
                'grado.max' => 'Por favor ingrese un grado válido.',
                'grupo.max' => 'Por favor ingresa un grupo válido.',
                'descripcion.required' => 'La descripción es obligatoria.',
                'planeacion_archivo.max' => 'El archivo no puede exceder los 5 MB.',
                'planeacion_archivo.mimes' => 'El archivo debe ser un tipo válido: pdf, doc, docx, png, jpg, jpeg.',
                'planeacion_archivo.required' => 'El archivo de planeación es obligatorio.',
            ]
        );

        // 1️⃣ Crear la planeación
        $planeacion = Planeacion::create([
            'titulo' => $request->titulo,
            'descripcion' => $request->descripcion,
            'estatus' => 'en_revision',
            'grado' => $request->grado,
            'grupo' => $request->grupo,
            'usuario_id' => Auth::id(),
        ]);

        // 2️⃣ Guardar archivo usando Storage (mejor práctica)
        if ($request->hasFile('planeacion_archivo')) {

            // Crea carpeta si no existe
            Storage::disk('public')->makeDirectory('planeaciones-documentos');

            $file = $request->file('planeacion_archivo');

            // Nombre limpio y único
            $fullName = time() . '_' . Str::slug(pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME))
                . '.' . $file->getClientOriginalExtension();

            // Guarda en storage/app/public/planeaciones-documentos
            $path = $file->storeAs(
                'planeaciones-documentos',  // carpeta dentro del disco "public"
                $fullName,
                'public'
            );

            // Registrar documento en la BD
            Documento::create([
                'planeacion_id' => $planeacion->id,
                'usuario_id' => Auth::id(),
                'nombre' => pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME),
                'tipo' => $file->getClientOriginalExtension(),
                'ruta' => $path, // Ej: planeaciones-documentos/12345_archivo.pdf
            ]);
        }

        return to_route("planeaciones.index")
            ->with('success', 'Se ha creado la planeación correctamente.');
    }

    public function show(Planeacion $planeacion)
    {
        //
    }

    public function edit(int $id)
    {
        $planeacion = Planeacion::with([
            'documents',
        ])->findOrFail($id);
        // $planeacion = Planeacion::find($id);
        return Inertia::render("planeaciones/editar-planeaciones", [
            'planeacion' => $planeacion,
        ]);
    }

    private function safeUpdate($model, array $data): void
    {
        // Solo ignora valores NULL, pero sí permite "" o 0
        $filtered = array_filter($data, fn($v) => !is_null($v));

        if (!empty($filtered)) {
            $model->update($filtered);
        }
    }

    public function update(Request $request, Planeacion $planeacion)
    {
        // 🔹 Validación
        $validated = $request->validate(
            [
                'titulo' => ['sometimes', 'filled', 'string', 'max:255'],
                'descripcion' => ['sometimes', 'filled', 'string'],
                'grado' => ['sometimes', 'filled', 'string'],
                'grupo' => ['sometimes', 'filled', 'string'],
                // Archivo (opcional)
                'planeacion_archivo' => [
                    'nullable',
                    'file',
                    'mimes:pdf,doc,docx,png,jpg,jpeg',
                    'max:5120'
                ],
            ],
            [
                '*.filled' => 'Por favor completa este campo.',
                '*.max' => 'Este campo supera el límite permitido.',
                'planeacion_archivo.mimes' => 'El archivo debe ser pdf, doc, docx, png, jpg o jpeg.',
                'planeacion_archivo.max' => 'El archivo no puede exceder los 5 MB.',
            ]
        );

        DB::transaction(function () use ($validated, $request, $planeacion) {

            // 1️⃣ Actualizar datos simples de la planeación
            $this->safeUpdate($planeacion, [
                'titulo' => $validated['titulo'] ?? null,
                'descripcion' => $validated['descripcion'] ?? null,
                'grado' => $validated['grado'] ?? null,
                'grupo' => $validated['grupo'] ?? null,
            ]);

            // 2️⃣ Manejar archivo (opcional)
            if ($request->hasFile('planeacion_archivo')) {

                $file = $request->file('planeacion_archivo');
                $fileName = time() . '_' . \Str::slug(pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME));
                $extension = $file->getClientOriginalExtension();
                $fullName = $fileName . '.' . $extension;

                // Buscar documento actual (si tienes más de uno, ajusta la lógica)
                $documento = $planeacion->documents()->latest()->first();

                // Borrar archivo anterior si existe
                if ($documento && $documento->ruta) {
                    Storage::disk('public')->delete($documento->ruta);
                }

                // Guardar nuevo archivo
                $path = $file->storeAs(
                    'planeaciones-documentos',
                    $fullName,
                    'public'
                );

                if ($documento) {
                    // Actualizar documento existente
                    $documento->update([
                        'usuario_id' => Auth::id(),
                        'nombre' => pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME),
                        'tipo' => $extension,
                        'ruta' => $path,
                    ]);
                } else {
                    // Crear documento nuevo
                    Documento::create([
                        'planeacion_id' => $planeacion->id,
                        'usuario_id' => Auth::id(),
                        'nombre' => pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME),
                        'tipo' => $extension,
                        'ruta' => $path,
                    ]);
                }
            }
        });


        return to_route('planeaciones.index')
            ->with('success', 'La planeación se ha actualizado correctamente.');
    }

    public function destroy(Planeacion $planeacion)
    {
        //
    }
}

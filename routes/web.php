<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DocumentoController;
use App\Http\Controllers\PlaneacionController;
use App\Http\Controllers\RoleController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UsuarioController;
use Inertia\Inertia;

Route::get('/', function () {
    return redirect()->route('login');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])
        ->name('dashboard');

    //Usuarios Routes
    Route::resource('usuarios', UsuarioController::class)->names('usuarios')
        ->only(['create', 'store'])
        ->middleware('permission:crear.usuario');
    Route::resource('usuarios', UsuarioController::class)->names('usuarios')
        ->only(['edit', 'update'])
        ->middleware('permission:editar.usuario');
    Route::resource('usuarios', UsuarioController::class)->names('usuarios')
        ->only(['destroy'])
        ->middleware('permission:eliminar.usuario');
    Route::resource('usuarios', UsuarioController::class)->names('usuarios')
        ->only(['index', 'show'])
        ->middleware('permission:ver.usuario|crear.usuario|editar.usuario|eliminar.usuario');
    //Route::resource('usuarios', UsuarioController::class)->names('usuarios');

    //Planeaciones Routes
    Route::resource('planeaciones', PlaneacionController::class)
        ->names('planeaciones')
        ->parameters(['planeaciones' => 'planeacion'])
        ->only(['create', 'store'])
        ->middleware('permission:crear.planeacion');
    Route::resource('planeaciones', PlaneacionController::class)
        ->names('planeaciones')
        ->parameters(['planeaciones' => 'planeacion'])
        ->only(['edit', 'update'])
        ->middleware('permission:editar.planeacion');
    Route::resource('planeaciones', PlaneacionController::class)
        ->names('planeaciones')
        ->parameters(['planeaciones' => 'planeacion'])
        ->only(['destroy'])
        ->middleware('permission:eliminar.planeacion');
    Route::resource('planeaciones', PlaneacionController::class)
        ->names('planeaciones')
        ->parameters(['planeaciones' => 'planeacion'])
        ->only(['index', 'show'])
        ->middleware('permission:ver.planeacion|crear.planeacion|editar.planeacion|eliminar.planeacion');
    Route::get('/planeaciones/{planeacion}/aprobar', [PlaneacionController::class, 'aprobar'])
        ->name('planeaciones.aprobar')
        ->middleware('permission:aprobar.planeacion');
    Route::put('/planeaciones/{planeacion}/aprobar', [PlaneacionController::class, 'aprobarPlaneacion'])
        ->name('planeaciones.aprobarPlaneacion')
        ->middleware('permission:aprobar.planeacion');

    //Documentos Routes
    Route::resource('documentos', DocumentoController::class)
        ->names('documentos')
        ->parameters(['documentos' => 'documento'])
        ->only(['index', 'show'])
        ->middleware('permission:ver.documento');
    Route::get('/ver-documento/{path}', function ($path) {
        $file = storage_path("app/public/" . $path);
        if (!file_exists($file)) {
            abort(404);
        }
        return response()->file($file);
    })
        ->where('path', '.*')
        ->middleware('permission:ver.documento');

    //Roles Routes
    Route::resource('roles', RoleController::class)
        ->names('roles')
        ->only(['create', 'store'])
        ->middleware('permission:crear.roles');
    Route::resource('roles', RoleController::class)
        ->names('roles')
        ->only(['edit', 'update'])
        ->middleware('permission:editar.roles');
    Route::resource('roles', RoleController::class)
        ->names('roles')
        ->only(['destroy'])
        ->middleware('permission:eliminar.roles');
    Route::resource('roles', RoleController::class)
        ->names('roles')
        ->only(['show', 'index'])
        ->middleware('permission:ver.roles|crear.roles|editar.roles|eliminar.roles');

});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';

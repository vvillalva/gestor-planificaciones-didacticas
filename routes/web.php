<?php

use App\Http\Controllers\DocumentoController;
use App\Http\Controllers\PlaneacionController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UsuarioController;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::get('/ver-documento/{path}', function ($path) {
        $file = storage_path("app/public/" . $path);

        if (!file_exists($file)) {
            abort(404);
        }
        return response()->file($file); // o ->download($file)
    })->where('path', '.*');


    Route::resource('usuarios', UsuarioController::class)->names('usuarios');
    Route::resource('planeaciones', PlaneacionController::class)->names('planeaciones')->parameters([
        'planeaciones' => 'planeacion'
    ]);
    Route::resource('documentos', DocumentoController::class)->names('documentos')->parameters([
        'documentos' => 'documento'
    ]);
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';

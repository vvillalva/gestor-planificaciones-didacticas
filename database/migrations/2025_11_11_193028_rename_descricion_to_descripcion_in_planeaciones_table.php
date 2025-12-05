<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;


return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Renombra la columna y la coloca después de "estatus"
        DB::statement('ALTER TABLE planeaciones CHANGE descripción descripcion VARCHAR(255) AFTER estatus');
    }

    public function down(): void
    {
        // Revierte el cambio
        DB::statement('ALTER TABLE planeaciones CHANGE descripcion descricion VARCHAR(255)');
    }
};

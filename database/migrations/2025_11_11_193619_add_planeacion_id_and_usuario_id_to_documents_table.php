<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('documents', function (Blueprint $table) {
            // Agregamos las nuevas columnas (ajusta el tipo según tus claves foráneas)
            $table->unsignedBigInteger('planeacion_id')->nullable()->after('id');
            $table->unsignedBigInteger('usuario_id')->nullable()->after('planeacion_id');

            // Si existen las tablas relacionadas, puedes agregar las foreign keys:
            $table->foreign('planeacion_id')->references('id')->on('planeaciones')->onDelete('cascade');
            $table->foreign('usuario_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::table('documents', function (Blueprint $table) {
            // Primero eliminamos las relaciones
            $table->dropForeign(['planeacion_id']);
            $table->dropForeign(['usuario_id']);

            // Luego eliminamos las columnas
            $table->dropColumn(['planeacion_id', 'usuario_id']);
        });
    }
};

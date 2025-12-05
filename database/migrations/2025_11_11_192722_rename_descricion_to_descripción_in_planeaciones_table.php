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
        Schema::table('planeaciones', function (Blueprint $table) {
            // Crea la nueva columna (usa el mismo tipo de dato que tenía la anterior)
            $table->string('descripción')->nullable();
        });

        // Copia los datos de la columna vieja a la nueva
        DB::statement('UPDATE planeaciones SET descripción = descricion');

        Schema::table('planeaciones', function (Blueprint $table) {
            // Elimina la columna vieja
            $table->dropColumn('descricion');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('planeaciones', function (Blueprint $table) {
            $table->string('descricion')->nullable();
        });

        DB::statement('UPDATE planeaciones SET descricion = descripción');

        Schema::table('planeaciones', function (Blueprint $table) {
            $table->dropColumn('descripción');
        });
    }
};

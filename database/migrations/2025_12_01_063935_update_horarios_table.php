<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('horarios', function (Blueprint $table) {

            // eliminar columnas que ya no sirven
            if (Schema::hasColumn('horarios', 'fecha')) {
                $table->dropColumn('fecha');
            }

            if (Schema::hasColumn('horarios', 'seleccionado')) {
                $table->dropColumn('seleccionado');
            }

            // agregar nuevas columnas
            if (!Schema::hasColumn('horarios', 'dia')) {
                $table->string('dia')->nullable();
            }

            if (!Schema::hasColumn('horarios', 'materia')) {
                $table->string('materia')->nullable();
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('horarios', function (Blueprint $table) {
            $table->date('fecha')->nullable();
            $table->boolean('seleccionado')->default(false);
            $table->dropColumn('dia');
            $table->dropColumn('materia');
        });
    }
};

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
        Schema::create('validaciones', function (Blueprint $table) {
            $table->id();
            $table->text('observacion')->nullable();
            $table->date('fecha_validacion');
            $table->foreignId('usuario_valido_id')->nullable()->constrained('users')->nullOnDelete()->restrictOnUpdate();
            $table->foreignId('planeacion_id')->constrained('planeaciones')->cascadaOndelete()->cascadeOnUpdate();
            $table->timestamps();
            $table->index(['planeacion_id', 'fecha_validacion']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('validaciones');
    }
};

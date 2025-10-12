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
        Schema::create('planeaciones', function (Blueprint $table) {
            $table->id();
            $table->string('titulo');
            $table->text('descricion');
            $table->enum('estatus',['en_revision','aprobado','rechazado'])->default('en_revision');
            $table->foreignID('usuario_id')->constrained('users')->restrictOnDelete()->restrictOnUpdate();
            $table->timestamps();
            $table->index(['usuario_id', 'estatus']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('planeaciones');
    }
};

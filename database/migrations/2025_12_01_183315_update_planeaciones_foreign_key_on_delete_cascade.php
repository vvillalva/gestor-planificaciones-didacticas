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
        $table->dropForeign(['usuario_id']);

        $table->foreign('usuario_id')
            ->references('id')
            ->on('users')
            ->onDelete('cascade'); // 👈 ahora sí elimina todo junto
    });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
    Schema::table('planeaciones', function (Blueprint $table) {
        $table->dropForeign(['usuario_id']);

        $table->foreign('usuario_id')
            ->references('id')
            ->on('users')
            ->onDelete('restrict'); // vuelve al modo anterior
    });
    }
};

<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * Agrega la columna 'rfc' al final de la tabla 'users'.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            // Eliminamos 'after()' para evitar el error de columna no encontrada
            $table->string('rfc', 255)->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * Elimina la columna 'rfc'.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('rfc');
        });
    }
};
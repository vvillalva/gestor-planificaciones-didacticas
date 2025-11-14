<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::table('planeaciones', function (Blueprint $table) {
            $table->string('grado')->after('descripcion');
            $table->string('grupo')->after('grado');
        });
    }

    public function down()
    {
        Schema::table('planeaciones', function (Blueprint $table) {
            $table->dropColumn(['grado', 'grupo']);
        });
    }
};

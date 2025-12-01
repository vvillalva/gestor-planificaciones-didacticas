<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $permissions = [
            "ver.usuario",
            "crear.usuario",
            "editar.usuario",
            "eliminar.usuario",
            "ver.planeacion",
            "crear.planeacion",
            "editar.planeacion",
            "eliminar.planeacion",
            "aprobar.planeacion",
            "ver.documento",
            "subir.documento",
            "eliminar.documento",
            "ver.roles",
            "crear.roles",
            "editar.roles",
            "eliminar.roles",
            "ver.graficas",
            "ver.graficasAdmin",
            "ver.horario",
            "crear.horario",
            "editar.horario",
            "eliminar.horario",
        ];

        foreach ($permissions as $key => $value) {
            Permission::firstOrCreate(["name" => $value]);
        }
    }
}

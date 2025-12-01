<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Horario extends Model
{
    protected $fillable = [
        'usuario_id',
        'dia',
        'hora_inicio',
        'hora_fin',
        'materia',
    ];

    public function usuario()
    {
        return $this->belongsTo(User::class, 'usuario_id');
    }

    // Relación con planeaciones (opcional)
    public function planeaciones()
    {
        return $this->hasMany(Planeacion::class, 'horario_id');
    }
}

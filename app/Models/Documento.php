<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Documento extends Model
{
    use HasFactory;

    protected $table = 'documents';

    protected $fillable = [
        'id',
        'planeacion_id',
        'usuario_id',
        'nombre',
        'tipo',
        'ruta',
        'created_at',
        'updated_at',
    ];
    // cada documento pertenece a una Planeacion
    public function planeacion()
    {
        return $this->belongsTo(Planeacion::class, 'planeacion_id');
    }

    // cada documento pertenece a un usuario
    public function usuario()
    {
        return $this->belongsTo(User::class, 'usuario_id');
    }

}

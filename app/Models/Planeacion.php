<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Planeacion extends Model
{
    use HasFactory;

    protected $table = 'planeaciones';
    protected $fillable = [
        'titulo',
        'estatus',
        'descripcion',
        'grado',
        'grupo',
        'usuario_id',
    ];

    public function usuario()
    {
        return $this->belongsTo(User::class, 'usuario_id');
    }
    
    public function documents()
    {
        return $this->hasMany(Documento::class, 'planeacion_id');
    }
}

<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Spatie\Permission\Models\Role;
use Inertia\Inertia;
use Illuminate\Support\Facades\Hash;
use App\Models\Bitacora;
use Illuminate\Support\Facades\Auth;

class UsuarioController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $usuarios = User::all();
        return Inertia::render('usuarios/lista-usuarios', [
            'usuarios' => $usuarios,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('usuarios/nuevo-usuarios',[
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => ['required', 'string', 'max:255', 'regex:/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/'],
            'lastname' => ['required', 'string', 'max:255', 'regex:/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users,email'],
            'password' => ['required', 'string', 'min:8', 'same:confirm_password', 'regex:/[A-Z]/', 'regex:/[0-9]/', 'regex:/[a-z]/'],
            'confirm_password' => ['required', 'string', 'min:8'],
            'rol' => ['required', 'string', 'max:255'],
        ], [
            'name.required' => 'El nombre es obligatorio para el registro.',
            'name.max' => 'El nombre excede los caracteres permitidos.',
            'lastname.max' => 'El apellido excede los caracteres permitidos.',
            'name.regex' => 'El nombre solo puede contener letras y espacios.',
            'lastname.required' => 'El apellido es obligatorio para el registro.',
            'lastname.regex' => 'El apellido solo puede contener letras y espacios.',
            'email.required' => 'El correo electrónico es obligatorio.',
            'email.email' => 'El formato del correo no es válido.',
            'email.unique' => 'Este correo ya está registrado.',
            'password.same' => 'Las contraseñas no coinciden, revisa que sean las mismas.',
            'password.required' => 'La contraseña es obligatoria.',
            'password.min' => 'La contraseña debe tener al menos 8 caracteres.',
            'password.confirmed' => 'Las contraseñas no coinciden.',
            'password.regex' => 'La contraseña debe contener al menos una mayúscula, una minúscula y un número.',
            'password_confirmation.required' => 'Debe confirmar la contraseña.',
            'rol.required' => 'Debe seleccionar un rol para el usuario.',
        ]);

        $user = User::create(
            $request->only(['name','lastname','email','rol']) +
            ['password' => Hash::make($request->password)]
        );

        $user->syncRoles([$request->rol]);

        return to_route('usuarios.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(int $id)
    {
        $user = User::find($id);
        return Inertia::render("usuarios/editar-usuarios", [
            'user' => $user,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'name' => ['sometimes', 'string', 'max:255', 'regex:/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/'],
            'lastname' => ['sometimes', 'string', 'max:255', 'regex:/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/'],
            'email' => ['sometimes', 'string', 'email'],
            'password' => [
                'sometimes',
                'string',
                'min:8',
                'same:confirm_password',
                'regex:/[A-Z]/',   // al menos una mayúscula
                'regex:/[a-z]/',   // al menos una minúscula
                'regex:/[0-9]/',   // al menos un número
            ],
            'confirm_password' => ['sometimes', 'string', 'min:8'],
            'rol' => ['sometimes', 'string'],
            'status' => ['sometimes', 'boolean'],
        ], [
            // 🧩 Nombre
            'name.string' => 'El nombre debe ser una cadena de texto.',
            'name.max' => 'El nombre no puede superar los 255 caracteres.',
            'name.regex' => 'El nombre solo puede contener letras y espacios.',

            // 🧩 Apellido
            'lastname.string' => 'El apellido debe ser una cadena de texto.',
            'lastname.max' => 'El apellido no puede superar los 255 caracteres.',
            'lastname.regex' => 'El apellido solo puede contener letras y espacios.',

            // 🧩 Correo electrónico
            'email.string' => 'El correo electrónico debe ser una cadena de texto válida.',
            'email.email' => 'El formato del correo electrónico no es válido.',

            // 🧩 Contraseña
            'password.string' => 'La contraseña debe ser una cadena de texto.',
            'password.min' => 'La contraseña debe tener al menos 8 caracteres.',
            'password.regex' => 'La contraseña debe contener al menos una letra mayúscula, una minúscula y un número.',
            'password.same' => 'Las contraseñas no coinciden.',

            // 🧩 Confirmación de contraseña
            'confirm_password.string' => 'La confirmación de contraseña debe ser una cadena de texto.',
            'confirm_password.min' => 'La confirmación debe tener al menos 8 caracteres.',

            // 🧩 Rol
            'rol.string' => 'El rol debe ser alguna de las opciones disponibles.',

            // 🧩 Estado
            'status.boolean' => 'El estado debe ser activo o inactivo.',
        ]);

        $user = User::find($id);
        
        $user->update(
            $request->only(['name','lastname','email','rol']) +
            ['password' => Hash::make($request->password)]
        );

        $user->syncRoles([$request->rol]);

        return to_route('usuarios.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        User::destroy($id);
        return to_route("usuarios.index");
    }
}
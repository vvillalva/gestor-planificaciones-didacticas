import { Head, useForm } from '@inertiajs/react';
import { Eye, EyeOff, LoaderCircle } from 'lucide-react';
import { FormEventHandler, useState } from 'react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';

type RegisterForm = {
    nombre: string;
    apellido: string;
    correo: string;
    password: string;
    rol: string;
    password_confirmation: string;
};

export default function Register() {
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    
    const { data, setData, post, processing, errors, reset } = useForm<Required<RegisterForm>>({
        nombre: '',
        apellido: '',
        correo: '',
        password: '',
        rol: 'Administrador',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <AuthLayout title="Crear nuevo usuario" description="Ingresa los datos que se piden para crear tu usuario.">
            <Head title="Registro" />
            <form className="flex flex-col gap-6" onSubmit={submit}>
                <div className="grid gap-6">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Nombre</Label>
                        <Input
                            id="name"
                            type="text"
                            required
                            autoFocus
                            tabIndex={1}
                            autoComplete="name"
                            value={data.nombre}
                            onChange={(e) => setData('nombre', e.target.value)}
                            disabled={processing}
                            placeholder="e.j. Mario Andres"
                        />
                        <InputError message={errors.nombre} className="mt-2" />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="apellido">Apellido</Label>
                        <Input
                            id="apellido"
                            type="text"
                            required
                            autoFocus
                            tabIndex={1}
                            autoComplete="apellido"
                            value={data.apellido}
                            onChange={(e) => setData('apellido', e.target.value)}
                            disabled={processing}
                            placeholder="e.j. Mendez Lopez"
                        />
                        <InputError message={errors.apellido} className="mt-2" />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="email">Correo electronico</Label>
                        <Input
                            id="email"
                            type="email"
                            required
                            tabIndex={2}
                            autoComplete="email"
                            value={data.correo}
                            onChange={(e) => setData('correo', e.target.value)}
                            disabled={processing}
                            placeholder="e.j. correo@ejemplo.com"
                        />
                        <InputError message={errors.correo} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="password">Contraseña</Label>
                        <div className="relative">
                            <Input
                                id="password"
                                type={showCurrentPassword ? 'text' : 'password'}
                                required
                                tabIndex={3}
                                autoComplete="new-password"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                disabled={processing}
                                placeholder="********"
                            />
                            {/* Botón mostrar/ocultar */}
                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="absolute inset-y-0 right-0 my-[2px] mr-[2px] h-[calc(100%-4px)] px-2 hover:bg-transparent"
                                onClick={() => setShowCurrentPassword((s) => !s)}
                                onMouseDown={(e) => e.preventDefault()} // mantiene el foco en el input
                                aria-label={showCurrentPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                            >
                                {showCurrentPassword ? (
                                    <EyeOff className="size-4 text-neutral-500" aria-hidden="true" />
                                ) : (
                                    <Eye className="size-4 text-neutral-500" aria-hidden="true" />
                                )}
                            </Button>
                        </div>
                        <InputError message={errors.password} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="password_confirmation">Confirmar Contraseña</Label>
                        <div className="relative">
                            <Input
                                id="password_confirmation"
                                type={showConfirmPassword ? 'text' : 'password'}
                                required
                                tabIndex={4}
                                autoComplete="new-password"
                                value={data.password_confirmation}
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                disabled={processing}
                                placeholder="********"
                            />
                            {/* Botón mostrar/ocultar */}
                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="absolute inset-y-0 right-0 my-[2px] mr-[2px] h-[calc(100%-4px)] px-2 hover:bg-transparent"
                                onClick={() => setShowConfirmPassword((s) => !s)}
                                onMouseDown={(e) => e.preventDefault()} // mantiene el foco en el input
                                aria-label={showConfirmPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                            >
                                {showConfirmPassword ? (
                                    <EyeOff className="size-4 text-neutral-500" aria-hidden="true" />
                                ) : (
                                    <Eye className="size-4 text-neutral-500" aria-hidden="true" />
                                )}
                            </Button>
                        </div>
                        <InputError message={errors.password_confirmation} />
                    </div>

                    <Button type="submit" className="mt-2 w-full" tabIndex={5} disabled={processing}>
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                        Crear cuenta
                    </Button>
                </div>
            </form>
        </AuthLayout>
    );
}

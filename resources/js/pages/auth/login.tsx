import { Head, Link, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';

type LoginForm = {
    correo: string;
    password: string;
};

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
}

export default function Login({ status }: LoginProps) {
    const { data, setData, post, processing, errors, reset } = useForm<Required<LoginForm>>({
        correo: '',
        password: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <AuthLayout title="Inicio de Sesión" description="Ingresa tus credenciales para poder acceder al sistema.">
            <Head title="Inicio de Sesión" />

            <form className="flex flex-col gap-6" onSubmit={submit}>
                <div className="grid gap-6">
                    <div className="grid gap-2">
                        <Label htmlFor="email">Correo</Label>
                        <Input
                            id="email"
                            type="email"
                            required
                            autoFocus
                            tabIndex={1}
                            autoComplete="email"
                            value={data.correo}
                            onChange={(e) => setData('correo', e.target.value)}
                            placeholder="e.j. correo@ejemplo.com"
                        />
                        <InputError message={errors.correo} />
                    </div>

                    <div className="grid gap-2">
                        <div className="flex items-center">
                            <Label htmlFor="password">Password</Label>
                        </div>
                        <Input
                            id="password"
                            type="password"
                            required
                            tabIndex={2}
                            autoComplete="current-password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            placeholder="*******"
                        />
                        <InputError message={errors.password} />
                    </div>

                    <Button type="submit" className="mt-4 w-full" tabIndex={4} disabled={processing}>
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                        Entrar
                    </Button>
                </div>

            </form>
            <div className='flex justify-center mt-4 text-sm gap-2'>
                <span>¿Aun no tienes cuenta? </span>
                <Link
                    href={route('register')}
                    className="underline underline-offset-4"
                >
                    Regístrate
                </Link>
            </div>
            {status && <div className="mb-4 text-center text-sm font-medium text-neutral-800">{status}</div>}
        </AuthLayout>
    );
}

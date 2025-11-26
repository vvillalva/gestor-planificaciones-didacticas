//** Hooks */
import { Head, useForm } from '@inertiajs/react';
//** Components */
import AppLayout from '@/layouts/app-layout';
//** Interfaces or Types */
import type {  BreadcrumbItem,} from '@/types';
import { Eye, EyeOff, LoaderCircle } from 'lucide-react';
import { FormEventHandler, useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import InputError from '@/components/input-error';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Encabezado from '@/components/encabezado';


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Lista de Usuarios',
        href: '/usuarios',
    },
    {
        title: 'Editar Usuario',
        href: '/editar-usuarios',
    },
];

interface Usuario {
    id: number;
    nombre: string;
    apellido: string;
    correo: string;
    password: string;
    rol: string;
}
interface RolProps{
    id: number;
    name: string;
}

export default function Editarusuarios({usuario, roles=[] }: {usuario: Usuario, roles:RolProps[] }) {
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const { data, setData, errors, put, processing } = useForm({
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        correo: usuario.correo,
        password: usuario.password,
        confirm_password: usuario.password,
        rol: usuario.rol,
    });

    const createUser: FormEventHandler = (e) => {
        e.preventDefault();
        put(route('usuarios.update', usuario.id), {
            onSuccess: () => {
                console.log('Usuario creado correctamente');
            },
            onError: (errors) => {
                console.error('Errores al crear usuario:', errors);
            },
            onFinish: () => {
                console.log('Petición finalizada');
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Editar usuario" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-8">
                <Encabezado
                    title="Editar Usuario"
                    description="Revisa los diferentes usuarios registrados dentro del sistema."
                    separator={true}
                />
                <form onSubmit={createUser} className="flex flex-col gap-10 pt-10">
                    <div className="nombre flex w-full flex-col gap-4 lg:flex-row lg:gap-[180px]">
                        <div className="w-full lg:w-[300px]">
                            <Label id="name" className="font-medium">
                                Nombre
                            </Label>
                        </div>
                        <div className="flex w-full flex-col gap-4 lg:w-[405px]">
                            <div className="flex flex-col gap-2">
                                <Input
                                    id="name"
                                    type="text"
                                    value={data.nombre}
                                    onChange={(e) => setData('nombre', e.target.value)}
                                    placeholder="e.j. Juan Manuel"
                                />
                                {errors.nombre ? (
                                    <InputError message={errors.nombre} />
                                ) : (
                                    <Label className="text-muted-foreground text-sm font-normal"></Label>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="apellido flex w-full flex-col gap-4 lg:flex-row lg:gap-[180px]">
                        <div className="w-full lg:w-[300px]">
                            <Label id="lastname" className="font-medium">
                                Apellido
                            </Label>
                        </div>
                        <div className="flex w-full flex-col gap-4 lg:w-[405px]">
                            <div className="flex flex-col gap-2">
                                <Input
                                    id="lastname"
                                    type="text"
                                    value={data.apellido}
                                    onChange={(e) => setData('apellido', e.target.value)}
                                    placeholder="e.j. Mendez Perez"
                                />
                                {errors.apellido ? (
                                    <InputError message={errors.apellido} />
                                ) : (
                                    <Label className="text-muted-foreground text-sm font-normal"></Label>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="correo flex w-full flex-col gap-4 lg:flex-row lg:gap-[180px]">
                        <div className="w-full lg:w-[300px]">
                            <Label id="email" className="font-medium">
                                Correo Electronico
                            </Label>
                        </div>
                        <div className="flex w-full flex-col gap-4 lg:w-[405px]">
                            <div className="flex flex-col gap-2">
                                <Input
                                    id="email"
                                    type="email"
                                    autoComplete="email"
                                    value={data.correo}
                                    onChange={(e) => setData('correo', e.target.value)}
                                    placeholder="e.j. juan.manuel@example.com"
                                />
                                {errors.correo ? (
                                    <InputError message={errors.correo} />
                                ) : (
                                    <Label className="text-muted-foreground text-sm font-normal"></Label>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="password flex w-full flex-col gap-4 lg:flex-row lg:gap-[180px]">
                        <div className="w-full lg:w-[300px]">
                            <Label id="password" className="font-medium">
                                Contraseña
                            </Label>
                        </div>
                        <div className="flex w-full flex-col gap-4 lg:w-[405px]">
                            <div className="flex flex-col gap-2">
                                <div className="relative">
                                    <Input
                                        id="password"
                                        type={showCurrentPassword ? 'text' : 'password'}
                                        autoComplete="current-password"
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
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
                                {errors.password ? (
                                    <InputError message={errors.password} />
                                ) : (
                                    <Label className="text-muted-foreground text-sm font-normal">
                                        Debe contener al menos 8 caracteres, una letra mayúscula y un número
                                    </Label>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="confirm_password flex w-full flex-col gap-4 lg:flex-row lg:gap-[180px]">
                        <div className="w-full lg:w-[300px]">
                            <Label id="confirm_password" className="font-medium">
                                Confirmar Contraseña
                            </Label>
                        </div>
                        <div className="flex w-full flex-col gap-4 lg:w-[405px]">
                            <div className="flex flex-col gap-2">
                                <div className="relative">
                                    <Input
                                        id="confirm_password"
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        autoComplete="current-password"
                                        value={data.confirm_password}
                                        onChange={(e) => setData('confirm_password', e.target.value)}
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
                                {errors.password ? (
                                    <InputError message={errors.password} />
                                ) : (
                                    <Label className="text-muted-foreground text-sm font-normal"></Label>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="rol flex w-full flex-col gap-4 lg:flex-row lg:gap-[180px]">
                        <div className="w-full lg:w-[300px]">
                            <Label id="rol" className="font-medium">
                                Rol
                            </Label>
                        </div>
                        <div className="flex w-full flex-col gap-4 lg:w-[405px]">
                            <div className="flex flex-col gap-2">
                                <Select value={data.rol} onValueChange={(value) => setData('rol', value)}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Selecciona" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {roles.map((rol) => (
                                            <SelectItem key={rol.id} value={rol.name}>
                                                {rol.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.password ? (
                                    <InputError message={errors.password} />
                                ) : (
                                    <Label className="text-muted-foreground text-sm font-normal"></Label>
                                )}
                            </div>
                        </div>
                    </div>
                    <Separator />
                    <div className="flex flex-row justify-end">
                        <Button disabled={processing} type="submit" className="w-full md:w-[140px]">
                            {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}Guardar
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
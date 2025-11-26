//** Hooks  */
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
//** Components  */
import Encabezado from '@/components/encabezado';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
//** Assets  */
import { LoaderCircle } from 'lucide-react';
//** Interface or Types  */
import type { BreadcrumbItem, RoleForm } from '@/types';
//** Lib or Utils */
//** Consts or Fuctions*/
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Roles',
        href: '/roles',
    },
    {
        title: 'Nuevo Rol',
        href: '/agregar-rol',
    },
];

export default function AgregarRol({ permissions }: RoleForm) {
    const { data, setData, errors, post, processing } = useForm<{ name: string; permissions: string[] }>({
        name: '',
        permissions: [],
    });
    function handleCheckboxChange(permissionName: string, checked: boolean) {
        setData(
            'permissions',
            checked ? Array.from(new Set([...data.permissions, permissionName])) : data.permissions.filter((p) => p !== permissionName),
        );
    }
    const createRol: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('roles.store'));
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Nuevo Rol" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-8">
                <Encabezado
                    title="Agrega nuevo rol"
                    description="Crea un nuevo rol con privilegios para poder acceder a las funcionalidades del sistema."
                />
                <Separator />
                <div className="datos-cedula flex flex-col gap-8">
                    <div className="encabezado">
                        <h4 className="text-xl font-semibold">Datos del nuevo rol</h4>
                        <p className="text-muted-foreground">
                            Selecciona los privilegios que el rol va tener para poder acceder a las funcionalidades del sistema.
                        </p>
                    </div>
                    <form onSubmit={createRol} className="flex flex-col gap-6">
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
                                        value={data.name}
                                        required
                                        onChange={(e) => setData('name', e.target.value)}
                                        placeholder="Nombre del rol..."
                                    />
                                    {errors.name ? (
                                        <InputError message={errors.name} />
                                    ) : (
                                        <Label className="text-sm font-normal text-muted-foreground">
                                            Ingresa un nombre claro y fácil de entender.
                                        </Label>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="permisos flex w-full flex-col gap-4">
                            <div className="w-full lg:w-[300px]">
                                <Label id="permissions" className="font-medium">
                                    Permisos
                                </Label>
                            </div>
                            <div className="flex w-full flex-wrap gap-10">
                                {permissions.map((item) => (
                                    <label key={item} className="flex w-fit items-center gap-2">
                                        <input
                                            id={item}
                                            type="checkbox"
                                            value={item}
                                            checked={data.permissions.includes(item)} // <-- Añadido para reflejar el estado
                                            onChange={(e) => handleCheckboxChange(item, e.target.checked)}
                                        />
                                        <span className="text-sm font-medium capitalize">{item}</span>
                                    </label>
                                ))}
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
            </div>
        </AppLayout>
    );
}
//** Hooks */
import { Head } from '@inertiajs/react';
//** Components */
import AppLayout from '@/layouts/app-layout';
//** Interfaces or Types */
import type { BreadcrumbItem } from '@/types';
import Encabezado from '@/components/encabezado';
import { Users } from 'lucide-react';
import { DataTable } from '@/components/datatable/datatable';
import { columnasUsuario } from '@/components/datatable/column';
import { useCan } from '@/hooks/useCan';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Lista de Usuarios',
        href: '/usuarios',
    },
];

export default function ListUsers({ usuarios = [] }: { usuarios: [] }) {
    const { hasAny } = useCan();

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Usuarios" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-8">
                <Encabezado
                    title="Usuarios"
                    description="Revisa los diferentes usuarios registrados dentro del sistema."
                    icon={<Users className="h-[20px] w-[20px]" />}
                />
                <DataTable
                    columns={columnasUsuario}
                    data={usuarios}
                    resourceName="usuarios"
                    labelButton="Nuevo usuario"
                    placeholderFilter="Buscar por nombre..."
                    filter="name"
                />
                {hasAny(['crear.usuario']) ? (
                    <>
                        <div>si puede ver casos</div>
                    </>
                ) : (
                    <>
                        <div>no puede verlos</div>
                    </>
                )}
            </div>
        </AppLayout>
    );
}
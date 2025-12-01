//** Hooks */
import { Head, Link } from '@inertiajs/react';
//** Components */
import AppLayout from '@/layouts/app-layout';
//** Interfaces or Types */
import type { BreadcrumbItem } from '@/types';
import Encabezado from '@/components/encabezado';
import { Users } from 'lucide-react';
import { DataTable } from '@/components/datatable/datatable';
import { columnasPlaneaciones } from '@/components/datatable/column';
import { ConfirmProvider } from '@/providers/ConfirmProvider';
import { Button } from '@/components/ui/button';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Planeaciones',
        href: '/planeaciones',
    },
];

export default function ListaPlaneaciones({ planeaciones = [] }: { planeaciones: [] }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Planeaciones" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-8">
                <Encabezado
                    title="Planeaciones"
                    description="Revisa las pleaciones registradas dentro del sistema ."
                    icon={<Users className="h-[20px] w-[20px]" />}
                />
                <div className='flex flex-row justify-end'>
                    <Link href={route('horarios.mi-horario')}>
                        <Button>Ver mi horario</Button>
                    </Link>
                </div>
                <ConfirmProvider>                    
                    <DataTable
                        columns={columnasPlaneaciones}
                        data={planeaciones}
                        resourceName="planeaciones"
                        labelButton="Nueva Planeacion"
                        placeholderFilter="Buscar por nombre..."
                        filter="titulo"
                    />
                </ConfirmProvider>
            </div>
        </AppLayout>
    );
}
//** Hooks */
import { Head } from '@inertiajs/react';
//** Components */
import AppLayout from '@/layouts/app-layout';
//** Interfaces or Types */
import type { BreadcrumbItem } from '@/types';
import Encabezado from '@/components/encabezado';
import { Users } from 'lucide-react';
import { DataTable } from '@/components/datatable/datatable';
import { columnasHorario, columnasUsuario } from '@/components/datatable/column';
import { useCan } from '@/hooks/useCan';
import { ConfirmProvider } from '@/providers/ConfirmProvider';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Lista de Horarios',
        href: '/horarios',
    },
];

export default function ListaHorarios({ docentes = [] }: { docentes: [] }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Horarios" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-8">
                <Encabezado
                    title="Horarios"
                    description="Revisa y gestiona los horarios disponibles para los docentes en el sistema."
                    icon={<Users className="h-[20px] w-[20px]" />}
                />
                <ConfirmProvider>
                    <DataTable
                        columns={columnasHorario}
                        data={docentes}
                        resourceName="horarios"
                        labelButton="Nuevo usuario"
                        placeholderFilter="Buscar por nombre..."
                        filter="name"
                    />
                </ConfirmProvider>  
            </div>
        </AppLayout>
    );
}
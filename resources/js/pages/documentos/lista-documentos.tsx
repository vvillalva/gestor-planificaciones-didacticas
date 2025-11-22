//** Hooks */
import { Head } from '@inertiajs/react';
//** Components */
import AppLayout from '@/layouts/app-layout';
//** Interfaces or Types */
import type { BreadcrumbItem } from '@/types';
import Encabezado from '@/components/encabezado';
import { Users } from 'lucide-react';
import { DataTable } from '@/components/datatable/datatable';
import { columnasDocumento, columnasPlaneaciones } from '@/components/datatable/column';
import { ConfirmProvider } from '@/providers/ConfirmProvider';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Documentos',
        href: '/documentos',
    },
];

export default function ListaDocumentos({ documentos = [] }: { documentos: [] }) {
    console.log(documentos);
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Documentos" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-8">
                <Encabezado
                    title="Documentos"
                    description="Revisa los documentos que se encuentran dentro del sistema."
                    icon={<Users className="h-[20px] w-[20px]" />}
                />
                <ConfirmProvider>                    
                    <DataTable
                        columns={columnasDocumento}
                        data={documentos}
                        placeholderFilter="Buscar por nombre..."
                        filter="titulo"
                    />
                </ConfirmProvider>
            </div>
        </AppLayout>
    );
}
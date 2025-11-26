//** Hooks  */
import { Head } from '@inertiajs/react';
//** Components  */

import AppLayout from '@/layouts/app-layout';
//** Assets  */
//** Interface or Types  */
import type { BreadcrumbItem } from '@/types';
import Encabezado from '@/components/encabezado';
import { ConfirmProvider } from '@/providers/ConfirmProvider';
import { DataTable } from '@/components/datatable/datatable';
import { columnasRoles } from '@/components/datatable/column';

//** Lib or Utils */
//** Consts or Fuctions*/
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Roles',
        href: '/roles',
    },
];

export default function ListaRoles({ roles = [] }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Roles" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-8">
                <Encabezado title="Lista de Roles" description="Revisa los diferentes roles que existen dentro del sistema con sus privilegios" />
                <ConfirmProvider>
                    <DataTable
                        columns={columnasRoles}
                        data={roles}
                        resourceName="roles"
                        labelButton="Agrega Rol"
                        placeholderFilter="Buscar por nombre..."
                        filter="name"
                    />
                </ConfirmProvider>
            </div>
        </AppLayout>
    );
}
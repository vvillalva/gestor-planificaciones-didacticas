import Encabezado from '@/components/encabezado';
import { ChartStatus } from '@/components/graficas/chart-status';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { Card } from "@/components/ui/card"
import { Home, File, FolderClosed } from 'lucide-react';
import { DataTable } from '@/components/datatable/datatable';
import { columnasPlaneaciones } from '@/components/datatable/column';
import { ConfirmProvider } from '@/providers/ConfirmProvider';
import { PlaneacionChart } from '@/components/graficas/chart-planeacion';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

interface DashboardProps {
    auth: {
        user: {
            nombre: string;
        };
    };
    stats: {
        total: number;
        total_documentos: number;
        por_estatus: Array<{ estatus: string; total: number }>;
        por_grado: Array<{ grado: string; total: number }>;
        por_usuario: Array<{ usuario: string; total: number }>;
    };
    planeaciones: any;
    esAdmin: boolean;
}

export default function Dashboard() {
    const { auth, stats, planeaciones, esAdmin } = usePage().props as unknown as DashboardProps;
    const estatusChartData = [
        {
            month: "Enero-Diciembre",
            en_proceso: stats.por_estatus.find(e => e.estatus === "en_revision")?.total ?? 0,
            rechazado: stats.por_estatus.find(e => e.estatus === "rechazado")?.total ?? 0,
            aprobado: stats.por_estatus.find(e => e.estatus === "aprobado")?.total ?? 0,
        }
    ];
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-8">
                <Encabezado
                    title={`¡Bienvenido de nuevo ${auth.user.nombre}!`}
                    description="Revisa las planeaciones registradas dentro del sistema y los estatus que tienen cada una de ellas."
                />
                <div className='flex flex-row gap-20'>
                    <Card className='px-3 !py-4 w-full bg-neutral-900  border-t-neutral-800 border-t-4'>
                        <div className='flex flex-row justify-between w-full'>
                            <div className='flex flex-col text-white'>
                                <small>Total de planeaciones</small>
                                <p className='text-3xl font-bold'>{stats.total}</p>
                            </div>
                            <div className="flex h-8 w-8 items-center justify-center rounded-full p-2 text-white"><FolderClosed /></div>
                        </div>
                    </Card>
                    <Card className='px-3 !py-4 w-full bg-neutral-900  border-t-neutral-800 border-t-4'>
                        <div className='flex flex-row justify-between w-full'>
                            <div className='flex flex-col text-white'>
                                <small>Total de documentos</small>
                                <p className='text-3xl font-bold'>{stats.total_documentos}</p>
                            </div>
                            <div className="flex h-8 w-8 items-center justify-center rounded-full p-2 text-white"><File /></div>
                        </div>
                    </Card>
                    <Card className='px-3 !py-4 w-full bg-neutral-900  border-t-neutral-800 border-t-4'>
                        <div className='flex flex-row justify-between w-full'>
                            <div className='flex flex-col text-white'>
                                <small>Total de planeaciones</small>
                                <p className='text-3xl font-bold'>{stats.total}</p>
                            </div>
                            <div className="flex h-8 w-8 items-center justify-center rounded-full p-2 text-white"><Home /></div>
                        </div>
                    </Card>
                    <Card className='px-3 !py-4 w-full bg-neutral-900  border-t-neutral-800 border-t-4'>
                        <div className='flex flex-row justify-between w-full'>
                            <div className='flex flex-col text-white'>
                                <small>Total de planeaciones</small>
                                <p className='text-3xl font-bold'>{stats.total}</p>
                            </div>
                            <div className="flex h-8 w-8 items-center justify-center rounded-full p-2 text-white"><Home /></div>
                        </div>
                    </Card>
                </div>
                <ConfirmProvider>
                    <DataTable
                        columns={columnasPlaneaciones}
                        data={planeaciones}
                        resourceName="planeaciones"
                        labelButton="Nueva Planeacion"
                        placeholderFilter="Buscar por nombre..."
                        filter="titulo"
                        pagination={false}
                        encabezado={true}
                        titulo="Últimas Planeaciones"
                        subtitle="Revisa las últimas planeaciones registradas en el sistema."
                    />
                </ConfirmProvider>
                <div className='w-full flex flex-row gap-4'>
                    <ChartStatus data={estatusChartData} />
                    <PlaneacionChart />
                </div>
            </div>
        </AppLayout>
    );
}
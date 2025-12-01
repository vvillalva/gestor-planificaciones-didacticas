import Encabezado from '@/components/encabezado';
import { ChartStatus } from '@/components/graficas/chart-status';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { Card } from '@/components/ui/card';
import { Home, FileText, FolderClosed, Users, CheckCircle2, AlertTriangle } from 'lucide-react';
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
  const { auth, stats, planeaciones, esAdmin } =
    usePage().props as unknown as DashboardProps;

  const totalPlaneaciones = stats.total ?? 0;
  const totalDocumentos = stats.total_documentos ?? 0;

  const totalAprobadas =
    stats.por_estatus.find((e) => e.estatus === 'aprobado')?.total ?? 0;
  const totalEnRevision =
    stats.por_estatus.find((e) => e.estatus === 'en_revision')?.total ?? 0;
  const totalRechazadas =
    stats.por_estatus.find((e) => e.estatus === 'rechazado')?.total ?? 0;

  const porcentajeAprobadas =
    totalPlaneaciones > 0
      ? Math.round((totalAprobadas / totalPlaneaciones) * 100)
      : 0;

  const totalDocentesActivos = stats.por_usuario.length;
  const promedioPlaneacionesPorDocente =
    totalDocentesActivos > 0
      ? (totalPlaneaciones / totalDocentesActivos).toFixed(1)
      : '0.0';

  const estatusChartData = [
    {
      month: 'Enero-Diciembre',
      en_proceso: totalEnRevision,
      rechazado: totalRechazadas,
      aprobado: totalAprobadas,
    },
  ];

  const maxPlaneacionesPorGrado =
    stats.por_grado.length > 0
      ? Math.max(...stats.por_grado.map((g) => g.total))
      : 0;

  const topDocentes = stats.por_usuario
    .slice()
    .sort((a, b) => b.total - a.total)
    .slice(0, 5);

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Dashboard" />

      <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto bg-white p-6 md:p-8">
        {/* ENCABEZADO */}
        <Encabezado
          title={'Bienvenido de nuevo, ' + auth.user.nombre}
          description={
            esAdmin
              ? 'Vista general de las planeaciones de los docentes, sus estados, grados atendidos y documentos vinculados.'
              : 'Revisa el avance de tus planeaciones, su estatus y los documentos que has registrado en el sistema.'
          }
        />

        {/* MÉTRICAS PRINCIPALES */}
        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <Card className="border border-neutral-200 bg-neutral-900 p-4 text-white">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs uppercase tracking-wide text-neutral-300">
                  Planeaciones registradas
                </p>
                <p className="mt-2 text-3xl font-bold">
                  {totalPlaneaciones}
                </p>
                <p className="mt-1 text-xs text-neutral-300">
                  Total acumulado en el sistema.
                </p>
              </div>
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-800">
                <FolderClosed className="h-5 w-5" />
              </span>
            </div>
          </Card>

          <Card className="border border-neutral-200 bg-neutral-900 p-4 text-white">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs uppercase tracking-wide text-neutral-300">
                  Documentos adjuntos
                </p>
                <p className="mt-2 text-3xl font-bold">
                  {totalDocumentos}
                </p>
                <p className="mt-1 text-xs text-neutral-300">
                  Evidencias y archivos vinculados a planeaciones.
                </p>
              </div>
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-800">
                <FileText className="h-5 w-5" />
              </span>
            </div>
          </Card>

          <Card className="border border-neutral-200 bg-neutral-900 p-4 text-white">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs uppercase tracking-wide text-neutral-300">
                  Planeaciones aprobadas
                </p>
                <div className="mt-2 flex items-baseline gap-2">
                  <p className="text-3xl font-bold">
                    {porcentajeAprobadas}%
                  </p>
                  <span className="text-xs text-neutral-200">
                    ({totalAprobadas} aprobadas)
                  </span>
                </div>
                <p className="mt-1 text-xs text-neutral-300">
                  Respecto al total de planeaciones registradas.
                </p>
              </div>
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-800">
                <CheckCircle2 className="h-5 w-5" />
              </span>
            </div>
          </Card>

          <Card className="border border-neutral-200 bg-neutral-900 p-4 text-white">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs uppercase tracking-wide text-neutral-300">
                  Docentes que planifican
                </p>
                <p className="mt-2 text-3xl font-bold">
                  {totalDocentesActivos}
                </p>
                <p className="mt-1 text-xs text-neutral-300">
                  Promedio de {promedioPlaneacionesPorDocente} planeaciones por docente.
                </p>
              </div>
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-800">
                <Users className="h-5 w-5" />
              </span>
            </div>
          </Card>
        </section>

        {/* GRÁFICA + TABLA (reemplazando la gráfica radial) */}
        <section className="grid gap-4 lg:grid-cols-2">
          {/* Gráfica de estado de planeaciones */}
          <Card className="border border-neutral-200 bg-white p-4">
            <div className="mb-3 flex items-center justify-between">
              <div>
                <h2 className="text-sm font-bold text-black">
                  Estado de las planeaciones
                </h2>
                <p className="text-sm text-neutral-500">
                  Aprobadas, en revisión y rechazadas.
                </p>
              </div>
              <AlertTriangle className="h-4 w-4 text-neutral-400" />
            </div>
            <ChartStatus data={estatusChartData} />
          </Card>

          {/* AQUÍ VA LA TABLA EN LUGAR DE LA GRÁFICA RADIAL */}
          <Card className="border border-neutral-200 bg-white p-4">
            <div className="mb-3 flex items-center justify-between">
              <div>
                <h2 className="text-sm font-bold text-black">
                  Últimas planeaciones registradas
                </h2>
                <p className="text-sm text-neutral-500">
                  Revisa las últimas planeaciones capturadas en el sistema.
                </p>
              </div>
            </div>

            <ConfirmProvider>
              <DataTable
                columns={columnasPlaneaciones}
                data={planeaciones}
                resourceName="planeaciones"
                labelButton="Nueva Planeación"
                placeholderFilter="Buscar por título de planeación..."
                filter="titulo"
                pagination={false}
                encabezado={false}
                titulo=""
                subtitle=""
              />
            </ConfirmProvider>
          </Card>
        </section>

        {/* PANEL LATERAL: DOCENTES Y PLANEACIONES POR GRADO */}
        <section className="grid gap-4 lg:grid-cols-2">
          {/* Top docentes */}
          <Card className="border border-neutral-200 bg-white p-4">
            <h2 className="mb-2 text-sm font-bold text-black">
              Docentes con más planeaciones
            </h2>
            <p className="mb-3 text-xs text-neutral-500">
              Top de docentes de acuerdo al número de planeaciones registradas.
            </p>

            {topDocentes.length === 0 ? (
              <p className="text-xs text-neutral-500">
                Aún no hay planeaciones suficientes para mostrar este resumen.
              </p>
            ) : (
              <ul className="space-y-2">
                {topDocentes.map((docente, index) => (
                  <li
                    key={docente.usuario + index}
                    className="flex items-center justify-between rounded-md border border-neutral-200 bg-neutral-50 px-2 py-1.5"
                  >
                    <div className="flex items-center gap-2">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-neutral-200 text-xs text-neutral-700">
                        {index + 1}
                      </span>
                      <span className="text-xs font-medium text-neutral-900">
                        {docente.usuario}
                      </span>
                    </div>
                    <span className="text-xs font-semibold text-neutral-800">
                      {docente.total}{' '}
                      <span className="text-[10px] text-neutral-500">
                        plan.
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </Card>

          {/* Planeaciones por grado */}
          <Card className="border border-neutral-200 bg-white p-4">
            <h2 className="mb-2 text-sm font-bold text-black">
              Planeaciones por grado
            </h2>
            <p className="mb-3 text-xs text-neutral-500">
              Distribución de planeaciones por grado escolar.
            </p>

            {stats.por_grado.length === 0 ? (
              <p className="text-xs text-neutral-500">
                Todavía no hay registros de grado en las planeaciones.
              </p>
            ) : (
              <div className="space-y-2">
                {stats.por_grado.map((g) => {
                  const porcentaje =
                    maxPlaneacionesPorGrado > 0
                      ? Math.round((g.total / maxPlaneacionesPorGrado) * 100)
                      : 0;

                  return (
                    <div key={g.grado} className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-medium text-neutral-900">
                          {g.grado}
                        </span>
                        <span className="text-neutral-700">
                          {g.total} plan.
                        </span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-neutral-200">
                        <div
                          className="h-2 rounded-full bg-gradient-to-r from-indigo-400 via-sky-400 to-emerald-400"
                          style={{ width: `${porcentaje}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </Card>
        </section>
      </div>
    </AppLayout>
  );
}
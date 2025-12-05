//** Hooks */
import { Head } from '@inertiajs/react';
//** Components */
import AppLayout from '@/layouts/app-layout';
//** Interfaces or Types */
import type { BreadcrumbItem } from '@/types';
import Encabezado from '@/components/encabezado';
import { Users } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Lista de Horarios',
        href: '/horarios',
    },
    {
        title: 'Horario Detalle',
        href: '/detalle-horario',
    },
];

export default function DetalleHorarios({ usuario, horarios = [] }: { usuario: {}, horarios: [] }) {
    const dias = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes"];
    const bloques = [
        { inicio: "07:30", fin: "08:30" },
        { inicio: "08:30", fin: "09:30" },
        { inicio: "09:30", fin: "10:30" },
        { inicio: "11:00", fin: "12:00" },
        { inicio: "12:00", fin: "13:00" },
        { inicio: "13:00", fin: "14:00" },
    ];
    // convertir horarios en mapa rápido
    const mapa = {};
    horarios.forEach(h => {
        const dia = h.dia.trim().normalize("NFD").replace(/[\u0300-\u036f]/g, ""); // sin acentos
        const hora = h.hora_inicio.substring(0, 5); // corta a HH:mm

        mapa[`${dia}-${hora}`] = h;
    });

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Horarios" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-8">
                <Encabezado
                    title="Detalle de Horarios"
                    description="Revisa el detalle del horario seleccionado para el docente."
                    icon={<Users className="h-[20px] w-[20px]" />}
                />
                <div className="p-6 flex flex-col gap-6 bg-white rounded-lg shadow">
                    <h1 className="text-xl font-bold">
                        Horario de {usuario?.nombre} {usuario?.apellido}
                    </h1>

                    <div className="overflow-x-auto rounded-lg">
                        <table className="min-w-full border-collapse text-center">

                            {/* ENCABEZADOS */}
                            <thead>
                                <tr className="bg-gradient-to-r bg-primary text-white">
                                    <th className="px-4 py-3">⏰ HORA</th>
                                    {dias.map(dia => (
                                        <th key={dia} className="px-4 py-3">{dia.toUpperCase()}</th>
                                    ))}
                                </tr>
                            </thead>

                            {/* CUERPO */}
                            <tbody>
                                {bloques.map((bloque, idx) => (
                                    <tr key={idx} className="border">
                                        {/* COLUMNA DE HORAS */}
                                        <td className="px-4 py-4 font-semibold bg-gray-50">
                                            {bloque.inicio} - {bloque.fin}
                                        </td>

                                        {/* CADA DÍA DEL BLOQUE */}
                                        {dias.map(dia => {
                                            const h = mapa[`${dia}-${bloque.inicio}`];

                                            return (
                                                <td key={dia} className="px-4 py-4">
                                                    {h ? (
                                                        <div className="p-3 rounded-lg bg-blue-100 shadow-sm font-medium">
                                                            <div>{h.materia}</div>
                                                            <div className="text-xs opacity-70">{h.grupo}</div>
                                                        </div>
                                                    ) : (
                                                        <span className="text-gray-400">✕</span>
                                                    )}
                                                </td>
                                            );
                                        })}

                                    </tr>
                                ))}
                            </tbody>

                        </table>
                    </div>

                </div>

            </div>

        </AppLayout>
    );
}
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
        title: 'Mi horario',
        href: '/horarios',
    },
];

export default function MiHorario({ horarios } : { horarios: [] }) {
    const dias = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes"];

    const bloques = [
        { inicio: "07:30", fin: "08:30" },
        { inicio: "08:30", fin: "09:30" },
        { inicio: "09:30", fin: "10:30" },
        { inicio: "11:00", fin: "12:00" },
        { inicio: "12:00", fin: "13:00" },
        { inicio: "13:00", fin: "14:00" },
    ];

    const mapa = {};
    horarios.forEach(h => {
        const dia = h.dia.trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        const hora = h.hora_inicio.substring(0, 5);
        mapa[`${dia}-${hora}`] = h;
    });
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Horarios" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-8">
                <Encabezado
                    title="Mi Horario"
                    description="Este es tu horario personal como docente."
                    icon={<Users className="h-[20px] w-[20px]" />}
                />
                <div className="overflow-x-auto rounded-lg">
                    <table className="min-w-full border-collapse text-center">

                        <thead>
                            <tr className="bg-gradient-to-r bg-black text-white">
                                <th className="px-4 py-3">Hora</th>
                                {dias.map(dia => (
                                    <th key={dia} className="px-4 py-3">{dia}</th>
                                ))}
                            </tr>
                        </thead>

                        <tbody>
                            {bloques.map((bloque, i) => (
                                <tr key={i} className="border">

                                    <td className="py-4 font-semibold bg-gray-50">
                                        {bloque.inicio} - {bloque.fin}
                                    </td>

                                    {dias.map(dia => {
                                        const h = mapa[`${dia}-${bloque.inicio}`];

                                        return (
                                            <td key={dia} className="px-4 py-4">
                                                {h ? (
                                                    <div className="p-3 bg-blue-100 rounded-md shadow-sm">
                                                        <strong>{h.materia}</strong>
                                                        <p className="text-xs opacity-70 capitalize">{h.grupo}</p>
                                                    </div>
                                                ) : (
                                                    <span className="text-gray-400">—</span>
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
        </AppLayout>
    );
}
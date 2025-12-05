//** Hooks */
import { Head, useForm } from '@inertiajs/react';
//** Components */
import AppLayout from '@/layouts/app-layout';
//** Interfaces or Types */
import type { BreadcrumbItem, } from '@/types';
import { Eye, EyeOff, LoaderCircle } from 'lucide-react';
import { FormEventHandler, useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import InputError from '@/components/input-error';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Encabezado from '@/components/encabezado';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Lista de Horarios',
        href: '/usuarios',
    },
    {
        title: 'Nuevo Horario',
        href: '/agregar-usuarios',
    },
];

interface docentes {
    id: number;
    nombre: string;
}

export default function AddHorario({ docentes = [] }: { docentes: docentes[] }) {

    // 🔹 Materias estáticas (las puedes cambiar a tu gusto)
    const materiasStatic = [
        "SP y C",
        "S y PD",
        "Ingles",
        "Matemáticas",
        "Lenguajes",
        "Inglés",
        "Educación Física",
        "EN y S",
        "Artes",
        "Pastoral",
        "Tecnología",
        "Receso",
        "DHC"
    ];

    // FORM
    const { data, setData, post, processing, errors } = useForm({
        usuario_id: "",
        horarios: [],
    });

    // ESTADOS DE CADA CELDA
    const [materiasAsignadas, setMateriasAsignadas] = useState<any>({});
    const [modalOpen, setModalOpen] = useState(false);
    const [celdaActual, setCeldaActual] = useState("");

    // DÍAS Y HORAS DEL HORARIO
    const dias = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];

    const horas = [
        { inicio: "07:30", fin: "08:30" },
        { inicio: "08:30", fin: "09:30" },
        { inicio: "09:30", fin: "10:30" },
        { inicio: "10:30", fin: "11:00" }, // Receso
        { inicio: "11:00", fin: "12:00" },
        { inicio: "12:00", fin: "13:00" },
        { inicio: "13:00", fin: "14:00" },
    ];

    // ------------------------------------------
    // 🔹 ABRIR MODAL AL CLICKEAR UNA CELDA
    // ------------------------------------------
    function seleccionarCelda(dia: string, hora: any) {
        const id = `${dia}-${hora.inicio}-${hora.fin}`;
        setCeldaActual(id);
        setModalOpen(true);
    }

    // ------------------------------------------
    // 🔹 GUARDAR TODO EL HORARIO AL BACKEND
    // ------------------------------------------
    const createHorario = (e: any) => {
        e.preventDefault();

        const horariosFinales = Object.entries(materiasAsignadas).map(
            ([id, info]: any) => {
                const [dia, inicio, fin] = id.split("-");

                return {
                    dia,
                    hora_inicio: inicio,
                    hora_fin: fin,
                    materia: info.materia, // string estático
                };
            }
        );

        setData("horarios", horariosFinales);

        post(route("horarios.store"), { preserveScroll: true });
    };

    return (
        <AppLayout>
            <div className="p-8 flex flex-col gap-10">

                <h1 className="text-3xl font-bold">Crear Horario</h1>

                {/* -------------------- SELECT DOCENTE -------------------- */}
                <div className="flex flex-col gap-4 w-full max-w-md">
                    <Label>Seleccionar Docente</Label>

                    <Select
                        value={data.usuario_id}
                        onValueChange={(value) => setData("usuario_id", value)}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Seleccione un docente" />
                        </SelectTrigger>

                        <SelectContent>
                            {docentes.map((d) => (
                                <SelectItem key={d.id} value={String(d.id)}>
                                    {d.nombre}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <InputError message={errors.usuario_id} />
                </div>

                {/* -------------------- TABLA COMPLETA -------------------- */}
                <form onSubmit={createHorario} className="flex flex-col gap-8">

                    <table className="border w-full text-center">
                        <thead>
                            <tr>
                                <th className="p-2 border">Horario</th>
                                {dias.map((d) => (
                                    <th key={d} className="p-2 border">
                                        {d}
                                    </th>
                                ))}
                            </tr>
                        </thead>

                        <tbody>
                            {horas.map((hora) => (
                                <tr key={hora.inicio}>
                                    <td className="p-2 border font-semibold">
                                        {hora.inicio} - {hora.fin}
                                    </td>

                                    {dias.map((dia) => {
                                        const id = `${dia}-${hora.inicio}-${hora.fin}`;
                                        const materia = materiasAsignadas[id]?.materia;

                                        return (
                                            <td
                                                key={id}
                                                onClick={() =>
                                                    seleccionarCelda(dia, hora)
                                                }
                                                className={`cursor-pointer p-3 border transition rounded-md ${materia
                                                    ? "bg-blue-200 font-semibold"
                                                    : "bg-gray-50 hover:bg-gray-100"
                                                    }`}
                                            >
                                                {materia ?? ""}
                                            </td>
                                        );
                                    })}
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <Separator className="my-4" />

                    <div className="flex justify-end">
                        <Button disabled={processing} type="submit">
                            Guardar Horario
                        </Button>
                    </div>
                </form>

                {/* -------------------- MODAL SELECCIONAR MATERIA -------------------- */}
                <Dialog open={modalOpen} onOpenChange={setModalOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Seleccionar Materia</DialogTitle>
                        </DialogHeader>

                        <Select
                            onValueChange={(materiaNombre) => {
                                setMateriasAsignadas((prev: any) => ({
                                    ...prev,
                                    [celdaActual]: { materia: materiaNombre },
                                }));

                                setModalOpen(false);
                            }}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Materia" />
                            </SelectTrigger>

                            <SelectContent>
                                {materiasStatic.map((m) => (
                                    <SelectItem key={m} value={m}>
                                        {m}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </DialogContent>
                </Dialog>
            </div>
        </AppLayout>
    );
}
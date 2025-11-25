//** Hooks */
import { Head, useForm } from '@inertiajs/react';
//** Components */
import Encabezado from '@/components/encabezado';
import AppLayout from '@/layouts/app-layout';
//** Interfaces or Types */
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { usePlaneacionArchivo } from '@/hooks/useDocumentos';
import type { BreadcrumbItem, Documento } from '@/types';
import { File, FileUp, LoaderCircle, MoreVertical, Trash2 } from 'lucide-react';
import { FormEventHandler } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Planeaciones',
        href: '/planeaciones',
    },
    {
        title: 'Aprobación de Planeación',
        href: '/aprobar-planeacion',
    },
];

interface Planeacion {
    id: number;
    titulo: string;
    descripcion: string;
    estatus: string;
    grado: string;
    grupo: string;
    documents: Documento;
}

export default function AprobarPlaneacion({ planeacion }: { planeacion: Planeacion }) {
    const { data, setData, put, processing, errors } = useForm({
        estatus: planeacion.estatus,
    });

    // 🔹 No hay documentos previos todavía, así que pasamos un array vacío
    const documentos = Array.isArray(planeacion.documents) ? planeacion.documents : planeacion.documents ? [planeacion.documents] : [];

    const { file, previewUrl, uploadDate, fromDB, handleDeleteFromServer } =
        usePlaneacionArchivo(documentos, setData);

    const aprobarPlaneacionEscuela: FormEventHandler = (e) => {
        e.preventDefault();

        put(route('planeaciones.aprobarPlaneacion', planeacion.id));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Aprobar Planeacion" />
            <div className="flex h-full flex-1 flex-col gap-10 overflow-x-auto rounded-xl p-8">
                <Encabezado title="Aprobación de Planeación" description="Revisa la planeación generada por el maestro para validar la planeación" separator={true} />
                <form onSubmit={aprobarPlaneacionEscuela} method="post" className="flex flex-col gap-10">
                    <>
                        <div className="estatus flex w-full flex-col gap-4 lg:flex-row lg:gap-[180px]">
                            <div className="w-full lg:w-[300px]">
                                <Label id="estatus" className="font-medium">
                                    Estatus de entrevista
                                </Label>
                            </div>
                            <div className="flex w-full flex-col gap-2 lg:w-[405px]">
                                <div className="flex flex-col gap-2">
                                    <Select
                                        value={data.estatus ?? ''}
                                        onValueChange={(value) => setData('estatus', value)}
                                        required
                                        name="estatus"
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue
                                                placeholder={
                                                    data.estatus
                                                        ? data.estatus.charAt(0).toUpperCase() + data.estatus.slice(1)
                                                        : "Seleccionar estatus"
                                                }
                                            />
                                        </SelectTrigger>

                                        <SelectContent>
                                            <SelectItem value="en_revision">En Revisión</SelectItem>
                                            <SelectItem value="rechazado">Rechazado</SelectItem>
                                            <SelectItem value="aprobado">Aprobado</SelectItem>
                                        </SelectContent>
                                    </Select>

                                    {errors.estatus && (
                                        <p className="text-sm text-red-500">{errors.estatus}</p>
                                    )}
                                </div>
                            </div>
                        </div>
                        <Separator />
                    </>
                    <div className="titulo flex w-full flex-col gap-4 lg:flex-row lg:gap-[180px]">
                        <div className="w-full lg:w-[300px]">
                            <Label id="titulo" className="font-medium">
                                Titulo
                            </Label>
                        </div>
                        <div className="flex w-full flex-col gap-4 lg:w-[405px]">
                            <div className="flex flex-col gap-2">
                                <Input
                                    id="titulo"
                                    type="text"
                                    value={planeacion.titulo}
                                    readOnly
                                    placeholder="e.j. Planeación..."
                                />
                            </div>
                        </div>
                    </div>
                    <div className="grado flex w-full flex-col gap-4 lg:flex-row lg:gap-[180px]">
                        <div className="w-full lg:w-[300px]">
                            <Label id="grado" className="font-medium">
                                Grado
                            </Label>
                        </div>
                        <div className="flex w-full flex-col gap-4 lg:w-[405px]">
                            <div className="flex flex-col gap-2">
                                <Input
                                    id="grado"
                                    type="text"
                                    value={planeacion.grado}
                                    required
                                    placeholder="e.j. 5to."
                                    readOnly
                                />
                            </div>
                        </div>
                    </div>
                    <div className="grupo flex w-full flex-col gap-4 lg:flex-row lg:gap-[180px]">
                        <div className="w-full lg:w-[300px]">
                            <Label id="grupo" className="font-medium">
                                Grupo
                            </Label>
                        </div>
                        <div className="flex w-full flex-col gap-4 lg:w-[405px]">
                            <div className="flex flex-col gap-2">
                                <Input
                                    id="grupo"
                                    type="text"
                                    value={planeacion.grupo}
                                    required
                                    placeholder="e.j. A"
                                    readOnly
                                />
                            </div>
                        </div>
                    </div>
                    <div className="descripcion flex w-full flex-col gap-4 lg:flex-row lg:gap-[180px]">
                        <div className="w-full lg:w-[300px]">
                            <Label id="relato" className="font-medium">
                                Descripción
                            </Label>
                        </div>
                        <div className="flex w-full flex-col gap-2 lg:w-[405px]">
                            <div className="flex flex-col gap-2">
                                <Textarea
                                    className="h-[260px]"
                                    required
                                    autoFocus
                                    placeholder="Descripción de la planeacion..."
                                    value={planeacion.descripcion}
                                    readOnly
                                />
                            </div>
                        </div>
                    </div>
                    <div className="archivo flex w-full flex-col gap-4 lg:flex-row lg:gap-[180px]">
                        <div className="w-full lg:w-[300px]">
                            <Label id="type_violence" className="font-medium">
                                Archivo de la entrevista
                            </Label>
                        </div>
                    </div>
                    {previewUrl && (
                        <div className="flex flex-row">
                            <div className="flex items-center gap-3 rounded-xs border bg-white px-2 py-3">
                                <File className="text-[#000000]" />
                                <div className="flex flex-col text-sm">
                                    <span className="font-medium">{file?.name || documentos[0]?.nombre}</span>
                                    <span className="text-[10px] text-neutral-500">{uploadDate}</span>
                                </div>
                                <div className="ml-auto">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-transparent hover:text-[#000000]">
                                                <MoreVertical />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            {fromDB ? (
                                                <DropdownMenuItem onClick={handleDeleteFromServer} variant="destructive">
                                                    <Trash2 className="mr-2 h-4 w-4 text-red-500" /> Eliminar
                                                </DropdownMenuItem>
                                            ) : (
                                                <DropdownMenuItem onClick={handleDeleteFromServer}>
                                                    <Trash2 className="mr-2 h-4 w-4 text-neutral-600" /> Quitar archivo
                                                </DropdownMenuItem>
                                            )}
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </div>
                        </div>
                    )}
                    <Separator />
                    <div className="flex flex-row justify-end">
                        <Button disabled={processing} type="submit" className="w-full md:w-[180px]">
                            {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}Guardar
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}

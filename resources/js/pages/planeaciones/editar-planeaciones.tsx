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

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Planeaciones',
        href: '/planeaciones',
    },
    {
        title: 'Nueva Planeacion',
        href: '/agregar-planeacion',
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

export default function CrearPlaneacion({ planeacion }: { planeacion: Planeacion }) {
    const { data, setData, post, processing, errors } = useForm({
        _method: 'PUT',
        estatus: planeacion.estatus,
        titulo: planeacion.titulo,
        descripcion: planeacion.descripcion,
        grado: planeacion.grado,
        grupo: planeacion.grupo,
        planeacion_archivo: null as File | null,
    });

    // 🔹 No hay documentos previos todavía, así que pasamos un array vacío
    const documentos = Array.isArray(planeacion.documents) ? planeacion.documents : planeacion.documents ? [planeacion.documents] : [];

    const { inputRef, pendingFile, file, previewUrl, uploadDate, fromDB, handleFileSelect, handleConfirmUpload, handleDeleteFromServer } =
        usePlaneacionArchivo(documentos, setData);

    const editarPlaneacion: FormEventHandler = (e) => {
        e.preventDefault();
        // 👇 Añadimos el override para que Laravel lo interprete como PUT
        setData('_method', 'PUT');

        post(route('planeaciones.update', planeacion.id), {
            forceFormData: true, // ✅ empaqueta todo como FormData (para enviar el PDF)
            preserveScroll: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Editar Planeacion" />
            <div className="flex h-full flex-1 flex-col gap-10 overflow-x-auto rounded-xl p-8">
                <Encabezado title="Editar Planeacion" description="Modifica la planeacion existente en el sistema." separator={true} />

                <form onSubmit={editarPlaneacion} className="flex flex-col gap-10">
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
                                    value={data.titulo}
                                    required
                                    onChange={(e) => setData('titulo', e.target.value)}
                                    placeholder="e.j. Planeación..."
                                />
                                {errors.titulo ? (
                                    <InputError message={errors.titulo} />
                                ) : (
                                    <Label className="text-muted-foreground text-sm font-normal">Ingresa un nombre de planeación entendible</Label>
                                )}
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
                                    value={data.grado}
                                    required
                                    onChange={(e) => setData('grado', e.target.value)}
                                    placeholder="e.j. 5to."
                                />
                                {errors.grado ? (
                                    <InputError message={errors.grado} />
                                ) : (
                                    <Label className="text-muted-foreground text-sm font-normal"></Label>
                                )}
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
                                    value={data.grupo}
                                    required
                                    onChange={(e) => setData('grupo', e.target.value)}
                                    placeholder="e.j. A"
                                />
                                {errors.grupo ? (
                                    <InputError message={errors.grupo} />
                                ) : (
                                    <Label className="text-muted-foreground text-sm font-normal"></Label>
                                )}
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
                                    value={data.descripcion}
                                    onChange={(e) => setData('descripcion', e.target.value)}
                                />
                                {errors.descripcion ? (
                                    <p className="text-sm text-red-500">{errors.descripcion}</p>
                                ) : (
                                    <Label className="text-muted-foreground text-sm font-normal">
                                        Ingresa una descripcion clara sobre la planeacion a ingresar.
                                    </Label>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="archivo flex w-full flex-col gap-4 lg:flex-row lg:gap-[180px]">
                        <div className="w-full lg:w-[300px]">
                            <Label id="type_violence" className="font-medium">
                                Archivo de la entrevista
                            </Label>
                        </div>

                        <div className="flex w-full flex-col gap-2 lg:w-[405px]">
                            <div className="flex flex-col gap-2">
                                <div className="flex flex-row gap-2">
                                    <Input type="file" accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" ref={inputRef} onChange={handleFileSelect} />
                                    <Button type="button" onClick={handleConfirmUpload} disabled={!pendingFile}>
                                        <FileUp className="mr-1" />
                                        Subir
                                    </Button>
                                </div>
                                {errors.planeacion_archivo ? (
                                    <p className="text-sm text-red-500">{errors.planeacion_archivo}</p>
                                ) : (
                                    <Label className="text-muted-foreground text-sm font-normal">
                                        Se permiten archivos PDF, Word (.doc, .docx) o imágenes (.jpg, .png) de hasta 5 MB.
                                    </Label>
                                )}
                            </div>
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

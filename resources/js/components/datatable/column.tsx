import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
// import { useCan } from '@/hooks/useCan';
import { Link } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, CircleCheck, EllipsisVertical, Loader, LoaderCircle, Pencil, Trash2, File, FileDown, Check, X } from 'lucide-react';
import { useState } from 'react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import ViewDataPlaneacion from '../ui/view-data-planeacion';
import { Documento } from '@/types';
import { useDeleteAlert } from '@/hooks/useDeleteAlert';

type RowData = { id: number };

//** Configuración de Tabla Usuarios */
export type ColumnaUsuario = {
    id: number;
    nombre: string;
    apellido: string;
    correo: string;
    rol: string;
    created_at: string;
};

function ActionsCellUsuario({ row }: { row: { original: RowData } }) {
    const [menuOpen, setMenuOpen] = useState(false);
    // const { onDeleteClick } = useDeleteAlert('usuarios.destroy');
    // const { has, hasAny } = useCan();
    return (
        <>
            <div className="flex flex-row justify-end">
                <DropdownMenu open={menuOpen} onOpenChange={setMenuOpen}>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="text-muted-foreground data-[state=open]:bg-muted flex size-8" size="icon">
                            <EllipsisVertical />
                            <span className="sr-only">Opciones</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-32">
                        <DropdownMenuItem>
                            <Link href={route('usuarios.edit', row.original.id)} className="flex w-full flex-row items-center gap-1">
                                <Pencil /> Editar
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem variant="destructive">
                            <Trash2 />
                            Borrar
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </>
    );
}

export const columnasUsuario: ColumnDef<ColumnaUsuario>[] = [
    {
        accessorKey: 'id',
        header: ({ column }) => {
            return (
                <div className="w-20">
                    <Button className="flex" variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                        Identificador
                        <ArrowUpDown />
                    </Button>
                </div>
            );
        },
        cell: ({ row }) => (
            <div className="pl-3 lowercase">
                <span>{row.getValue('id')}</span>
            </div>
        ),
    },
    {
        accessorKey: 'name',
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    Nombre del usuario
                    <ArrowUpDown />
                </Button>
            );
        },
        cell: ({ row }) => (
            <div className="w-full pl-3">
                <span>
                    {row.original.nombre} {row.original.apellido}
                </span>
            </div>
        ),
    },
    {
        accessorKey: 'email',
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    Correo electrónico
                    <ArrowUpDown />
                </Button>
            );
        },
        cell: ({ row }) => (
            <div className="w-full pl-3">
                <span>{row.original.correo}</span>
            </div>
        ),
    },
    {
        accessorKey: 'rol',
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    Rol
                    <ArrowUpDown />
                </Button>
            );
        },
        cell: ({ row }) => (
            <div className="w-full pl-3">
                <span>{row.original.rol}</span>
            </div>
        ),
    },
    {
        accessorKey: 'created_at',
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    Fecha de registro
                    <ArrowUpDown />
                </Button>
            );
        },
        cell: ({ row }) => (
            <div className="w-full pl-3">
                <span>
                    {new Date(row.getValue('created_at')).toLocaleString('es-MX', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                    })}
                </span>
            </div>
        ),
    },
    {
        id: 'actions',
        cell: ({ row }) => <ActionsCellUsuario row={row} />,
    },
];

//** Configuración de Tabla Roles */
export type PermissionItem = {
    id: number;
    name: string;
};

export type ColumnaRol = {
    id: number;
    name: string;
    permissions: PermissionItem[];
};

function ActionsCellRoles({ row }: { row: { original: RowData } }) {
    const [menuOpen, setMenuOpen] = useState(false);
    // const { onDeleteClick } = useDeleteAlert('roles.destroy');
    // const { has, hasAny } = useCan();
    return (
        <>
            <div className="flex flex-row justify-end">
                <DropdownMenu open={menuOpen} onOpenChange={setMenuOpen}>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="text-muted-foreground data-[state=open]:bg-muted flex size-8" size="icon">
                            <EllipsisVertical />
                            <span className="sr-only">Opciones</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-32">
                        {/* <DropdownMenuItem>
                            <Link href={route('usuarios.show', row.original.id)} className="flex w-full flex-row items-center gap-1">
                                <FileText /> Ver detalles
                            </Link>
                        </DropdownMenuItem> */}
                        <DropdownMenuItem>
                            <Link href={route('roles.edit', row.original.id)} className="flex w-full flex-row items-center gap-1">
                                <Pencil /> Editar
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem variant="destructive">
                            <Trash2 />
                            Borrar
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </>
    );
}

export const columnasRoles: ColumnDef<ColumnaRol>[] = [
    {
        accessorKey: 'id',
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    Identificador
                    <ArrowUpDown />
                </Button>
            );
        },
        cell: ({ row }) => (
            <div className="w-full pl-3">
                <span>{row.getValue('id')}</span>
            </div>
        ),
    },
    {
        accessorKey: 'name',
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    Nombre del Rol
                    <ArrowUpDown />
                </Button>
            );
        },
        cell: ({ row }) => (
            <div className="w-full pl-3">
                <span>{row.getValue('name')}</span>
            </div>
        ),
    },
    {
        accessorKey: 'permissions',
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    Permisos
                    <ArrowUpDown />
                </Button>
            );
        },
        cell: ({ row }) => {
            // row.getValue('permissions') es unknown → casteamos
            const perms = row.getValue('permissions') as PermissionItem[] | string[];

            // Soporta ambos casos: array de objetos o de strings
            const names = Array.isArray(perms) ? perms.map((p) => (typeof p === 'string' ? p : p.name)) : [];

            return (
                <div className="flex w-full flex-wrap gap-6 pl-3">
                    {names.map((name) => (
                        <Badge key={name} variant="default">
                            {name}
                        </Badge>
                    ))}
                </div>
            );
        },
    },
    {
        id: 'actions',
        cell: ({ row }) => <ActionsCellRoles row={row} />,
    },
];

//** Configuración de Tabla Planeaciones */
type RowDataPlaneacion = {
    id: number;
    titulo: string;
    descripcion: string;
    estatus: string;
    grado: string;
    grupo: string;
    documents: Documento;
};

export type ColumnaPlaneacion = {
    id: number;
    titulo: string;
    estatus: string;
    created_at: string;
};

function ActionsCellPlaneacion({ row }: { row: { original: RowDataPlaneacion } }) {
    const [menuOpen, setMenuOpen] = useState(false);
    const { onDeleteClick } = useDeleteAlert('planeaciones.destroy');
    // const { has, hasAny } = useCan();
    return (
        <>
            <div className="flex flex-row justify-end">
                <DropdownMenu open={menuOpen} onOpenChange={setMenuOpen}>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="text-muted-foreground data-[state=open]:bg-muted flex size-8" size="icon">
                            <EllipsisVertical />
                            <span className="sr-only">Opciones</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-32">
                        <DropdownMenuItem>
                            <Link href={route('planeaciones.aprobar', row.original.id)} className="flex w-full flex-row items-center gap-1">
                                <Check /> Aprobación
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Link href={route('planeaciones.edit', row.original.id)} className="flex w-full flex-row items-center gap-1">
                                <Pencil /> Editar
                            </Link>
                        </DropdownMenuItem>
                        <ViewDataPlaneacion planeacion={row.original} />
                        <DropdownMenuItem
                            variant="destructive"
                            onSelect={async (e) => {
                                e.preventDefault();
                                // 1. cerramos el menú
                                setMenuOpen(false);
                                // 2. esperamos un frame para que cierre sin congelar
                                await new Promise((r) => requestAnimationFrame(r));
                                // 3. ejecutamos la eliminación
                                onDeleteClick(row.original.id);
                            }}>
                            <Trash2 />
                            Borrar
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </>
    );
}

export const columnasPlaneaciones: ColumnDef<ColumnaPlaneacion>[] = [
    {
        accessorKey: 'id',
        header: ({ column }) => {
            return (
                <div className="w-20">
                    <Button className="flex" variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                        Identificador
                        <ArrowUpDown />
                    </Button>
                </div>
            );
        },
        cell: ({ row }) => (
            <div className="pl-3 lowercase">
                <span>{row.getValue('id')}</span>
            </div>
        ),
    },
    {
        accessorKey: 'titulo',
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    Titulo
                    <ArrowUpDown />
                </Button>
            );
        },
        cell: ({ row }) => {
            return (
                <div className="w-full pl-3">
                    <span>{row.original.titulo || 'Sin título'}</span>
                </div>
            );
        },
    },
    {
        accessorKey: 'estatus',
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    Estatus
                    <ArrowUpDown />
                </Button>
            );
        },
        cell: ({ row }) => {
            const estatus = row.original.estatus;

            // Puedes usar colores diferentes para cada estatus si quieres
            let icon = null;
            let text = null;
            let badgeClass = 'text-muted-foreground px-1.5';

            if (estatus === 'aprobado') {
                icon = <CircleCheck className="fill-green-600 text-green-300 dark:fill-green-700" />;
                text = <p className="text-green-700 dark:text-green-500">Aprobado</p>;
                badgeClass += ' border-green-600 bg-status-card'; // Puedes agregar más clases
            } else if (estatus === 'rechazado') {
                icon = <X className=" text-red-500" />;
                text = <p className="text-red-500">Rechazado</p>;
                badgeClass += ' border-red-500 text-red-600 bg-status-card';
            } else {
                icon = <Loader />;
                text = <p>En Proceso</p>;
                badgeClass += ' border-neutral-500 bg-status-card';
            }

            return (
                <Badge variant="outline" className={badgeClass}>
                    {icon} {text}
                </Badge>
            );
        },
    },
    {
        accessorKey: 'created_at',
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    Fecha de registro
                    <ArrowUpDown />
                </Button>
            );
        },
        cell: ({ row }) => (
            <div className="w-full pl-3">
                <span>
                    {new Date(row.getValue('created_at')).toLocaleString('es-MX', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                    })}
                </span>
            </div>
        ),
    },
    {
        id: 'actions',
        cell: ({ row }) => <ActionsCellPlaneacion row={row} />,
    },
];

//** Configuración de Tabla Documentos */
export type ColumnaDocumentos = {
    id: number;
    nombre: string;
    planeacion: {
        titulo: string;
        grado: string;
        grupo: string;
    }
    ruta: string;
    created_at: string;
};

function ActionsCellDocumento({ row }: { row: { original: ColumnaDocumentos } }) {
    const filePath = row.original.ruta;
    const [menuOpen, setMenuOpen] = useState(false);
    // const { onDeleteClick } = useDeleteAlert('usuarios.destroy');
    // const { has, hasAny } = useCan();
    return (
        <>
            <div className="flex flex-row justify-end">
                <DropdownMenu open={menuOpen} onOpenChange={setMenuOpen}>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="text-muted-foreground data-[state=open]:bg-muted flex size-8" size="icon">
                            <EllipsisVertical />
                            <span className="sr-only">Opciones</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-32">
                        <DropdownMenuItem className="cursor-pointer" onClick={() => window.open(`/ver-documento/${filePath}`, '_blank')}>
                            <File /> Ver PDF
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            className="cursor-pointer"
                            onClick={() => {
                                const link = document.createElement('a');
                                link.href = `/ver-documento/${filePath}`;
                                link.download = filePath.split('/').pop() || 'documento.pdf';
                                document.body.appendChild(link);
                                link.click();
                                document.body.removeChild(link);
                            }}
                        >
                            <FileDown /> Descargar
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </>
    );
}

export const columnasDocumento: ColumnDef<ColumnaDocumentos>[] = [
    {
        accessorKey: 'id',
        header: ({ column }) => {
            return (
                <div className="w-20">
                    <Button className="flex" variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                        Identificador
                        <ArrowUpDown />
                    </Button>
                </div>
            );
        },
        cell: ({ row }) => (
            <div className="pl-3 lowercase">
                <span>{row.getValue('id')}</span>
            </div>
        ),
    },
    {
        accessorKey: 'nombre',
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    Nombre del Documento
                    <ArrowUpDown />
                </Button>
            );
        },
        cell: ({ row }) => (
            <div className="w-full pl-3">
                <span>
                    {row.original.nombre}
                </span>
            </div>
        ),
    },
    {
        accessorKey: 'planeacionTitulo',
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    Planeacion
                    <ArrowUpDown />
                </Button>
            );
        },
        cell: ({ row }) => (
            <div className="w-full pl-3">
                <span>{row.original.planeacion.titulo}</span>
            </div>
        ),
    },
    {
        accessorKey: 'planeacionGrado',
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    Grado
                    <ArrowUpDown />
                </Button>
            );
        },
        cell: ({ row }) => (
            <div className="w-full pl-3">
                <span>{row.original.planeacion.grado}</span>
            </div>
        ),
    },
    {
        accessorKey: 'planeacionGrupo',
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    Grupo
                    <ArrowUpDown />
                </Button>
            );
        },
        cell: ({ row }) => (
            <div className="w-full pl-3">
                <span>{row.original.planeacion.grupo}</span>
            </div>
        ),
    },
    {
        accessorKey: 'created_at',
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    Fecha de registro
                    <ArrowUpDown />
                </Button>
            );
        },
        cell: ({ row }) => (
            <div className="w-full pl-3">
                <span>
                    {new Date(row.getValue('created_at')).toLocaleString('es-MX', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                    })}
                </span>
            </div>
        ),
    },
    {
        id: 'actions',
        cell: ({ row }) => <ActionsCellDocumento row={row} />,
    },
];
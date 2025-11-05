import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
// import { useCan } from '@/hooks/useCan';
// import { useDeleteAlert } from '@/hooks/useDeleteAlert';
import { Link } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, EllipsisVertical, Pencil, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';

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

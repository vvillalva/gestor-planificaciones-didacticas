import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Link } from '@inertiajs/react';
import {
    ColumnDef,
    ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
    VisibilityState,
} from '@tanstack/react-table';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { Input } from '../ui/input';

import Encabezado from '../encabezado';
import { Pagination } from './pagination';

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    activeFilter?: boolean;
    placeholderFilter?: string;
    filter?: string;
    encabezado?: boolean;
    titulo?: string;
    subtitle?: string;
    resourceName?: string;
    pagination?: boolean;
    labelButton?: string;
    classNameTable?: string;
    className?: string;
}

export function DataTable<TData, TValue>({
    columns,
    data,
    placeholderFilter,
    activeFilter = true,
    filter,
    encabezado = false,
    titulo = '',
    subtitle = '',
    resourceName = '',
    pagination = true,
    labelButton = 'Agregar Opción',
    classNameTable = '',
    className = '',
}: DataTableProps<TData, TValue>) {
    //const { hasAny } = useCan();
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = useState({});

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    });

    return (
        <div className={`bg-card flex flex-col gap-4 rounded-xl border p-6 shadow-2xs ${className}`}>
            {encabezado && <Encabezado title={titulo} description={subtitle} />}
            {activeFilter && (
                <div className="flex flex-col justify-between gap-4 lg:flex-row">
                    <Input
                        placeholder={placeholderFilter}
                        value={(table.getColumn(`${filter}`)?.getFilterValue() as string) ?? ''}
                        onChange={(event) => table.getColumn(`${filter}`)?.setFilterValue(event.target.value)}
                        className="max-w-sm"
                    />
                    {resourceName && (
                        <Link
                            href={route(`${resourceName}.create`)}
                            className="bg-accent-foreground dark:bg-accent text-primary-foreground hover:bg-secondary-sggym-700/90 flex flex-row items-center gap-1 rounded px-3 py-1 text-sm shadow-xs"
                        >
                            <Plus size={16} /> {labelButton}
                        </Link>
                    )}
                </div>
            )}
            <div className={`h-full ${classNameTable} rounded-md border`}>
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id} className="w-auto">
                                            {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody className="overflow-y-auto">
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id} className="w-auto">
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="text-muted-foreground h-120 text-center">
                                    No hay datos disponibles.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            {pagination && <Pagination table={table} />}
        </div>
    );
}

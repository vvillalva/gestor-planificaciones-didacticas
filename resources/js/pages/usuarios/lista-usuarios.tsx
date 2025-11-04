//** Hooks */
import { Head } from '@inertiajs/react';
//** Components */
import AppLayout from '@/layouts/app-layout';
//** Interfaces or Types */
import type {  BreadcrumbItem } from '@/types';
import { Users } from 'lucide-react';


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Lista de Usuarios',
        href: '/usuarios',
    },
];

export default function ListUsers({ usuarios = [] }: { usuarios: [] }) {
    return (
           <div className="flex text-red-800 h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-8">
                Hola, como estas? 
            </div>
    );
}
import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

// PERMISSIONS SYSTEM – Typed

export const ACTIONS = [
    "ver",
    "crear",
    "editar",
    "eliminar",
    "aprobar",
    "subir",
] as const;
export type Action = typeof ACTIONS[number];

export const DOMAINS = [
    "usuario",
    "planeacion",
    "documento",
    "roles",
    "graficas",
    "graficasAdmin",
] as const;
export type Domain = typeof DOMAINS[number];

export type Permission = `${Action}.${Domain}`;

// Tus permisos estrictamente tipados
export const PERMISSIONS: Permission[] = [
    "ver.usuario",
    "crear.usuario",
    "editar.usuario",
    "eliminar.usuario",

    "ver.planeacion",
    "crear.planeacion",
    "editar.planeacion",
    "eliminar.planeacion",
    "aprobar.planeacion",

    "ver.documento",
    "subir.documento",
    "eliminar.documento",

    "ver.roles",
    "crear.roles",
    "editar.roles",
    "eliminar.roles",

    "ver.graficas",
    "ver.graficasAdmin",
];

// Para formularios (crear/editar roles)
export interface RoleForm {
    name: string;
    permissions: Permission[];
}

type RoleFormData = {
    id: number;
    name: string;
    permissions: Permission[]; // <<— importante: string[]
};

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    nombre: string;
    apellido: string;
    correo: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

export interface Documento{
    id:number;
    created_at: string;
    ruta: string;
    nombre: string;
    tipo: string;
}
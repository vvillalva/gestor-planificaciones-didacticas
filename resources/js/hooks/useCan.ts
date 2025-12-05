import { usePage } from "@inertiajs/react";

export function useCan(){
    const { auth } = usePage().props as unknown as { auth: { permissions: string[] } };
    const set = new Set(auth?.permissions ?? []);

    const has = (perm?: string) => (perm ? set.has(perm) :  true);
    const hasAny = (perms: string[] = []) => perms.some(p => set.has(p));
    const hasAll = (perms: string[] = []) => perms.every(p => set.has(p));

    return { has, hasAny, hasAll, permissions: set };
}
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from '@/components/ui/sidebar';
import type { NavItem, SubNavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { ChevronRight } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';

export function NavMain({ items = [] }: { items: NavItem[] }) {
    // 1) Trae permisos desde Inertia de forma segura
    const { auth } = usePage().props as unknown as { auth: { permissions: string[] } };
    const perms = new Set(auth?.permissions ?? []);
    const has = (perm?: string) => (perm ? perms.has(perm) : true);

    // 2) Filtrar árbol por permisos (NO muta href ni cambia tus tipos)
    const filterNav = (nodes: NavItem[]): NavItem[] => {
        const out: NavItem[] = [];

        for (const n of nodes) {
            const parentHasPermissionKey = typeof n.permission !== 'undefined';
            const parentAllowed = has(n.permission);

            // 1) Si el padre DEFINE permission y NO la tiene -> se oculta TODA la rama
            if (parentHasPermissionKey && !parentAllowed) {
                continue;
            }

            // 2) Si el padre no define permission, filtramos hijos por sus propias permissions
            const visibleSubs = n.subitems?.filter((s: SubNavItem) => has((s as { permission?: string }).permission)) ?? [];

            const hasChildren = visibleSubs.length > 0;

            // 3) Incluir el padre:
            //    - Si define permission y la tiene -> incluir (con hijos filtrados si los hay)
            //    - Si NO define permission -> incluir si es hoja o si tiene hijos visibles
            if ((parentHasPermissionKey && parentAllowed) || (!parentHasPermissionKey && (hasChildren || !n.subitems))) {
                out.push({
                    ...n,
                    subitems: hasChildren ? (visibleSubs as SubNavItem[]) : undefined,
                });
            }
        }
        return out;
    };

    const visible = filterNav(items);

    return (
        <SidebarGroup>
            <SidebarGroupLabel>Acciones</SidebarGroupLabel>
            <SidebarMenu>
                {visible.map((item) =>
                    item.subitems && item.subitems.length > 0 ? (
                        // ========= Con submenú =========
                        <Collapsible key={item.title} asChild defaultOpen={item.isActive} className="group/collapsible">
                            <SidebarMenuItem>
                                <CollapsibleTrigger asChild>
                                    {/* El padre actúa como sección/trigger; no navegamos aquí */}
                                    <SidebarMenuButton tooltip={item.title}>
                                        {item.icon && <item.icon />}
                                        <span>{item.title}</span>
                                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                    </SidebarMenuButton>
                                </CollapsibleTrigger>
                                <CollapsibleContent>
                                    <SidebarMenuSub>
                                        {item.subitems.map((sub: SubNavItem) => (
                                            <SidebarMenuSubItem key={sub.title}>
                                                <SidebarMenuSubButton asChild>
                                                    {/* Subitem sólo navega si tiene href y permiso (ya filtrado) */}
                                                    {sub.href ? (
                                                        <Link href={sub.href} prefetch>
                                                            <span>{sub.title}</span>
                                                        </Link>
                                                    ) : (
                                                        <span className="text-muted-foreground">{sub.title}</span>
                                                    )}
                                                </SidebarMenuSubButton>
                                            </SidebarMenuSubItem>
                                        ))}
                                    </SidebarMenuSub>
                                </CollapsibleContent>
                            </SidebarMenuItem>
                        </Collapsible>
                    ) : (
                        // ========= Ítem simple =========
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton asChild tooltip={item.title}>
                                {/* Renderiza Link sólo si el ítem tiene permiso y href */}
                                {has(item.permission) && item.href ? (
                                    <Link href={item.href} prefetch>
                                        {item.icon && <item.icon />}
                                        <span>{item.title}</span>
                                    </Link>
                                ) : (
                                    // Si no tiene permiso, no se renderiza este item (fue filtrado).
                                    // Si llegara a pasar por algún edge case, lo mostramos como texto no clickeable.
                                    <div className="flex items-center gap-2 opacity-60">
                                        {item.icon && <item.icon />}
                                        <span>{item.title}</span>
                                    </div>
                                )}
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ),
                )}
            </SidebarMenu>
        </SidebarGroup>
    );
}

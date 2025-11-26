import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { BookOpen, Folder, LayoutGrid, Shield, SquareLibrary, Users } from 'lucide-react';
import AppLogo from './app-logo';
import { NavOpciones } from './nav-options';
import { useCan } from '@/hooks/useCan';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'Planeaciones',
        href: '/planeaciones',
        icon: BookOpen,
        permission: 'ver.planeacion',
    },
    {
        title: 'Documentos',
        href: '/documentos',
        icon: SquareLibrary,
        permission: 'ver.documento',
    },
];

const adminNavItems: NavItem[] = [
    {
        title: 'Usuarios',
        href: '/usuarios',
        icon: Users,
        permission: 'ver.usuario',
    },
    {
        title: 'Roles',
        href: '/roles',
        icon: Shield,
        permission: 'ver.roles',
    },
];

export function AppSidebar() {
    const { hasAny, has } = useCan();
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
                { hasAny(['ver.usuario', 'ver.roles']) && <NavOpciones items={adminNavItems} titulo="Administrador" /> }
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}

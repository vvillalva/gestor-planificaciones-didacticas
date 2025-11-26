
import type { SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import type { PropsWithChildren } from 'react';
import fondoEscuela from '@/assets/images/foto-escuela.png';
import logo from '@/assets/images/logo-escuela.png';

interface AuthLayoutProps {
    title?: string;
    description?: string;
}

export default function AuthSplitLayout({ children, title, description }: PropsWithChildren<AuthLayoutProps>) {
    const { name, quote } = usePage<SharedData>().props;

    return (
        <div className="relative grid h-dvh flex-col items-center justify-center px-8 sm:px-0 lg:max-w-none lg:grid-cols-2 lg:px-0">
            <div className="bg-muted relative hidden h-full flex-col p-10 text-white lg:flex dark:border-r">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${fondoEscuela})` }}
                />
                <Link href={route('home')} className="relative z-20 flex items-center text-lg font-medium">
                    <img src={logo} alt="Esc. Prim. Fed. Francisco Villa" className='w-20 h-20'/>
                    <p className='font-semibold text-2xl'>{name}</p>
                </Link>
            </div>
            <div className="w-full lg:p-8 gap-10 flex flex-col justify-center">
                <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                    <Link href={route('home')} className="relative z-20 flex items-center justify-center">
                        <img src={logo} alt="Esc. Prim. Fed. Francisco Villa" className='w-20 h-20'/>
                    </Link>
                    <div className="flex flex-col items-center gap-2 text-center">
                        <h1 className="text-xl font-medium">{title}</h1>
                        <p className="text-muted-foreground text-sm text-balance">{description}</p>
                    </div>
                    {children}
                </div>
                <div className='w-full'>
                    <p className='text-center text-xs text-neutral-500 tracking-tighter'>Derechos Reservados 2025 © Esc. Prim. Fed. Francisco Villa</p>
                </div>
            </div>
        </div>
    );
}

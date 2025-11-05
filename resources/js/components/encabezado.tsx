import { ReactNode } from 'react';
import { Separator } from './ui/separator';

interface PropsEncabezado {
    title: string;
    description: string;
    icon?: ReactNode;
    separator?: boolean;
}

export default function Encabezado({
    title = 'Lorem Ipsum',
    description = 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    icon,
    separator = false,
}: PropsEncabezado) {
    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-row items-center gap-4">
                {icon && <div className="bg-accent-foreground dark:bg-accent flex h-10 w-10 items-center justify-center rounded p-2 text-white">{icon}</div>}
                <div className="flex w-full flex-col">
                    <h1 className="text-neutral-sggym-800 text-3xl font-semibold tracking-tighter leading-none">{title}</h1>
                    <small className="text-neutral-sggym-600">{description}</small>
                </div>
            </div>
            {separator && <Separator />}
        </div>
    );
}
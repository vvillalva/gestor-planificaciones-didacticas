import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Separator } from '@/components/ui/separator';
import { Trash2 } from 'lucide-react';
import { createContext, useCallback, useContext, useState } from 'react';

type ConfirmParams = {
    title?: string;
    description?: string;
    actionText?: string;
    cancelText?: string;
    destructive?: boolean;
};

type Ctx = (params: ConfirmParams) => Promise<boolean>;

const ConfirmCtx = createContext<Ctx | null>(null);

export function useConfirm() {
    const ctx = useContext(ConfirmCtx);
    if (!ctx) throw new Error('useConfirm must be used inside <ConfirmProvider />');
    return ctx;
}

export function ConfirmProvider({ children }: { children: React.ReactNode }) {
    const [open, setOpen] = useState(false);
    const [resolver, setResolver] = useState<(ok: boolean) => void>(() => () => { });
    const [params, setParams] = useState<ConfirmParams>({});
    const confirm = useCallback<Ctx>((p) => {
        setParams(p);
        setOpen(true);
        return new Promise<boolean>((resolve) => setResolver(() => resolve));
    }, []);
    const close = (ok: boolean) => {
        setOpen(false);
        // da un tick para que Radix limpie focus/aria antes de resolver
        requestAnimationFrame(() => resolver(ok));
    };

    return (
        <ConfirmCtx.Provider value={confirm}>
            {children}
            {/* Nota: modal={false} evita que Radix marque el resto del DOM como aria-hidden/inert */}
            <AlertDialog open={open} onOpenChange={setOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <div className="flex flex-col items-center justify-center">
                            <div className="rounded-full bg-primary-sggym-100 p-2.5 text-primary">
                                <Trash2 size={24} />
                            </div>
                        </div>
                        <AlertDialogTitle className="text-center">{params.title ?? 'Confirmar acción'}</AlertDialogTitle>
                        <AlertDialogDescription className="text-center">
                            {params.description ?? '¿Deseas continuar? Esta acción no se puede deshacer.'}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <Separator />
                    <AlertDialogFooter>
                        <div className='w-full flex flex-row justify-center gap-4'>
                            <AlertDialogCancel onClick={() => close(false)}>{params.cancelText ?? 'Cancelar'}</AlertDialogCancel>
                            <AlertDialogAction className={params.destructive ? 'bg-destructive hover:bg-destructive/90' : ''} onClick={() => close(true)}>
                                {params.actionText ?? 'Aceptar'}
                            </AlertDialogAction>
                        </div>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </ConfirmCtx.Provider>
    );
}
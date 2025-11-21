import { useConfirm } from '@/providers/ConfirmProvider';
import { router } from '@inertiajs/react';

export function useDeleteAlert(routeName: string) {
    const confirm = useConfirm();

    const onDeleteClick = async (id: number) => {
        const ok = await confirm({
            title: '¿Desea eliminar esta opción?',
            description: '¿Estás seguro de eliminar este registro? Ya no podrás recuperar este registro ni sus datos relacionados.',
            actionText: 'Eliminar',
            cancelText: 'Cancelar',
            destructive: true,
        });

        if (!ok) return;

        router.delete(route(routeName, id), {
            preserveScroll: true,
        });
    };

    return {
        onDeleteClick,
    };
}
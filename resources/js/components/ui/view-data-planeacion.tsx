import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { File, MoreVertical } from 'lucide-react';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Documento } from "@/types";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./dropdown-menu";
import { formatDate } from "@/hooks/use-time";

interface PlaneacionProps {
    titulo?: string;
    grado?: string;
    grupo?: string;
    descripcion?: string;
    documents?: Documento;
}

interface ViewDataPlaneacionProps {
    planeacion?: PlaneacionProps;
}

export default function ViewDataPlaneacion({ planeacion }: ViewDataPlaneacionProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" className="flex w-full flex-row items-center gap-1 justify-start !px-2"><File /> Ver</Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col gap-4">
        <SheetHeader>
          <SheetTitle>Planeación Detalles</SheetTitle>
          <SheetDescription>
            Estos son los detalles de la planeación seleccionada.
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col gap-2 h-full">
            <div className="flex flex-col">
                <Label className="text-neutral-600">Titulo</Label>
                <p className="font-medium text-[20px]">{planeacion?.titulo || 'No hay datos disponibles.'}</p>
            </div>
            <div className="flex flex-col">
                <Label className="text-neutral-600">Grado</Label>
                <p className="font-medium text-[20px]">{planeacion?.grado || 'No hay datos disponibles.'}</p>
            </div>
            <div className="flex flex-col">
                <Label className="text-neutral-600">Grupo</Label>
                <p className="font-medium text-[20px]">{planeacion?.grupo || 'No hay datos disponibles.'}</p>
            </div>
            <div className="flex flex-col">
                <Label className="text-neutral-600">Descripción</Label>
                <p className="font-medium text-[20px]">{planeacion?.descripcion || 'No hay datos disponibles.'}</p>
            </div>
            <div className="flex flex-col gap-2">
                <Label className="text-neutral-600">Documentos</Label>
                <div className="flex w-full flex-wrap gap-x-2 gap-y-3">
                    {planeacion?.documents && planeacion.documents.length > 0 ? (
                        planeacion.documents.map((doc) => (
                            <div
                                key={doc.id}
                                className="flex items-center gap-3 rounded-xs border bg-white px-2 py-3"
                            >
                                <File className="text-[#000000]" />

                                <div className="flex flex-col text-sm">
                                    {/* ✔ Nombre correcto */}
                                    <span className="font-medium">{doc.nombre}</span>

                                    {/* ✔ Fecha formateada */}
                                    <span className="text-[10px] text-neutral-500">
                                        {formatDate(doc.created_at)}
                                    </span>
                                </div>

                                <div className="ml-auto">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button
                                                variant="ghost"
                                                className="h-8 w-8 cursor-pointer p-0 hover:bg-transparent hover:text-[#000000]"
                                            >
                                                <MoreVertical />
                                            </Button>
                                        </DropdownMenuTrigger>

                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem
                                                className="cursor-pointer"
                                                onClick={() =>
                                                    window.open(`/ver-documento/${doc.ruta}`, "_blank")
                                                }
                                            >
                                                Ver
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-sm text-neutral-500 italic">
                            No hay archivos.
                        </p>
                    )}
                </div>
            </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button variant="outline">Cerrar</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

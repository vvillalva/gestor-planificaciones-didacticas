import type { Documento } from '@/types';
import { useEffect, useRef, useState } from 'react';

//** blob
//** (Binary Large Object - Archivos o datos binarios temporales (por ejemplo, un PDF, una imagen, un video, etc.)) */

export function usePlaneacionArchivo(
    documentos: Documento[],
    setData: (field: string, value: string | number | number[] | boolean | File | null) => void,
) {
    const [pendingFile, setPendingFile] = useState<File | null>(null);
    const [file, setFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [uploadDate, setUploadDate] = useState<string | null>(null);
    const [isDeleted, setIsDeleted] = useState(false);
    const [fromDB, setFromDB] = useState(false);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const FIELD_NAME = 'planeacion_archivo';
    const MAX_BYTES = 5 * 1024 * 1024; // 1MB
    // Tipos de archivo aceptados
    const ACCEPTED_MIME = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'image/jpeg',
        'image/png',
    ];

    // Mostrar documento desde BD solo si no hay uno nuevo ni eliminado
    useEffect(() => {
        if (documentos.length > 0 && !isDeleted && !file && !pendingFile) {
            const doc = documentos[0];
            setPreviewUrl(`/storage/${doc.ruta}`);
            setUploadDate(new Date(doc.created_at).toLocaleString('es-MX'));
            setFromDB(true);
        }
    }, [documentos, isDeleted, file, pendingFile]);

    // Limpiar URL blob al desmontar
    useEffect(() => {
        return () => {
            if (previewUrl && previewUrl.startsWith('blob:')) URL.revokeObjectURL(previewUrl);
        };
    }, [previewUrl]);

    const resetFile = () => {
        if (inputRef.current) inputRef.current.value = '';
        if (previewUrl?.startsWith('blob:')) URL.revokeObjectURL(previewUrl);

        setFile(null);
        setPendingFile(null);
        setPreviewUrl(null);
        setUploadDate(null);
        setFromDB(false);

        setData(FIELD_NAME, null);
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const f = e.target.files?.[0];
        if (!f) return;

        if (!ACCEPTED_MIME.includes(f.type)) {
            alert('Solo se permiten archivos PDF, Word (.doc, .docx) o imágenes (.jpg, .png).');
            resetFile();
            return;
        }
        if (f.size > MAX_BYTES) {
            alert('El archivo no debe pesar más de 1MB.');
            resetFile();
            return;
        }

        // Restablecer flags
        setIsDeleted(false);
        setFromDB(false);
        setPendingFile(f);
    };

    const handleConfirmUpload = () => {
        if (!pendingFile) return;

        // 🔹 Si existe documento previo, se marca para reemplazo
        if (documentos.length > 0) {
            setData('entrevista_replace_id', documentos[0].id);
        }

        const url = URL.createObjectURL(pendingFile);
        setFile(pendingFile);
        setPreviewUrl(url);
        setUploadDate(new Date().toLocaleString('es-MX'));
        setData(FIELD_NAME, pendingFile);
        setPendingFile(null);
        setFromDB(false);
        setIsDeleted(false);
    };

    const handleDeleteFromServer = async () => {
        if (!documentos.length) return;
        const id = documentos[0].id;

        setIsDeleted(true);
        setPreviewUrl(null);
        setUploadDate(null);
        setFile(null);
        setFromDB(false);
        setData('entrevista_deleted_id', [id]);
    };

    return {
        FIELD_NAME,
        inputRef,
        pendingFile,
        file,
        previewUrl,
        uploadDate,
        isDeleted,
        fromDB,
        handleFileSelect,
        handleConfirmUpload,
        resetFile,
        handleDeleteFromServer,
    };
}
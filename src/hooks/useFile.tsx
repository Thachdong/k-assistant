"use client"

import { useCallback, useState } from "react";

export type TFileAction = {
    file: File | null;
    onFileChange: (file: File | null) => void;
}

export const useFile = () => {
    const [file, setFile] = useState<File | null>(null);

    const onFileChange = useCallback((file: File | null) => {
        setFile(file);
    }, [])

    return {
        file,
        onFileChange
    }
}
import Text from '@/shared/components/ui/atoms/Text';
import React, { Dispatch, SetStateAction, useRef, useState } from 'react'

const FileUploadBox = ({setImage}:{setImage: Dispatch<SetStateAction<string | null>>}) => {
     const [dragOver, setDragOver] = useState(false);
     const fileInputRef = useRef<HTMLInputElement>(null);
    const handleFileChange = (file: File | undefined) => {
        if (!file || !file?.type.startsWith("image/")) {

            return;
        }
        const imageUrl = URL.createObjectURL(file);
        setImage(imageUrl);

    };


    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };
    return (
        <div
            onDragOver={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setDragOver(true);
            }}
            onDrop={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setDragOver(false);
                const file = e.dataTransfer.files?.[0];
                handleFileChange(file);
            }}
            onDragLeave={(e) => {
                setDragOver(false);
            }} className="py-12 px-6"
        >
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={(e) => {
                    const file = e.target.files?.[0];
                    handleFileChange(file);
                }}
                className="hidden"
            />
            <button
                type="button"
                onClick={handleUploadClick}
                className="flex flex-col items-center gap-3 w-full"
            >
                <div className="w-16 h-16 rounded-full bg-theme/10 flex items-center justify-center cursor-pointer"

                >
                    <Text variant="muted" className="text-2xl">
                        📷
                    </Text>
                </div>
                <div>
                    {dragOver ? (
                        <Text variant="body" className="font-medium">
                            Drop to upload
                        </Text>
                    ) : (
                        <>
                            <Text variant="body" className="font-medium">
                                Click to upload
                            </Text>
                            <Text variant="muted" className="text-xs mt-1">
                                or drag and drop
                            </Text>
                        </>
                    )}
                </div>
            </button>
        </div>
    )
}

export default FileUploadBox
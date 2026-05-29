import cloudinary from "@/config/cloudinary.js";
import type { UploadApiResponse } from "cloudinary";

export const uploadToCloudinary = (buffer: Buffer, folder: string) => {
    return new Promise<UploadApiResponse>((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            { folder: folder },
            (error, result) => {
                if (error) return reject(error);
                if (!result) return reject(new Error("Upload failed"));
                resolve(result);
            }
        );

        stream.end(buffer);
    });
};
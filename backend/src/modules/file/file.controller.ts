import { asyncHandler } from "@/shared/utils/asyncHandler.js";
import type { Request, Response } from "express";
import fileService from "../../shared/services/file.services.js";
import { successResponse } from "@/shared/utils/responseHandler.js";

const fileController = {
    uploadFile: asyncHandler(async (req: Request, res: Response) => {
        const file = req.file;
        if (!file) {
            return res.status(400).json({ message: "No file uploaded" });
        }
        const buffer = file.buffer;

        const result = await fileService.uploadFile(buffer);
        return successResponse(res, {
            data: {
                id: result.public_id,
                url: result.secure_url
            },
            message: "File uploaded successfully",
            statusCode: 200
        })
    })
}

export default fileController;
import { AppError } from "@/shared/errors/AppError.js";
import { asyncHandler } from "@/shared/utils/asyncHandler.js";
import type { Request, Response } from "express";
import userService from "./user.services.js";
import { toProfileDTO } from "./user.dto.js";
import { successResponse } from "@/shared/utils/responseHandler.js";
import type { ProfileResponseDTO } from "./user.types.js";

const userController = {

    getProfile: asyncHandler(async (req: Request, res: Response) => {
        const userId = req.user!.id;

        const user = await userService.getProfile(userId);
        const data: ProfileResponseDTO = toProfileDTO(user);
        return successResponse(res, {
            data,
            message: "Profile fetched Successfully",
            statusCode: 200
        })
    }),

    profileUpdate: asyncHandler(async (req: Request, res: Response) => {
        const userId = req.user!.id;
        if (!userId)
            throw new AppError("Unauthenticated", 401)
        const payload = req.body;

        const validationResult = userService.validateUpdateProfileDTO(payload);
        if (!validationResult.success) {
            throw new AppError("Validation failed", 422, { errors: validationResult.error.flatten().fieldErrors })
        }

        const user = await userService.updateProfile(userId, payload);
        const data: ProfileResponseDTO = toProfileDTO(user as any);
        return successResponse(res, {
            data,
            message: "Profile updated Successfully",
            statusCode: 200
        })
    }),
    completeProfile: asyncHandler(async (req: Request, res: Response) => {
        const userId = req.user!.id;
        const file = req.file;
        const buffer = file?.buffer;

        const user = await userService.completeProfile(userId, buffer);
        if (user?.profile?.firstLogin)
            throw new AppError("Failed to complete profile", 500);

        const data: ProfileResponseDTO = toProfileDTO(user);
        return successResponse(res, {
            data,
            message: "Profile completed Successfully",
            statusCode: 200
        })
    }),
}

export default userController;
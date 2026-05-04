import type { Request, Response } from "express";
import type { CreateUserDTO } from "@/modules/auth/auth.types.js";
import userService  from "@/modules/auth/auth.services.js";
import { successResponse } from "@/shared/utils/responseHandler.js";
import cookieService from "@/shared/services/cookie.service.js";
import { AppError } from "@/shared/errors/AppError.js";
import { asyncHandler } from "@/shared/utils/asyncHandler.js";
import AuthOrchestrator from "./auth.orchestrator.js";

const AuthController = {
    createUser: asyncHandler(async (req: Request, res: Response) => {
        const data: CreateUserDTO = req.body;

        const validationResult = userService.validateCreateUserDTO(data);
        if (!validationResult.success) {
            throw new AppError("Validation failed", 422, validationResult.error.flatten().fieldErrors)
        }

        const { user, session } = await AuthOrchestrator.registerFlow(data);

        cookieService.setCookie(res, "user-session", session.sessionId)

        return successResponse(res, {
            data: { email: user.email },
            message: "User Created Succesfully",
            statusCode: 201
        })

    })
}

export default AuthController;
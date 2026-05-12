import type { Request, Response } from "express";
import type { CreateUserDTO } from "@/modules/auth/auth.types.js";
import authService from "./auth.services.js";
import { successResponse } from "@/shared/utils/responseHandler.js";
import cookieService from "@/shared/services/cookie.service.js";
import { AppError } from "@/shared/errors/AppError.js";
import { asyncHandler } from "@/shared/utils/asyncHandler.js";
import authOrchestrator from "./auth.orchestrator.js";
import sessionService from "@/shared/services/session.service.js";
import { EmailVerificationType, SessionType } from "@prisma/client/edge";
import tokenService from "@/shared/services/token.service.js";
import emailService from "@/shared/services/email.service.js";
import { toLoginDTO } from "./auth.dto.js";

const authController = {
    createUser: asyncHandler(async (req: Request, res: Response) => {
        const data: CreateUserDTO = req.body;

        const validationResult = authService.validateCreateUserDTO(data);
        if (!validationResult.success) {
            throw new AppError("Validation failed", 422, validationResult.error.flatten().fieldErrors)
        }

        const session = await authOrchestrator.registerFlow(data);

        cookieService.setCookie(res, "_bn_pendingverification", session.sessionId)

        return successResponse(res, {
            message: "User Created Succesfully",
            statusCode: 201
        })

    }),

    login: asyncHandler(async (req: Request, res: Response) => {

        const { email, password } = req.body;

        if (!email || !password) {
            throw new AppError("Email and password are required", 422);
        }

        const { accessToken, refreshToken, user } = await authOrchestrator.loginFlow({ email, password })

        const response = cookieService.setCookie(res, "_bn_refreshtoken", refreshToken, {
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        const data = toLoginDTO(accessToken, user);
        return successResponse(response, {
            data,
            message: "Login Successful",
            statusCode: 200
        })
    }),
    refreshAccessToken: asyncHandler(async (req: Request, res: Response) => {
        const token = req.cookies._bn_refreshtoken;
        if (!token)
            throw new AppError("Invalid or expired token", 401);
        const { accessToken, refreshToken } = await authOrchestrator.tokenRefreshFlow(token);
        const response = cookieService.setCookie(res, "_bn_refreshtoken", refreshToken, {
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
        return successResponse(response, {
            data: { accessToken },
            message: "Access token refreshed successfully",
            statusCode: 200
        })
    }),
    getCurrentUser: asyncHandler(async (req: Request, res: Response) => {
        const refreshToken = req.cookies._bn_refreshtoken;
        if (!refreshToken)
            throw new AppError("Invalid or expired token", 401);
        
        const { user, accessToken } = await authService.restoreSession(refreshToken);
        
        const data = toLoginDTO(accessToken, user);
        return successResponse(res, {
            data,
            message: "Session Restored Successfully",
            statusCode: 200
        })
    }),

    getVerificationSession: asyncHandler(async (req: Request, res: Response) => {
        const sessionId = req.cookies._bn_pendingverification;
        if (!sessionId)
            throw new AppError("Session Expired", 401)

        const session = await sessionService.getSessionByIdAndType(sessionId, SessionType.PENDING_VERIFICATION);

        return successResponse(res, {
            data: { email: session.email },
            message: "Session Verified",
            statusCode: 200
        })
    }),

    resendEmailVerification: asyncHandler(async (req: Request, res: Response) => {
        const sessionId = req.cookies._bn_pendingverification;
        if (!sessionId)
            throw new AppError("Session Expired", 401)

        const session = await sessionService.getSessionByIdAndType(sessionId, SessionType.PENDING_VERIFICATION);

        await emailService.initiateEmailVerification(session.userId, session.email as string);

        return successResponse(res, {
            message: "Email Verifivation Link Resent Succesfully",
            statusCode: 200
        })
    }),

    verifyEmail: asyncHandler(async (req: Request, res: Response) => {

        const { token } = req.body;

        if (!token)
            throw new AppError("Invalid", 401)

        await tokenService.verifyEmailToken(token, EmailVerificationType.EMAIL);
        return successResponse(res, {
            message: "Email Verifivation Link Resent Succesfully",
            statusCode: 200
        })
    }),


}

export default authController;
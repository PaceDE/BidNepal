import type { Request, Response } from "express";
import type { CreateUserDTO } from "@/modules/auth/auth.types.js";
import authService from "./auth.services.js";
import { successResponse } from "@/shared/utils/responseHandler.js";
import cookieService from "@/shared/services/cookie.service.js";
import { AppError } from "@/shared/errors/AppError.js";
import { asyncHandler } from "@/shared/utils/asyncHandler.js";
import authOrchestrator from "./auth.orchestrator.js";
import sessionService from "@/shared/services/session.service.js";
import { LinkVerificationType, SessionType } from "@prisma/client/edge";
import tokenService from "@/shared/services/token.service.js";
import emailService from "@/shared/services/email.service.js";
import { toLoginDTO } from "./auth.dto.js";
import userRepository from "../user/user.repository.js";
import { emailOTPSchema } from "./auth.validations.js";

const authController = {
    createUser: asyncHandler(async (req: Request, res: Response) => {
        const data: CreateUserDTO = req.body;

        const validationResult = authService.validateCreateUserDTO(data);
        if (!validationResult.success) {
            throw new AppError("Validation failed", 422, { errors: validationResult.error.flatten().fieldErrors, clearCookie: ["_bn_pendingverification"] })
        }

        const session = await authOrchestrator.registerFlow(data);

        if (session)
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

    logout: asyncHandler(async (req: Request, res: Response) => {
        const token = req.cookies._bn_refreshtoken;
        if (token)
            authService.logout(token);

        const cookies = Object.keys(req.cookies);
        cookies.forEach(cookie => res.clearCookie(cookie, { path: "/" }))
        return successResponse(res, {
            message: "Logged out succesfully",
        })
    }),

    refreshAccessToken: asyncHandler(async (req: Request, res: Response) => {
        const token = req.cookies._bn_refreshtoken;
        if (!token)
            throw new AppError("Invalid or expired token", 401, { clearCookie: ["_bn_refreshtoken"] });
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
            throw new AppError("Invalid or expired token", 401, { clearCookie: ["_bn_refreshtoken"] });

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
            throw new AppError("Session Expired", 401, { clearCookie: ["_bn_pendingverification"] })

        const session = await sessionService.getSessionByIdAndType(sessionId, SessionType.PENDING_VERIFICATION);

        return successResponse(res, {
            data: { email: session.email },
            message: "Session Verified",
            statusCode: 200
        })
    }),

    resendEmailVerificationLink: asyncHandler(async (req: Request, res: Response) => {
        const sessionId = req.cookies._bn_pendingverification;
        if (!sessionId)
            throw new AppError("Session Expired", 400, { clearCookie: ["_bn_pendingverification"] })

        const session = await sessionService.getSessionByIdAndType(sessionId, SessionType.PENDING_VERIFICATION);

        await emailService.initiateEmailVerificationByLink(session.userId, session.email as string);

        return successResponse(res, {
            message: "Email Verifivation Link Resent Succesfully",
            statusCode: 200
        })
    }),

    verifyEmailByLink: asyncHandler(async (req: Request, res: Response) => {

        const { token } = req.query;

        if (typeof token !== 'string')
            throw new AppError("Invalid token", 400)

        const userId = await tokenService.verifyEmailToken(token, LinkVerificationType.EMAIL);
         await authService.verifyEmail(userId);
        res.clearCookie("_bn_pendingverification", { path: "/" })
        return successResponse(res, {
            message: "Email Verified Succesfully",
            statusCode: 200
        })
    }),

   sendEmailVerificationOtp: asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user!.id;
        if(!userId)
            throw new AppError("Unauthenticated", 401)

        const user = await userRepository.findUserById(userId);

        if(!user)
            throw new AppError("User does not exist", 401)


        const expiresIn = await emailService.initiateEmailVerificationByOTP(userId, user.email);

        return successResponse(res, {
            data:{expiresIn},
            message: "Email Verification OTP sent Succesfully",
            statusCode: 200
        })
    }),

    verifyEmailByOTP: asyncHandler(async (req: Request, res: Response) => {

        const userId = req.user!.id
        if(!userId)
            throw new AppError("Unauthenticated", 401)
        const { otp } = req.body;
       
        const validation = emailOTPSchema.safeParse(otp);
        if(!validation.success)
            throw new AppError(validation.error.message,422);

        await tokenService.verifyEmailOTP(userId, LinkVerificationType.EMAIL,otp);
       
        await authService.verifyEmail(userId);
        return successResponse(res, {
            message: "Email Verified Succesfully",
            statusCode: 200
        })
    }),

    getGoogleLogin: (req: Request, res: Response) => {
        const redirect =
            typeof req.query.redirect === "string"
                ? req.query.redirect
                : "/";

        let url = new URL("https://accounts.google.com/o/oauth2/v2/auth");

        url = authService.createGoogleLoginUrl(url, redirect);

        res.redirect(url.toString());
    },

    googleCallback: asyncHandler(async (req: Request, res: Response) => {
        const { code, state } = req.query;

        if (!code)
            throw new AppError("Google Login Failed. Please try again", 400);

        let redirect = typeof state === "string" ? state : "/";
        if (!redirect.startsWith("/") || redirect.startsWith("//"))
            redirect = "/";

        const { user, accessToken, refreshToken } = await authOrchestrator.googleLoginFlow(code);

        const response = cookieService.setCookie(res, "_bn_refreshtoken", refreshToken, {
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        response.redirect(`${process.env.CLIENT_URL || "http://localhost:3000"}${redirect}`)
    })


}

export default authController;
import { generateRandomToken } from "@/shared/utils/crypto.js";
import tokenRepository from "@/shared/repository/token.repository.js";
import { EmailVerificationType, SessionType } from "@prisma/client";
import jwt from "jsonwebtoken";
import { verify } from "node:crypto";
import { AppError } from "../errors/AppError.js";
import sessionService from "./session.service.js";
import type { UserWithProfile } from "@/modules/auth/auth.types.js";
import type { JwtPayload } from "../types/token.types.js";
import userRepository from "@/modules/user/user.repository.js";

const EMAIL_TOKEN_EXPIRY_MINUTES = 15;
const MAX_RETRIES = 5
const ACCESS_SECRET = process.env.ACCESS_TOKEN_SECRET!;
const REFRESH_SECRET = process.env.REFRESH_TOKEN_SECRET!;
const emailVerification = EmailVerificationType.EMAIL;


const tokenService = {
    generateAccessToken: (user: UserWithProfile):string => {
        return jwt.sign(
            { id: user.id, role: user.role },
            ACCESS_SECRET,
            { expiresIn: "15m" }
        );
    },

    generateRefreshToken: (user: UserWithProfile):string => {
        return jwt.sign(
            { id: user.id, role: user.role},
            REFRESH_SECRET,
            { expiresIn: "7d" }
        );
    },
    verifyAccessToken: (token: string): JwtPayload => {
        try {
            return jwt.verify(token, ACCESS_SECRET) as JwtPayload;
        } catch (err) {
            throw new AppError("Invalid or expired access token", 401);
        }
    },
    
    verifyRefreshToken: (token: string): JwtPayload => {
        try {
            const session = sessionService.getSessionByIdAndType(token, SessionType.AUTHENTICATION);
            if (!session) throw new AppError("Invalid token", 401);
            return jwt.verify(token, REFRESH_SECRET) as JwtPayload;
        } catch (err) {
            throw new AppError("Invalid or expired refresh token", 401);
        }
    },

    generateEmailVerificationToken: async (userId: string): Promise<{ token: string, expiresIn: number }> => {
        for (let i = 0; i < MAX_RETRIES; i++) {
            try {
                const token = generateRandomToken(64);
                const expiresAt = new Date(
                    Date.now() + EMAIL_TOKEN_EXPIRY_MINUTES * 60 * 1000
                );

                await tokenRepository.updateEmailToken(userId, token, emailVerification, expiresAt);
                return { token, expiresIn: EMAIL_TOKEN_EXPIRY_MINUTES };
            } catch (err: any) {
                if ('code' in err) {
                    if (err.code === 'P2002') continue
                }
                throw err;
            }
        }
        throw new Error('Failed to generate unique token after max retries');
    },

    verifyEmailToken: async (token: string, type: EmailVerificationType): Promise<boolean> => {
        const record = await tokenRepository.findEmailTokenByType(token, type);

        if (!record) throw new AppError("Invalid token",400);
        if (record.expiresAt < new Date()) throw new AppError("The token is already expires. Please try again.", 422);

        await tokenRepository.deleteEmailTokenByType(token, type);
        return true;
    }
}

export default tokenService

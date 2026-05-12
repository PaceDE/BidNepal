import { AppError } from "../errors/AppError.js";
import sessionRepository from "../repository/session.repository.js";
import { EmailVerificationType, SessionType } from "@prisma/client";
import { generateRandomToken } from "../utils/crypto.js";
import { create } from "node:domain";
import { get } from "node:http";

const pendingVerificationSessionExpiresIn = 15 * 60 * 1000; // 15 minutes in milliseconds;

const emailVerification = EmailVerificationType.EMAIL;

const sessionService = {

    savependingVerificationSession: async (userId: string, email: string) => {
        const sessionId = generateRandomToken(64);
        return await sessionRepository.savependingVerificationSession(userId, email, sessionId, pendingVerificationSessionExpiresIn)
    },

    saveAuthenticationSession: async (userId: string, token: string, expiresIn: number) => {
        return await sessionRepository.saveAuthenticationSession(userId, token, expiresIn);
    },
    getSessionByIdAndType: async (sessionId: string, type: SessionType) => {
        const session = await sessionRepository.getSessionByIdAndType(sessionId, type);
        if (!session)
            throw new AppError("Session not found", 404);

        if (session.expiresAt < new Date()) {
            await sessionRepository.deleteSessionByIdAndType(sessionId, type);
            throw new AppError("Session expired", 401);
        }

        return session;
    },
    deleteSessionByIdAndType: async (sessionId: string, type: SessionType) => {
        return await sessionRepository.deleteSessionByIdAndType(sessionId, type);
    }
}

export default sessionService

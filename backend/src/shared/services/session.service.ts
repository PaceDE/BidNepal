import { AppError } from "../errors/AppError.js";
import sessionRepository from "../repository/session.repository.js";
import {  SessionType } from "@prisma/client";
import { generateRandomToken } from "../utils/crypto.js";

const pendingVerificationSessionExpiresIn = 15 * 60 * 1000; // 15 minutes in milliseconds;

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
        const clearCookie = type === SessionType.AUTHENTICATION ? "_bn_refreshtoken" : "_bn_pendingverification"
        if (!session){
            throw new AppError("Session not found", 400, {clearCookie: [clearCookie]});
        }

        if (session.expiresAt < new Date()) {
            await sessionRepository.deleteSessionByIdAndType(sessionId, type);
            throw new AppError("Session expired", 410, {clearCookie: [clearCookie]});
        }

        return session;
    },
    deleteSessionByIdAndType: async (sessionId: string, type: SessionType) => {
        return await sessionRepository.deleteSessionByIdAndType(sessionId, type);
    }
}

export default sessionService

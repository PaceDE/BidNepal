import prisma from "@/shared/lib/prisma.js";
import { SessionType } from "@prisma/client";

const pendingVerificationSession = SessionType.PENDING_VERIFICATION

const sessionRepository = {
    /* Session Token*/
    saveAuthenticationSession: async (userId: string, token: string, expiresIn: number) => {
        return prisma.session.create({
            data: { sessionId: token, userId, type: SessionType.AUTHENTICATION, expiresAt: new Date(Date.now() + expiresIn) }
        })
    },

    savependingVerificationSession: async (userId: string, email: string, token: string, expiresIn: number) => {
        return prisma.session.create({
            data: {
                sessionId: token,
                userId,
                email,
                type: pendingVerificationSession,
                expiresAt: new Date(Date.now() + expiresIn)
            }
        })
    },

    getSessionByIdAndType: async (sessionId: string, type: SessionType) => {
        return prisma.session.findUnique({
            where: { sessionId, type }
        });
    },

    deleteSessionByIdAndType: async (sessionId: string, type: SessionType) => {
        return prisma.session.delete({
            where: { sessionId, type }
        });
    }
}

export default sessionRepository;


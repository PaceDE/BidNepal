import prisma from "@/shared/lib/prisma.js";
import { EmailVerificationType, OTPVerificationType } from '@prisma/client'

const tokenRepository = {

    updateEmailToken: async (userId: string, token: string, type: EmailVerificationType, expiresAt: Date) => {
        return prisma.emailVerification.upsert({
            where: { userId_type: { userId, type: type } },
            update: { token, expiresAt },
            create: { userId, type, token, expiresAt }
        })
    },

    deleteEmailToken: async (token: string, type: EmailVerificationType) => {
        return prisma.emailVerification.delete({
            where: { type_token: { token, type } }
        });
    },

    findEmailTokenByType: async (token: string, type: EmailVerificationType) => {
        return prisma.emailVerification.findUnique({
            where: { type_token: { type, token } }
        });
    },

    saveSessionToken: async (userId: string, token: string, expiresIn: number) => {
        return prisma.verificationSession.create({
            data: {
                sessionId: token,
                userId,
                expiresAt: new Date(Date.now() + expiresIn * 60 * 1000)
            }
        })

    }
}

export default tokenRepository;


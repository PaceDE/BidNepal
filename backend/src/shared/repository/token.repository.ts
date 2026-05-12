import prisma from "@/shared/lib/prisma.js";
import { EmailVerificationType, OTPVerificationType, SessionType } from '@prisma/client'

const pendingVerificationSession = SessionType.PENDING_VERIFICATION

const tokenRepository = {

    /* Email Verification Token */
    updateEmailToken: async (userId: string, token: string, type: EmailVerificationType, expiresAt: Date) => {
        return prisma.emailVerification.upsert({
            where: { userId_type: { userId, type: type } },
            update: { token, expiresAt },
            create: { userId, type, token, expiresAt }
        })
    },
    findEmailTokenByType: async (token: string, type: EmailVerificationType) => {
        return prisma.emailVerification.findUnique({
            where: { type_token: { type, token } }
        });
    },

    deleteEmailTokenByType: async (token: string, type: EmailVerificationType) => {
        return prisma.emailVerification.delete({
            where: { type_token: { token, type } }
        });
    }

    
}

export default tokenRepository;


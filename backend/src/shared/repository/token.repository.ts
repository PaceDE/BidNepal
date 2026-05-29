import prisma from "@/shared/lib/prisma.js";
import { LinkVerificationType, OTPVerificationType, SessionType } from '@prisma/client'

const pendingVerificationSession = SessionType.PENDING_VERIFICATION

const tokenRepository = {

    /* Email Verification Token */
    updateToken: async (userId: string, token: string, type: LinkVerificationType, expiresAt: Date) => {
        return prisma.linkVerification.upsert({
            where: { userId_type: { userId, type: type } },
            update: { token, expiresAt },
            create: { userId, type, token, expiresAt }
        })
    },
    updateOTP: async (userId: string, token: string, type: OTPVerificationType, expiresAt: Date) => {
        return prisma.otpVerification.upsert({
            where: { userId_type: { userId, type: type } },
            update: { token, expiresAt },
            create: { userId, type, token, expiresAt }
        })
    },
    findTokenByType: async (token: string, type: LinkVerificationType) => {
        return prisma.linkVerification.findUnique({
            where: { type_token: { type, token } }
        });
    },
    findOTPByType: async (userId:string, type: OTPVerificationType) => {
        return prisma.otpVerification.findUnique({
            where: { userId_type: { userId,type } }
        });
    },

    deleteTokenByType: async (token: string, type: LinkVerificationType) => {
        return prisma.linkVerification.delete({
            where: { type_token: { token, type } }
        });
    }  ,
    deleteOTPByType: async (userId:string, type: OTPVerificationType) => {
        return prisma.otpVerification.delete({
            where: { userId_type: { userId, type } }
        });
    }   
}

export default tokenRepository;


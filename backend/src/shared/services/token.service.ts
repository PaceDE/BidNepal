import { generateRandomToken } from "@/shared/utils/crypto.js";
import  tokenRepository  from "@/shared/repository/token.repository.js";
import { EmailVerificationType } from "@prisma/client";

const EMAIL_TOKEN_EXPIRY_MINUTES = 15;
const MAX_RETRIES = 5

const emailVerification = EmailVerificationType.EMAIL;

const tokenService = {
    
    generateEmailVerificationToken: async (userId: string): Promise<{ token: string, expiresIn: number }> => {
        for (let i = 0; i < MAX_RETRIES; i++) {
            try {
                const token = generateRandomToken(64);
                const expiresAt = new Date(
                    Date.now() + EMAIL_TOKEN_EXPIRY_MINUTES * 60 * 1000
                );

                await tokenRepository.updateEmailToken(userId, token,emailVerification, expiresAt);
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

    verifyEmailToken: async (token: string, type:EmailVerificationType): Promise<boolean> => {
        const record = await tokenRepository.findEmailTokenByType(token,type);

        if (!record) throw new Error("Invalid token");
        if (record.expiresAt < new Date()) throw new Error("The token is already expires. Please try again.");

        await tokenRepository.deleteEmailToken(token,type);
        return true;
    }
}

export default tokenService

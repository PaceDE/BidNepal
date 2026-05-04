import { generateRandomToken } from "@/shared/utils/crypto.js";
import emailService from "./email.service.js";
import tokenService from "./token.service.js"
import tokenRepository from "../repository/token.repository.js";

const sessionExpiresInMinutes = 15;
const verificationService = {

    initiateEmailVerification: async (userId: string, email: string) => {
        const { token, expiresIn } = await tokenService.generateEmailVerificationToken(userId);
        const link = `${process.env.APP_URL ?? "http://localhost:3000"}/verify-email?token=${token}`
        return await emailService.sendEmailVerification(email, link, expiresIn);
    },
    createSession: async (userId: string, email: string) => {
        const sessionId = generateRandomToken(64);
        return await tokenRepository.saveSessionToken(userId, sessionId, sessionExpiresInMinutes)
    }

}

export default verificationService;



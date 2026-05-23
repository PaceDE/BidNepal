
import { emailQueue } from "@/queue/emailQueue.js";
import { getVerifyEmailTemplate } from "../templates/verify-email.template.js";
import tokenService from "./token.service.js";

const emailService = {

  initiateEmailVerification: async (userId: string, email: string) => {
    const { token, expiresIn } = await tokenService.generateEmailVerificationToken(userId);
    const link = `${process.env.APP_URL ?? "http://localhost:3000"}/verify-email/confirm?token=${token}`
    return await emailService.sendEmailVerification(email, link, expiresIn);
  },

  sendEmailVerification: async (to: string, verificationlink: string, expiresIn: number) => {
    const mailOptions = {
      to,
      subject: 'Verify your email',
      content: getVerifyEmailTemplate(verificationlink, expiresIn)
    }
    return await emailQueue.add('email-verification', mailOptions)

  }
}

export default emailService
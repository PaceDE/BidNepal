
import { emailQueue } from "@/queue/emailQueue.js";
import { getVerifyEmailByLinkTemplate, getVerifyEmailByOTPTemplate } from "../templates/verify-email.template.js";
import tokenService from "./token.service.js";

const emailService = {

  initiateEmailVerificationByLink: async (userId: string, email: string) => {
    const { token, expiresIn } = await tokenService.generateEmailVerificationToken(userId);
    const link = `${process.env.APP_URL ?? "http://localhost:3000"}/verify-email/confirm?token=${token}`
    return await emailService.sendEmailVerificationLink(email, link, expiresIn);
  },

  initiateEmailVerificationByOTP: async (userId: string, email: string) => {
    const { token, expiresIn } = await tokenService.generateEmailVerificationOTP(userId);
    await emailService.sendEmailVerificationOTP(email,token, expiresIn);
    return expiresIn;
  },

  sendEmailVerificationLink: async (to: string, verificationlink: string, expiresIn: number) => {
    const mailOptions = {
      to,
      subject: 'Verify your email',
      content: getVerifyEmailByLinkTemplate(verificationlink, expiresIn)
    }
    return await emailQueue.add('email-verification', mailOptions)
  },
  sendEmailVerificationOTP: async (to: string, otp: string, expiresIn: number) => {
    const mailOptions = {
      to,
      subject: 'Verify your email',
      content: getVerifyEmailByOTPTemplate(otp, expiresIn)
    }
    return await emailQueue.add('email-verification', mailOptions)
  }
}

export default emailService
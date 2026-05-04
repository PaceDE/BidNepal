
import { emailQueue } from "@/queue/emailQueue.js";
import { getVerifyEmailTemplate } from "../templates/verify-email.template.js";

const emailService = {
  
  sendEmailVerification: async(to:string, verificationlink:string, expiresIn:number) =>{
    const mailOptions={
      to,
      subject:'Verify your email',
      content: getVerifyEmailTemplate(verificationlink,expiresIn)
    }
    return await emailQueue.add('email-verification',mailOptions)

  }
}

export default emailService
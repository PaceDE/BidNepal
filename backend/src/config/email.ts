import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.MAIL_PORT || "587"),
  secure: false,
  auth: {
    user: process.env.GMAIL_APP_EMAIL,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

// Verify connection asynchronously without blocking module load
async function verifyMailer() {
  try {
    await transporter.verify();
    console.log("Mail transporter is ready");
  } catch (err) {
    console.error("Mailer failed:", err);
  }
}

verifyMailer();

export default transporter;
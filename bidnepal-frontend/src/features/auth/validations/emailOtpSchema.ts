import { z } from "zod";
export const emailOTPSchema = z.string().regex(/^\d{8}$/,"Invalid OTP")
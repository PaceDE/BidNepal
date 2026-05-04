import { z } from "zod";

export const createUserSchema = z.object({
    email: z.email("Invalid email address"),
    password: z.string()
        .min(8, "Password must be at least 8 characters long")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(/[0-9]/, "Password must contain at least one number")
        .max(22, "Password must be at most 22 characters long"),
    firstName: z.string().min(2, "First name is required"),
    lastName: z.string().min(2, "Last name is required"),
    country: z.string("Country is required"),
    phone: z.string().min(1, "Phone number is required")

})
import { z } from "zod";

export const createUserSchema = z.object({
    email: z.email("Invalid email address"),
    password: z.string("Password is required")
        .min(8, "Password must be at least 8 characters long")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(/[0-9]/, "Password must contain at least one number")
        .max(22, "Password must be at most 22 characters long"),
    firstName: z.string("First name is required")
        .nonempty("First name is required")
        .min(2, "First name must be at least 2 characters"),
    lastName: z.string()
        .min(2, "Last name must be at least 2 characters")
        .optional()
        .or(z.literal("")),
    country: z.string("Country is required")
        .min(1, "Country is required"),
    phone: z.string("Phone number is required")
        .min(1, "Phone number is required")
})
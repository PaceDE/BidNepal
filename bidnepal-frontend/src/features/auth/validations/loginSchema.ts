import { z } from "zod";

export const loginSchema = z.object({
    email: z
        .string()
        .trim()
        .nonempty("Email is required"),
    password: z.string()
        .trim()
        .nonempty("Password is required")
})
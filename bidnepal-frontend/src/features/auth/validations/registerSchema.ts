import { isValidPhoneNumber } from "libphonenumber-js";
import { z } from "zod";

export const registerSchema = z.object({
    email: z
        .string()
        .trim()
        .min(1, "Email is required")
        .email("Invalid email format"),
    password: z.string()
        .nonempty("Password is required")
        .min(8, "Password must be at least 8 characters long")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(/[0-9]/, "Password must contain at least one number")
        .max(22, "Password must be at most 22 characters long"),
    confirmPassword: z.string()
        .nonempty("Confirm Password is required"),

    firstName: z.string()
        .nonempty("First name is required")
        .min(2, "First name must be at least 2 characters"),
    lastName: z.string()
        .nonempty("Last name is required")
        .min(2, "Last name must be at least 2 characters"),
    // country: z.string()
    //     .min(1, "Country is required"),
    phone: z.string()
        .min(1, "Phone number is required")
        .refine((value) => isValidPhoneNumber(value),{
            message: "Invalid phone number"
        }),
    country: z.string()
        .min(1, "Country is required"),
    countryCode: z.string()
        .min(1, "Country code is required"),
    termsAndConditions: z.boolean()
        .refine(value => value === true, {
            message: "You must accept the terms and conditions"
        })
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"]
});
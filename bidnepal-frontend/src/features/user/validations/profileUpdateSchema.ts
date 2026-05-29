import { isValidPhoneNumber } from "libphonenumber-js";
import { z } from "zod";

export const profileUpdateSchema = z.object({
    email: z
        .string()
        .trim()
        .min(1, "Email is required")
        .email("Invalid email format"),
    firstName: z.string()
        .nonempty("First name is required")
        .min(2, "First name must be at least 2 characters"),
    lastName: z.string()
        .min(2, "Last name must be at least 2 characters")
        .or(z.literal("")),
    phone: z.string()
        .min(1, "Phone number is required")
        .refine((value) => isValidPhoneNumber(value),{
            message: "Invalid phone number"
        }),
    country: z.string()
        .min(1, "Country is required"),
    countryCode: z.string()
        .min(1, "Country code is required"), 
})
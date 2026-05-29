import { z } from "zod";

export const updateProfileSchema = z.object({
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
});

export type UpdateProfileDTO = z.infer<typeof updateProfileSchema>;

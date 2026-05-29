import z from "zod";
import { profileUpdateSchema } from "./validations/profileUpdateSchema";

export interface User {
    id: string;
    email: string;
    role: string;
    userStatus: string;
    emailVerified: boolean;
    phoneVerified: boolean;
    firstName: string | null;
    lastName: string | null;
    avatar: string | null;
    phone: string | null;
    country: string | null
    firstLogin: boolean;
    profileSetup: boolean;
}

export type profileUpdateForm = z.infer<typeof profileUpdateSchema>

export interface profileUpdateDTO  {
    firstName: string 
    lastName: string
    phone: string 
    country: string
}

export type ProfileResponse = User;

export type UpdateAvatarResponse = {
    avatar: string;
}
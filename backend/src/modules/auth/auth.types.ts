import type { Prisma } from "@prisma/client";
import z from "zod";
import type { createUserSchema } from "./auth.validations.js";

export type UserWithProfile = Prisma.UserGetPayload<{
    include: {
        profile: true;
    };
}>;

export type CreateUserDTO = z.infer<typeof createUserSchema>

export interface LoginDTO {
    email: string;
    password: string;
}

export interface LoginResponseDTO {
    accessToken: string;
    user: {
        id:string;
        firstName: string | null;
        email: string;
        role: string;
        avatar: string | null;
        userStatus: string;
        emailVerified: boolean;
        phoneVerified: boolean;
        firstLogin: boolean;
        profileSetup: boolean;
    }
}

export interface googleLoginPayload {
    googleId: string,
    email:string,
    firstName:string | null;
    lastName:string | null;
    avatar:string | null
} 
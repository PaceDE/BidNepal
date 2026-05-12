import type { Prisma } from "@prisma/client";

export type UserWithProfile = Prisma.UserGetPayload<{
    include: {
        profile: true;
    };
}>;

export interface CreateUserDTO {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    country: string;
    phone: string;
}

export interface LoginDTO {
    email: string;
    password: string;
}

export interface LoginResponseDTO {
    accessToken: string;
    user: {
        firstName: string | null;
        email: string;
        role: string;
        userStatus: string;
        emailVerified: boolean;
        phoneVerified: boolean;
    }
}
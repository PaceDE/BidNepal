import type {  UserWithProfile } from "../auth/auth.types.js";
import type { ProfileResponseDTO } from "./user.types.js";

export function toProfileDTO(user:UserWithProfile): ProfileResponseDTO {
    return {
            id:user?.id,
            email: user.email,
            role: user.role,
            userStatus: user.status,
            emailVerified: user.emailVerified,
            phoneVerified: user.phoneVerified,
            firstName: user?.profile?.firstName ?? null,
            lastName: user?.profile?.lastName ?? null,
            avatar: user?.profile?.avatar ?? null,
            phone: user?.profile?.phone ?? null,
            country: user?.profile?.country ?? null,
            firstLogin:user?.profile?.firstLogin ?? true,
            profileSetup:user?.profile?.profileSetup ?? false, 
    }
}
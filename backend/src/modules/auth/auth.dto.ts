import type { LoginResponseDTO, UserWithProfile } from "./auth.types.js";

export function toLoginDTO(accessToken:string,user:UserWithProfile): LoginResponseDTO {
    return {
        accessToken,
        user:{
            id:user?.id,
            firstName: user?.profile?.firstName ?? null,
            email: user.email,
            role: user.role,
            avatar: user?.profile?.avatar ?? null,
            userStatus: user.status,
            emailVerified: user.emailVerified,
            phoneVerified: user.phoneVerified,
            firstLogin:user?.profile?.firstLogin ?? true,
            profileSetup:user?.profile?.profileSetup ?? false,
        }   
    }
}
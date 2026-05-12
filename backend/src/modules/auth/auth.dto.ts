import type { LoginResponseDTO, UserWithProfile } from "./auth.types.js";

export function toLoginDTO(accessToken:string,user:UserWithProfile): LoginResponseDTO {
    return {
        accessToken,
        user:{
            firstName: user.profile?.firstName ?? null,
            email: user.email,
            role: user.role,
            userStatus: user.status,
            emailVerified: user.emailVerified,
            phoneVerified: user.phoneVerified
        }   
    }
}
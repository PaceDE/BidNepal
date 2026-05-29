export interface ProfileResponseDTO {
        id:string;
        email: string;
        role: string;
        userStatus: string;
        emailVerified: boolean;
        phoneVerified: boolean;
        firstName:string | null;
        lastName:string | null;
        avatar: string | null;
        phone: string | null;
        country:string | null
        firstLogin: boolean;
        profileSetup: boolean;
}

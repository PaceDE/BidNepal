import  userService  from "@/modules/auth/auth.services.js";
import verificationService from "@/shared/services/verification.service.js";
import type { CreateUserDTO, CreateUserResponseDTO } from "@/modules/auth/auth.types.js"

const AuthOrchestrator = {
    registerFlow: async (data: CreateUserDTO): Promise<{
        user: CreateUserResponseDTO,
        session: {
            sessionId: string;
            expiresAt: Date;
            userId: string;
        }
    }> => {
        const user = await userService.registerUser(data);

        const session = await verificationService.createSession(user.id, user.email);

        try {
            await verificationService.initiateEmailVerification(user.id, user.email);
        } catch (err: any) {
            console.error("Failed to create Email Verification Link", err)
        }

        return { user, session }
    }
}
export default AuthOrchestrator;
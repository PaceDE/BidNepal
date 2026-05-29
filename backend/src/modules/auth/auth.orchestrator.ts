import userService from "@/modules/auth/auth.services.js";
import type { CreateUserDTO, LoginDTO } from "@/modules/auth/auth.types.js"
import sessionService from "@/shared/services/session.service.js";
import emailService from "@/shared/services/email.service.js";
import authService from "@/modules/auth/auth.services.js";
import tokenService from "@/shared/services/token.service.js";
import { AppError } from "@/shared/errors/AppError.js";
import userRepository from "../user/user.repository.js";
import { SessionType } from "@prisma/client";
import tokenRepository from "@/shared/repository/token.repository.js";
import sessionRepository from "@/shared/repository/session.repository.js";

const refreshTokenExpiryInMinutes = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds

const authOrchestrator = {
    registerFlow: async (data: CreateUserDTO): Promise<{
        sessionId: string;
        expiresAt: Date;
        userId: string;
    } | void> => {

        const existingUser = await userRepository.findUserByEmail(data.email);

        if (existingUser) {
            if(existingUser.password)
                throw new AppError("Email already in use", 422);

            await userService.registerUser(data);
            return;
        } 
        
        const user = await userService.registerUser(data);

        const session = await sessionService.savependingVerificationSession(user.id, user.email);

        try {
            await emailService.initiateEmailVerificationByLink(user.id, user.email);
        } catch (err: any) {
            console.error("Failed to create Email Verification Link", err)
        }

        return session;
    },

    loginFlow: async (data: LoginDTO) => {

        const user = await authService.validateUserCredentials(data.email, data.password);
        if (!user) throw new AppError("Invalid credentials", 401);
        const accessToken = tokenService.generateAccessToken(user);
        const refreshToken = tokenService.generateRefreshToken(user);

        await sessionService.saveAuthenticationSession(user.id, refreshToken, refreshTokenExpiryInMinutes);

        return { accessToken, refreshToken, user };

    },
    
    tokenRefreshFlow: async (token: string) => {

        const decoded = tokenService.verifyRefreshToken(token);
        const user = await userRepository.findUserById(decoded.id);
        if (!user)
            throw new AppError("Invalid token", 401, { clearCookie: ["_bn_refreshtoken"] });

        const accessToken = tokenService.generateAccessToken(user);
        const refreshToken = tokenService.generateRefreshToken(user);

        await sessionService.saveAuthenticationSession(user.id, refreshToken, refreshTokenExpiryInMinutes);

        await sessionService.deleteSessionByIdAndType(token, SessionType.AUTHENTICATION);

        return { user, accessToken, refreshToken };
    },

    googleLoginFlow: async (code: any) => {
        const { accessToken: _, idToken } = await authService.getGoogleToken(code);

        const payload = await authService.verifyAndGetUserInfo(idToken);

       
        if(!payload.email || !payload.sub)
            throw new AppError("Google Login Failed", 401);

        const data = {
            googleId:payload.sub, 
            email:payload.email, 
            firstName:payload.given_name ?? null, 
            lastName:payload.family_name ?? null, 
            avatar:payload.picture ?? null
        }

        const {user, accessToken, refreshToken} = await authService.googleLogin(data);

        await sessionService.saveAuthenticationSession(user.id, refreshToken, refreshTokenExpiryInMinutes);

        return {user, accessToken, refreshToken}
    }
}
export default authOrchestrator;
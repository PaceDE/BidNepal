import authRepository from "./auth.repository.js";
import userRepository from "@/modules/user/user.repository.js";
import type { CreateUserDTO, googleLoginPayload } from "@/modules/auth/auth.types.js";
import { createUserSchema } from "@/modules/auth/auth.validations.js"
import { AppError } from "@/shared/errors/AppError.js";
import { compareHash, hashValue } from "@/shared/utils/crypto.js";
import tokenService from "@/shared/services/token.service.js";
import oauthClient from "@/config/oauthClient.js";
import sessionService from "@/shared/services/session.service.js";
import { SessionType } from "@prisma/client";


const authService = {

    registerUser: async (user: CreateUserDTO) => {
        const hashedPassword = await hashValue(user.password);
        const userToCreate = {
            ...user,
            password: hashedPassword
        }
        const newUser = await authRepository.createUser(userToCreate);
        const userToReturn = {
            id: newUser.id,
            email: newUser.email,
        }

        return userToReturn;
    },

    registerGoogleLinkedUser: async (user: CreateUserDTO) => {
        const hashedPassword = await hashValue(user.password);
        const userToCreate = {
            ...user,
            password: hashedPassword
        }

    },

    validateUserCredentials: async (email: string, password: string) => {
        const user = await userRepository.findUserByEmail(email);
        if (!user || !user.password) throw new AppError("User not found", 404);

        const isMatch = await compareHash(password, user.password);
        if (!isMatch) throw new AppError("Invalid credentials", 401);

        return user;
    },
    restoreSession: async (refreshToken: string) => {

        const decoded = tokenService.verifyRefreshToken(refreshToken);
        const user = await userRepository.findUserById(decoded.id);
        if (!user)
            throw new AppError("Invalid token", 401)

        const accessToken = tokenService.generateAccessToken(user);

        return { user, accessToken };
    },

    validateCreateUserDTO: (data: CreateUserDTO) => {
        return createUserSchema.safeParse(data);
    },


    createGoogleLoginUrl: (url: URL,redirect:string) => {
       
        url.searchParams.set("client_id", process.env.GOOGLE_CLIENT_ID!);
        url.searchParams.set("redirect_uri", process.env.GOOGLE_REDIRECT_URI!);
        url.searchParams.set("response_type", "code");
        url.searchParams.set("scope", "openid email profile");
        url.searchParams.set("access_type", "offline");
        url.searchParams.set("prompt", "consent");
        
        if (redirect) 
            url.searchParams.set("state", redirect);
        return url;

    },

    getGoogleToken: async (code: any) => {
        const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
            method: 'POST',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
                code,
                client_id: process.env.GOOGLE_CLIENT_ID!,
                client_secret: process.env.GOOGLE_CLIENT_SECRET!,
                redirect_uri: process.env.GOOGLE_REDIRECT_URI!,
                grant_type: "authorization_code",
            })
        })

        if (!tokenResponse.ok) {
            throw new AppError(`Google Token error`, 400);
        }

        const tokens = await tokenResponse.json();
        const accessToken = tokens.access_token as string;
        const idToken = tokens.id_token as string;

        return { accessToken, idToken };
    },

    verifyAndGetUserInfo: async (idToken: string) => {
        try {

            const ticket = await oauthClient.verifyIdToken({
                idToken,
                audience: process.env.GOOGLE_CLIENT_ID!,
            })
            const payload = ticket.getPayload();
            if (!payload)
                throw new AppError("Goolge Login Failed", 401);
            return payload;
        } catch (err) {
            throw new AppError("Invalid login token", 401);
        }
    },

    getGoogleUserInfo: async (accessToken: string) => {
        const userResponse = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })
        const user = await userResponse.json();

        return user

    },

    googleLogin: async (data: googleLoginPayload) => {
        const { googleId, email, firstName, lastName, avatar } = data;

        let user = await userRepository.findUserByGoogleId(googleId);

        // Create User profile on first Google Login
        if (!user) {
            const emailExist = await userRepository.findUserByEmail(email);
            if (emailExist)
                user = await authRepository.updateUserWithGoogleId(email, googleId)

            else
                user = await authRepository.createUserWithProfile(data);
        }

        const accessToken = tokenService.generateAccessToken(user);
        const refreshToken = tokenService.generateRefreshToken(user);

        return { user, accessToken, refreshToken };
    }, 

    logout : async (token:string) => {
        await sessionService.deleteSessionByIdAndType(token,SessionType.AUTHENTICATION)
    },
    verifyEmail: async (userId: string) => {
        return authRepository.verifyEmail(userId);
    }


}

export default authService


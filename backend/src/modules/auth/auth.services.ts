import authRepository from "./auth.repository.js";
import userRepository from "@/modules/user/user.repository.js";
import type { CreateUserDTO } from "@/modules/auth/auth.types.js";
import { createUserSchema } from "@/modules/auth/auth.validations.js"
import { AppError } from "@/shared/errors/AppError.js";
import { compareHash, hashValue } from "@/shared/utils/crypto.js";
import tokenService from "@/shared/services/token.service.js";

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
    }
}

export default authService


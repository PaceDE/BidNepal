import userRepository from "@/modules/auth/auth.repository.js";
import type { CreateUserDTO, CreateUserResponseDTO } from "@/modules/auth/auth.types.js";
import { createUserSchema } from "@/modules/auth/auth.validations.js"
import { hashValue } from "@/shared/utils/crypto.js";
import verificationService from "@/shared/services/verification.service.js";

const userService = {
   
    registerUser: async (user: CreateUserDTO): Promise<CreateUserResponseDTO> => {
        const hashedPassword = await hashValue(user.password);
        const userToCreate = {
            ...user,
            password: hashedPassword
        }
        const newUser = await userRepository.createUser(userToCreate);
        const userToReturn = {
            id:newUser.id,
            email: newUser.email,
        }

        return userToReturn;
    },

    validateCreateUserDTO: (data: CreateUserDTO) => {
        return createUserSchema.safeParse(data);
    }
}

export default userService


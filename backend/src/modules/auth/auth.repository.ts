import { Prisma } from "@prisma/client";
import prisma from "@/shared/lib/prisma.js";
import type { CreateUserDTO, UserWithProfile } from "@/modules/auth/auth.types.js";

const authRepository = {
    createUser: async (user: CreateUserDTO) => {
        const { email, firstName, lastName, password, country, phone } = user;

        const newUser = await prisma.user.create({
            data: {
                email,
                password,
                profile: {
                    create: {
                        firstName,
                        lastName,
                        country,
                        phone
                    }
                },
            },
        });

        return newUser;
    }
}

export default authRepository;




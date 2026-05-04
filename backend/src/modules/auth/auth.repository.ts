import prisma from "@/shared/lib/prisma.js";
import type { CreateUserDTO } from "@/modules/auth/auth.types.js";

const userRepository = {
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
                verification: {
                    create: {}
                }
            },
            include: {
                profile: true,
                verification: true
            }
        });

        return newUser;
    },

    findUserByEmail: async (email: string) => {
        return prisma.user.findUnique({
            where: { email }
        })
    }
}

export default userRepository;




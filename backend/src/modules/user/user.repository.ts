import { Prisma } from "@prisma/client";
import prisma from "@/shared/lib/prisma.js";
import type { CreateUserDTO, UserWithProfile } from "@/modules/auth/auth.types.js";

const userRepository = {

    findUserById: async (id: string) => {
        return prisma.user.findUnique({
            where: { id },
            include: { profile: true }
        })

    },


    findUserByEmail: async (email: string) => {
        return prisma.user.findUnique({
            where: { email },
            include: { profile: true }
        })
    },

    findUserByGoogleId: async (id: string) => {
        return prisma.user.findUnique({
            where: { googleId: id },
            include: { profile: true }
        })
    }
}

export default userRepository;




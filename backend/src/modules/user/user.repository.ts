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
    },
    updateProfile: async (userId: string, data: { firstName: string; lastName?: string | null; country: string; phone: string }) => {
        const profileData = {
            firstName: data.firstName,
            lastName: data.lastName ?? null,
            country: data.country,
            phone: data.phone,
            profileSetup: true
        }

        return prisma.user.update({
            where: { id: userId },
            data: {
                profile: { update: profileData }
            },
            include: { profile: true }
        })
    },
    verifyEmail: async (userId: string) => {
        return prisma.user.update({
            where: { id: userId },
            data: {
                emailVerified: true
            },
            include: { profile: true }
        })
    },
    completeProfile: async (userId: string, avatarUrl: string | null, avatarId:string | null) => {
        return prisma.user.update({
            where: { id: userId },
            data: {
                profile: {
                    update: {
                        avatar:avatarUrl,
                        avatarId:avatarId,
                        firstLogin: false,
                    }
                }
            },
            include: { profile: true }
        })
    },
}

export default userRepository;




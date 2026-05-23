import { Prisma } from "@prisma/client";
import prisma from "@/shared/lib/prisma.js";
import type { CreateUserDTO, googleLoginPayload, UserWithProfile } from "@/modules/auth/auth.types.js";

const authRepository = {
    createUser: async (user: CreateUserDTO) => {
        const { email, firstName, lastName, password, country, phone } = user;

        const newUser = await prisma.user.upsert({
            where: { email },
            update: {
                password,
                profile: {
                    update: {
                        firstName, lastName, country, phone, profileSetup: true
                    }
                }
            },
            create: {
                email, password,
                profile: {
                    create: {
                        firstName, lastName, country, phone, profileSetup: true
                    }

                },
            }
        });

        return newUser;
    },

    createUserWithProfile: async (data: googleLoginPayload) => {
        const { email, googleId, firstName, lastName, avatar } = data;
        return await prisma.user.create({
            data: {
                email,
                googleId,
                emailVerified:true,
                profile: {
                    create: {
                        firstName,
                        lastName,
                        avatar
                    }
                },
            },
            include: {
                profile: true
            }
        })
    },

    updateUserWithGoogleId: async (email: string, googleId: string) => {
        return await prisma.user.update({
            where: { email },
            data: {
                googleId,
                emailVerified: true,

            },
            include: {
                profile: true
            }
        })
    }
}

export default authRepository;




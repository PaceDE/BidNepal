
import userRepository from "@/modules/user/user.repository.js";
import { AppError } from "@/shared/errors/AppError.js";
import { updateProfileSchema, type UpdateProfileDTO } from "@/modules/user/user.validations.js";
import cloudinary from "@/config/cloudinary.js";
import fileService from "@/shared/services/file.services.js";
import type { UploadApiResponse } from "cloudinary";

const userService = {
    getProfile: async (id:string) => {
        const user = await userRepository.findUserById(id)
        if(!user)
            throw new AppError("User not found",404);
         return user;
    },
    
    validateUpdateProfileDTO: (data: any) => {
        return updateProfileSchema.safeParse(data);
    },

    updateProfile: async (id: string, data: UpdateProfileDTO) => {
        const user = await userRepository.findUserById(id);
        if (!user) throw new AppError("User not found", 404);

        const payload = { ...data, lastName: data.lastName ?? null };

        const updated = await userRepository.updateProfile(id, payload);
        return updated;
    },
    completeProfile: async (id: string, buffer: Buffer | undefined) => {
        const user = await userRepository.findUserById(id);
        if (!user) throw new AppError("User not found", 404);

        let result: UploadApiResponse | null = null;

        if(buffer){
            result = await fileService.uploadFile(buffer);
        }
        const userUpdated = await userRepository.completeProfile(id, result?.secure_url || null, result?.public_id || null);
        return userUpdated;
    }
}

export default userService


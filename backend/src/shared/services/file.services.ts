import { uploadToCloudinary } from "@/shared/services/cloudinary.services.js";

const fileService = {
    uploadFile: async (buffer:Buffer) => {
        const result = await uploadToCloudinary(buffer, "images");
        return result;
    }
}

export default fileService;
import { clientFetch } from "@/shared/lib/api/clientFetch";
import { ProfileResponse, profileUpdateDTO, UpdateAvatarResponse } from "../user.types";

export const userApi = {

    getProfile: () =>
        clientFetch<ProfileResponse>("/user/profile")
    ,
    updateProfile:(data:profileUpdateDTO) => 
        clientFetch<ProfileResponse>("/user/profile",{
            method:"POST",
            body:JSON.stringify(data)
        })
    ,
    completeProfile: (formData?: FormData) => {
        return clientFetch<ProfileResponse>("/user/profile/complete", {
            method: "POST",
            ...(formData ? { body: formData } : {})
        });
    }
}
"use client"
import { useMutation, useQuery } from "@tanstack/react-query";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { userApi } from "./user.api.client";
import { ProfileResponse, profileUpdateDTO, UpdateAvatarResponse } from "../user.types";
import { AUTH_STATUS } from "@/features/auth/auth.constants";
import { setAuthState, updateAvatar, updateUser } from "@/features/auth/auth.slice";
import { showNotification } from "@/features/toast/toast.thunk";
import { AuthResponse, AuthUser } from "@/features/auth/auth.types";
import { queryClient } from "@/shared/lib/query/queryClient";
import { useRouter, useSearchParams } from "next/navigation";

const PUBLIC_PATH = ['/login', '/register', '/verify-email'];


export function useProfile() {
    const { user } = useAppSelector(state => state.auth);
    return useQuery({
        queryKey: ["profile", user?.id],
        queryFn: () => userApi.getProfile(),
        staleTime: Infinity,
        gcTime: Infinity
    })
}

export function useUpdateProfile() {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const {get} = useSearchParams();
    const redirect = get("next")
    const path = `/verify/email${redirect ? `?next=${encodeURIComponent(redirect)}` : ""}`

    return useMutation({
        mutationFn: (data: profileUpdateDTO) => userApi.updateProfile(data),
        onSuccess: (data: ProfileResponse) => {
            const authData: AuthUser = {
                id: data.id,
                firstName: data.firstName,
                email: data.email,
                role: data.role,
                avatar: data.avatar,
                userStatus: data.userStatus,
                emailVerified: data.emailVerified,
                phoneVerified: data.phoneVerified,
                firstLogin: data.firstLogin,
                profileSetup: data.profileSetup
            }
            dispatch(updateUser(authData));
            dispatch(showNotification({ message: "Profile Updated Successfully", type: "success" }))
            queryClient.setQueryData(["profile", data.id], data);
            router.replace(path)
        },
    })
}

export function useCompleteProfile() {
    const dispatch = useAppDispatch();
    const {get} = useSearchParams();
    const redirect = get("next") || "/";
    const router = useRouter();
    return useMutation({
        mutationFn: (formData?: FormData) => userApi.completeProfile(formData),
         onSuccess: (data: ProfileResponse) => {
            const authData: AuthUser = {
                id: data.id,
                firstName: data.firstName,
                email: data.email,
                role: data.role,
                avatar: data.avatar,
                userStatus: data.userStatus,
                emailVerified: data.emailVerified,
                phoneVerified: data.phoneVerified,
                firstLogin: data.firstLogin,
                profileSetup: data.profileSetup
            }
            dispatch(updateUser(authData));
            dispatch(showNotification({ message: "Welcome to BidNepal!", type: "success" }))
            queryClient.setQueryData(["profile", data.id], data);
            router.replace(redirect);
        }
    });
}

"use client"
import { useMutation, useQuery } from "@tanstack/react-query";
import { authApi } from "./auth.api.client";
import { LoginDto, RegisterDto } from "../auth.types";
import { useAppDispatch } from "@/redux/hook";
import { setAuthState } from "../auth.slice";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { queryClient } from "@/shared/lib/query/queryClient";

const PUBLIC_PATH = ['/login','/register','/verify-email'];

// LOGIN
export function useLogin() {
    const dispatch = useAppDispatch();

    return useMutation({
        mutationFn: (data: LoginDto) => authApi.login(data),
        onSuccess: (data) => {
            dispatch(setAuthState(data));
        },

    })
}

// REGISTER
export function useRegister() {
    return useMutation({
        mutationFn: (data: RegisterDto) => authApi.register(data),
    })
}

// LOGOUT
export function useLogout() {
    return useMutation({
        mutationFn: () => authApi.logout(),
        onSuccess: () => {
            window.location.replace('/login');
        },
        onError: () => {
            window.location.replace('/login');
        }
    })
}

// ME to hydrae the auth state when page reload.
export function useGetMe() {
    const dispatch = useAppDispatch();
    const pathname = usePathname();
    
    const skip = PUBLIC_PATH.some(path => pathname.startsWith(path));

    const query = useQuery({
        queryKey: ['me'],
        queryFn: () => authApi.getMe(),
        enabled:!skip,
        staleTime: Infinity,
        gcTime: Infinity,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        retry: false
    });

    useEffect(() => {
        if (query?.data)
            dispatch(setAuthState(query.data))

    }, [query?.data])
    return query;
}

export function prefetchMe() {
    return queryClient.prefetchQuery({
    queryKey: ['me'],
    queryFn: authApi.getMe,
    staleTime: Infinity,
    gcTime: Infinity
  });
}

export function useResendEmailVerification() {
    return useMutation({
        mutationFn: () => authApi.resendEmailVerification(),
    })
}

export function useEmailVerification(token:string) {
    const query = useQuery({
        queryKey:["verify-email"],
        queryFn: () => authApi.verifyEmailVerification(token),
        staleTime:0,
        gcTime:0
    })
    return query
}


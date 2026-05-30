"use client"
import { useMutation, useQuery } from "@tanstack/react-query";
import { authApi } from "./auth.api.client";
import { AuthUser, LoginDto, RegisterDto } from "../auth.types";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { setAuthState } from "../auth.slice";
import { useRouter, useSearchParams } from "next/navigation";
import { AUTH_STATUS } from "../auth.constants";
import { prefetchCsrf, removeCsrf } from "@/shared/lib/csrf/csrf";
import { showNotification } from "@/features/toast/toast.thunk";

// LOGIN
export function useLogin() {
    const dispatch = useAppDispatch();
    const router = useRouter();

    const {get} = useSearchParams();
    const redirect = get('next') || '/';

    return useMutation({
        mutationFn: (data: LoginDto) => authApi.login(data),
        onSuccess: (data) => {
            dispatch(setAuthState({data,status:AUTH_STATUS.AUTHENTICATED}));
            removeCsrf();
            prefetchCsrf();
            dispatch(showNotification({ message: "Login Successful", type: "success" }))
            router.replace(redirect);
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
            window.location.replace(`/login?reason=${encodeURIComponent("logged_out")}`)
        },
        onError: () => {
            window.location.replace(`/login?reason=${encodeURIComponent("logged_out")}`)
        }
    })
}

export function useResendEmailVerification() {
    return useMutation({
        mutationFn: () => authApi.resendEmailVerification(),
    })
}

export function useSendEmailVerificationOtp() {
    const dispatch = useAppDispatch();

    return useMutation({
        mutationFn: authApi.sendEmailVerificationOtp,

        onSuccess: () => {
            dispatch(
                showNotification({
                    message: "Email Verification OTP sent successfully",
                    type: "success",
                })
            );
        },
    });
}

export function useVerifyEmailOtp() {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const data = useAppSelector(state => state.auth);
     const {get} = useSearchParams();
    const redirect = get("next") 
    const path = `/welcome${redirect ? `?next=${encodeURIComponent(redirect)}` : ""}`

    return useMutation({
        mutationFn: (otp:string) => authApi.verifyEmailVerificationOtp(otp),
        onSuccess: ()=>{
            dispatch(showNotification({message:"Email Verified succesfully",type:"success"}))
            router.replace(path);
            dispatch(setAuthState({
                data:{
                    user:{...data.user as AuthUser,emailVerified:true}, accessToken:data.accessToken as string
                },
                status:AUTH_STATUS.AUTHENTICATED
                }
            ))}
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

// ME to hydrae the auth state when page reload.
// export function useGetMe() {
//     const dispatch = useAppDispatch();
//     const pathname = usePathname();
    
//     const skip = PUBLIC_PATH.some(path => pathname.startsWith(path));

//     const query = useQuery({
//         queryKey: ['me'],
//         queryFn: () => authApi.getMe(),
//         enabled:!skip,
//         staleTime: Infinity,
//         gcTime: Infinity,
//         refetchOnWindowFocus: false,
//         refetchOnReconnect: false,
//         retry: false
//     });

//     useEffect(() => {
//         if (query?.data)
//             dispatch(setAuthState({data:query.data, status:AUTH_STATUS.AUTHENTICATED}))

//     }, [query?.data])
//     return query;
// }

// export function prefetchMe() {
//     return queryClient.prefetchQuery({
//     queryKey: ['me'],
//     queryFn: authApi.getMe,
//     staleTime: Infinity,
//     gcTime: Infinity
//   });
// }



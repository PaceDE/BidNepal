import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "@/lib/query/queryClient";
import { authApi } from "./auth.api";
import { LoginDto, RegisterDto } from "../types";
import { useAppDispatch } from "@/redux/hook";
import { loginSuccess } from "../slices/auth.slice";

// LOGIN
export function useLogin() {
    const dispatch = useAppDispatch();

    return useMutation({
        mutationFn: (data: LoginDto) => authApi.login(data),
        onSuccess: (response) => {
            // Update the auth state in Redux
            dispatch(loginSuccess(response));
        }
    })
}

// REGISTER
export function useRegister() {
    return useMutation({
        mutationFn: (data: RegisterDto) => authApi.register(data)
    })
}

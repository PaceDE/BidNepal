import { clientFetch } from "@/shared/lib/api/clientFetch";
import { LoginDto, AuthResponse, RegisterDto, RegisterResponse, getVerificationSessionResponse } from "../auth.types";
import { serverFetch } from "@/shared/lib/api/serverFetch";

export const authApi = {
    login: (data: LoginDto) =>
        clientFetch<AuthResponse>("/auth/login", {
            method: "POST",
            body: JSON.stringify(data),
            sendAuth: false,
            refreshOn401: false,
        }),

    register: (data: RegisterDto) =>
        clientFetch<RegisterResponse>("/auth/register", {
            method: "POST",
            body: JSON.stringify(data),
            sendAuth: false,
            refreshOn401: false,
        }),

    logout: () =>
        clientFetch("/auth/logout", {
            method: 'POST',
            sendAuth: true,
            refreshOn401: false,
        }),

    getMe: () =>
        clientFetch<AuthResponse>("/auth/me", {
            cache: 'no-store'
        }),
    
    resendEmailVerification: () =>
        clientFetch("/auth/resend-email-verification", {
            method: 'POST',
            sendAuth: false,
            refreshOn401: false,
        }),
    verifyEmailVerification: (token:string) =>
        clientFetch(`/auth/verify-email/confirm?token=${token}`, {
            refreshOn401: false,
        }),   
}
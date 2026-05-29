import { clientFetch } from "@/shared/lib/api/clientFetch";
import { LoginDto, AuthResponse, RegisterDto, RegisterResponse, getVerificationSessionResponse, SendEmailOTPResponse } from "../auth.types";

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
        clientFetch("/auth/email/link/send", {
            method: 'POST',
            sendAuth: false,
            refreshOn401: false,
        }),
    verifyEmailVerification: (token: string) =>
        clientFetch(`/auth/email/link/verify?token=${token}`, {
            refreshOn401: false,
        }),
    sendEmailVerificationOtp: () =>
        clientFetch<SendEmailOTPResponse>("/auth/email/otp/send",{
            method: 'POST'
        }),
    
    verifyEmailVerificationOtp: (otp: string) =>
        clientFetch(`/auth/email/otp/verify`, {
            method: 'POST',
            body: JSON.stringify({otp})
        }),
}
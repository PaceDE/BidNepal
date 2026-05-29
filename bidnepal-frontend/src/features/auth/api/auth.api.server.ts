import { AuthResponse, getVerificationSessionResponse } from "../auth.types";
import { serverFetch } from "@/shared/lib/api/serverFetch";

export const authApi = {
    getVerificationSession: (): Promise<getVerificationSessionResponse> =>
        serverFetch("/auth/verification-session", {
            method: 'GET',
            cache: 'no-store'
        }),

    verifyEmailConfirmation: (token: string) =>
        serverFetch(`/auth/email/linl/verify?token=${token}`, {
            method: 'GET',
            cache: 'no-store'
        }),
    getMe: () =>
        serverFetch<AuthResponse>("/auth/me", {
            cache: 'no-store'
        })
}
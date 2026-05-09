import { fetcher } from "@/lib/api/clientFetch";
import { LoginDto, LoginResponse, RegisterDto, RegisterResponse } from "../types";

export const authApi = {
    login: (data: LoginDto) =>
        fetcher<LoginResponse>("/auth/login", {
            method: "POST",
            body: JSON.stringify(data),
        }),

    register: (data: RegisterDto) =>
        fetcher<RegisterResponse>("/auth/register", {
            method: "POST",
            body: JSON.stringify(data),
        }),
};
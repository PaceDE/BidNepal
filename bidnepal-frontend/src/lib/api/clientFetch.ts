import { useAppSelector } from "@/redux/hook";
import { ApiError } from "./error";
import { get } from "http";
import { getToken } from "@/redux/token";

export interface FetchOptions extends RequestInit {
    skipAuth?: boolean;
}

export async function fetcher<T>(
    url: string,
    options: FetchOptions = {}
): Promise<T> {


    const {skipAuth = false,...fetchOptions} = options;
    const token = getToken();
    
    const hasJsonBody =
        fetchOptions.body &&
        !(fetchOptions.body instanceof FormData);

    const headers: HeadersInit = {
        ...(hasJsonBody
            ? { "Content-Type": "application/json" } : {}
        ),
        ...(token && !skipAuth
            ? { Authorization: `Bearer ${token}` } : {}
        ),
        ...(fetchOptions?.headers || {}),
    };

    const response = await fetch(`/api${url}`, {
        ...fetchOptions,
        headers,
    });
    const result = await response.json().catch(() => null);

    if (!response.ok || result?.success === false) {
        throw new ApiError(
            result?.message || "Something went wrong",
            response.status,
            result?.errors
        );
    }

    console.log("API Response:", result);

    return result.data as T;
}
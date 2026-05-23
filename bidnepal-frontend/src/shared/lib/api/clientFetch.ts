import { getCsrfHeader } from "../csrf/csrf";
import { fetchCsrf } from "../csrf/fetchCsrf";
import { queryClient } from "../query/queryClient";
import { ApiError } from "./error";
import { getAccessToken, setAccessToken } from "@/shared/utils/token";

export interface FetchOptions extends RequestInit {
    sendAuth?: boolean;
    refreshOn401?: boolean;
    skipCredentials?: boolean;
    CSRF?: boolean
}


// Refresh state global
let isRefreshing = false;

// Queue for pending requests while token is being refreshed
let waitingQueue: {
    resolve: (token: string) => void,
    reject: (err: unknown) => void
}[] = []

function flushQueue(error?: unknown, token?: string) {
    waitingQueue.forEach(({ resolve, reject }) => {
        if (error) reject(error);
        else if (token) resolve(token);
    });

    waitingQueue = [];
}

// Token refresh function
async function refreshAccessToken(): Promise<string> {
    let response: Response;
    try {
        response = await fetch('/api/auth/refresh', {
            method: 'POST',
            credentials: 'include',
        });
    } catch {
        throw new ApiError('Network error during token refresh', 500);
    }

    const result = await response.json().catch(() => null);

    if (!response.ok) throw new ApiError('Refresh failed', response.status);

    const newAccessToken = result?.data?.accessToken;
    if (!newAccessToken) throw new ApiError('Invalid refresh response', 500);

    setAccessToken(newAccessToken);
    return newAccessToken;
}


// Main fetcher function
export async function clientFetch<T>(
    url: string,
    options: FetchOptions = {}
): Promise<T> {

    const { sendAuth = true, refreshOn401 = true, CSRF = true, skipCredentials = false, ...fetchOptions } = options;

    const method = fetchOptions.method || "GET";

    const needCSRF = CSRF && !["GET", "HEAD"].includes(method)
    
    
    const csrfHeaders = needCSRF ? await getCsrfHeader() : {}


    function buildHeaders(token: string | null): HeadersInit {
        const hasJsonBody = fetchOptions.body && !(fetchOptions.body instanceof FormData);
        return {
            ...(hasJsonBody ? { 'Content-Type': 'application/json' } : {}),
            ...(token && sendAuth ? { Authorization: `Bearer ${token}` } : {}),
            ...csrfHeaders,
            ...(fetchOptions.headers || {}),
        };
    }


    async function executeRequest(token: string | null): Promise<Response> {
        try {
            return await fetch(`/api${url}`, {
                ...fetchOptions,
                credentials: skipCredentials ? "omit" : "include",
                headers: buildHeaders(token),
            });
        } catch {
            throw new ApiError("Network error. Please try again.", 500);
        }
    }

    const accessToken = sendAuth ? getAccessToken() : null;

    // Initial request with current token (if sendAuth is true)
    let response = await executeRequest(accessToken);

    // 401 error then refresh token
    if (response.status === 401 && refreshOn401) {
        let newToken: string;

        if (isRefreshing) {
            newToken = await new Promise<string>((resolve, reject) => {
                waitingQueue.push({ resolve, reject })
            });
        } else {
            isRefreshing = true;
            try {
                newToken = await refreshAccessToken();
                isRefreshing = false;
                flushQueue(undefined, newToken);
            } catch (err) {
                isRefreshing = false;
                flushQueue(err);
                throw new ApiError("Session expired. Please log in again.", 401);
            }
        }

        // retry original request with new token
        response = await executeRequest(newToken);
    }

    const result = await response.json().catch(() => null);

    // Non-401 error
    if (!response.ok) {
        throw new ApiError(
            result?.message || 'Something went wrong',
            response.status,
            result?.errors
        );
    }

    return result.data as T;
}
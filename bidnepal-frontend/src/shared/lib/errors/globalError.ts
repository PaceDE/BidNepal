import { AppDispatch } from "@/redux/store";
import { ApiError } from "../api/error";
import { showNotification } from "@/features/toast/toast.thunk";
import { setAuthState } from "@/features/auth/auth.slice";
import { AUTH_STATUS } from "@/features/auth/auth.constants";

const authRoutes = ["/login", "/register", "/forgot-password"];

function isApiError(error: unknown): error is ApiError {
    return error instanceof ApiError;
}
function dispatchApiErrors(error: unknown, dispatch: AppDispatch) {
    const apiError = isApiError(error)
    if (apiError && error.errors) {
        Object.values(error.errors).forEach((errMessages) => {
            errMessages.forEach((msg) => {
                dispatch(showNotification({ type: "error", message: msg }));
            });
        });
    } else {
        dispatch(showNotification({
            type: "error",
            message: apiError ? error.message ?? "An unexpected error occurred. Please try again." : "An unexpected error occurred. Please try again."
        }));
    }
}

export function handleApiError(error: unknown, dispatch: AppDispatch) {
    const isApiErr = isApiError(error);
    const status = isApiErr ? error.status : null;
    const pathname = window.location.pathname;

    if (status === 401) {
        if (authRoutes.some(route => pathname.startsWith(route)))
            dispatch(showNotification({ type: "error", message: "Invalid credentials. Please try again." }));
        else {
             dispatch(setAuthState({data:null,status:AUTH_STATUS.EXPIRED}))
        }
    } else if (status === 403) {
        window.location.replace('/forbidden');
    } else {
        dispatchApiErrors(error,dispatch)
    }
}
import { AppDispatch } from "@/redux/store";
import { ApiError } from "../api/error";
import { showNotification } from "@/features/toast/toast.thunk";

const authRoutes = ["/login", "/register", "/forgot-password"];
const skipRedirectRoutes = [
    "/login", "/register", "/forgot-password",
    "/", "/about", "/contact", "/auction",
];

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
        if (authRoutes.includes(pathname))
            dispatch(showNotification({ type: "error", message: "Invalid credentials. Please try again." }));
        if (!skipRedirectRoutes.includes(pathname))
            window.location.replace(`/login?next=${encodeURIComponent(pathname)}&reason=session_expired`);
    } else if (status === 403) {
        window.location.replace('/forbidden');
    } else {
        dispatchApiErrors(error,dispatch)
    }
}
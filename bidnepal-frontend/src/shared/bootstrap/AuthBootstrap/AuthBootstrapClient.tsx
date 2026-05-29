"use client";

import { AUTH_STATUS } from "@/features/auth/auth.constants";
import { setAuthState } from "@/features/auth/auth.slice";
import { AuthResponse, AuthStatus } from "@/features/auth/auth.types";
import { showNotification } from "@/features/toast/toast.thunk";
import { useAppDispatch, useAppSelector } from "@/redux/hook"
import Loading from "@/shared/components/ui/molecules/Loading/Loading.compoent";
import { useEffect } from "react"

const AuthBootstrapClient = ({ children, data, status }: { children: React.ReactNode, data: AuthResponse | null, status: AuthStatus }) => {
    const dispatch = useAppDispatch();
    const { status: authStatus } = useAppSelector(state => state.auth);

    useEffect(() => {
        dispatch(setAuthState({ data, status }))
        if (status === AUTH_STATUS.EXPIRED)
            dispatch(showNotification({ message: "The session has expired. Please login again.", type: 'info' }))
    }, []);

    if (authStatus === AUTH_STATUS.IDLE)
        return <Loading />

    return <>{children}</>;
}

export default AuthBootstrapClient
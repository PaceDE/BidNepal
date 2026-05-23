"use client";

import { AUTH_STATUS } from "@/features/auth/auth.constants";
import { setAuthState } from "@/features/auth/auth.slice";
import { AuthResponse } from "@/features/auth/auth.types";
import { showNotification } from "@/features/toast/toast.thunk";
import { useAppDispatch } from "@/redux/hook"
import { useEffect } from "react"

const AuthBootstrapClient = ({ data, status }: { data: AuthResponse | null, status: string }) => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(setAuthState({ data, status }))
        if(status === AUTH_STATUS.EXPIRED)
            dispatch(showNotification({message:"The session has expired. Please login again.", type:'info'}))
    })
    return null;
}

export default AuthBootstrapClient
"use client"

import { showNotification } from "@/features/toast/toast.thunk"
import { useAppDispatch } from "@/redux/hook";
import { useRouter } from "next/navigation";
import { useEffect } from "react"

const error = () => {

    const router = useRouter();
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(showNotification({
            type: 'error',
            message: 'Email Verification Session Expired. Please login and try again.'
        }));
        window.location.replace('/login');

    }, [])

   return null;
}

export default error

"use client"

import { showNotification } from "@/features/toast/toast.thunk"
import { useAppDispatch } from "@/redux/hook";
import { useRouter } from "next/navigation";
import { useEffect } from "react"

const Error = () => {

    const router = useRouter();
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(showNotification({
            type: 'error',
            message: 'Email Verification Session Expired. Please login and try again.'
        }));
        router.replace('/login');

    }, [dispatch, router])

   return null;
}

export default Error

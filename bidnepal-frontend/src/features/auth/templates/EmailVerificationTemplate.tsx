"use client"

import { useEffect } from "react"
import { useAppDispatch } from "@/redux/hook"
import { showNotification } from "@/features/toast/toast.thunk"
import { useRouter } from "next/navigation"

const EmailVerificationTemplate = ({ success, message = "Something went wrong. Please send new verification link." }: { success: boolean, message?: string }) => {
    const dispatch = useAppDispatch();
    const router = useRouter();

    useEffect(() => {
        if (success)
            dispatch(showNotification({ type: "success", message: "Email Verified Succesfully, please login to forward." }))
        else
            dispatch(showNotification({ type: "error", message }))

        window.location.replace('/login');
    }, [success])

    return null;
}

export default EmailVerificationTemplate
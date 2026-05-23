"use client";
import InputField from "@/shared/components/molecules/InputField.tsx/InputField.component";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Text from "@/shared/components/atoms/Text/Text.component";
import { loginSchema } from "../validations/loginSchema";
import { useLogin } from "../api/auth.hooks";
import { LoginDto, RegisterDto } from "../auth.types";
import { useRouter, useSearchParams } from "next/navigation";
import { RefObject, useEffect, useState } from "react";
import { showNotification } from "@/features/toast/toast.thunk";
import { useAppDispatch } from "@/redux/hook";
import { prefetchCsrf, removeCsrf } from "@/shared/lib/csrf/csrf";
import Button from "@/shared/components/atoms/Button";


const LoginForm = ({ authLockRef }: { authLockRef: RefObject<boolean> }) => {
    
    const [authLoading, setAuthLoading] = useState(false) // Need to call other sidefunction so isPending alone cannot track the auth state.
    const login = useLogin();
    const searchParams = useSearchParams();
    const dispatch = useAppDispatch();
    const redirect = searchParams.get('redirect') || '/';
    const reason = searchParams.get('reason');
    const router = useRouter();

    useEffect(() => {
        if (reason === 'login_required')
            dispatch(showNotification({
                type: 'info',
                message: 'Please login to continue'
            }));
        else if (reason === 'session_expired')
            dispatch(showNotification({
                type: 'info',
                message: 'Your session has expired. Please login again'
            }));
        else if(reason === 'registration_complete')
            dispatch(showNotification({ type: "success", message: "Registered Succesfully, You can now log in with email or Google." }))

    }, [reason])


    const { control, handleSubmit, formState: { errors }, setValue } = useForm({
        resolver: zodResolver(loginSchema),
        mode: "onChange",
        defaultValues: {
            email: "",
            password: ""
        }
    });

    const onSubmit = async (data: LoginDto) => {
        try {
            if(authLockRef.current) return;
            authLockRef.current = true;
            setAuthLoading(true); 
            await login.mutateAsync(data);
            
            removeCsrf();
            prefetchCsrf();

            dispatch(showNotification({ message: "Login Successful", type: "success" }))
            router.replace(redirect);
        } finally {  // Error handled in globalErrorHandler;
            authLockRef.current = false;
            setAuthLoading(false)
        }
    };

    return (

        <div>
            <form onSubmit={handleSubmit(onSubmit)} className="grid gap-x-2 gap-y-4">
                <InputField name="email" type="text" control={control} autoComplete="email" />
                <InputField name="password" type="password" control={control} />
                <div className="flex justify-end">
                    <Text variant="link" href="/register">Forgot Password?</Text>
                </div>

                <Button type="submit" disabled={authLockRef.current} className={`${authLockRef.current ? "bg-theme-dark!" : ""} py-3! rounded-md! mt-2`}>
                    {authLoading ? "Logging in" : "Login"}
                </Button>
            </form>
            <div className="flex gap-0.5 mt-4 justify-center">
                <Text variant="muted">Don't have an account?</Text>
                <Text variant="link" href="/register">Register</Text>
            </div>
        </div>
    )
}

export default LoginForm

"use client";
import InputField from "@/shared/components/molecules/InputField.tsx/InputField.component";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Text from "@/shared/components/atoms/Text/Text.component";
import { loginSchema } from "../validations/loginSchema";
import { useLogin } from "../api/auth.hooks";
import { LoginDto, RegisterDto } from "../types";


const LoginForm = () => {
    const login = useLogin();

    const { control, handleSubmit, formState: { errors }, setValue } = useForm({
        resolver: zodResolver(loginSchema),
        mode: "onChange",
        defaultValues: {
            email: "",
            password: ""
        }
    });

    const onSubmit = async (data: LoginDto) => {
        console.log(data);
        try{
            const result = await login.mutateAsync(data);
            console.log("Login successful:", result);

        } catch(error) {
            console.error("Login error:", error);
        }
    };

    return (

        <div>
            <form onSubmit={handleSubmit(onSubmit)} className="grid gap-x-2 gap-y-4">    
                <InputField name="email" type="text" control={control} autoComplete="email" />
                <InputField name="password" type="password" control={control}/>
                <div className="flex justify-end">
                     <Text variant="link" href="/register">Forgot Password?</Text>
                </div>

                <button type="submit" className="bg-theme text-white py-3 rounded-md mt-2">{login.isPending ? "Logging in" : "Login"}</button>
            </form>
            <div className="flex gap-0.5 mt-4 justify-center">
                <Text variant="muted">Don't have an account?</Text>
                <Text variant="link" href="/register">Register</Text>
            </div>
        </div>
    )
}

export default LoginForm

import InputField from "@/shared/components/molecules/InputField.tsx/InputField.component";
import PhoneField from "@/shared/components/molecules/PhoneField/PhoneField.component";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../validations/registerSchema";
import CheckboxField from "@/shared/components/molecules/CheckboxField/CheckboxField.component";
import Text from "@/shared/components/atoms/Text/Text.component";
import { useRegister } from "../api/auth.hooks";
import { useRouter } from "next/navigation";
import { RefObject } from "react";
import Button from "@/shared/components/atoms/Button";
import { useAppDispatch } from "@/redux/hook";
import { showNotification } from "@/features/toast/toast.thunk";

const RegisterForm = ({authLockRef}:{authLockRef:RefObject<boolean>}) => {

    const {mutateAsync, isPending} = useRegister();
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { control, handleSubmit, formState: { errors }, setValue } = useForm({
        resolver: zodResolver(registerSchema),
        mode: "onChange",
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            country: "Nepal",
            countryCode: "NP",
            password: "",
            confirmPassword: "",
            termsAndConditions: false
        }
    });

    const onSubmit = async(data: any) => {
        if(authLockRef.current) return;
        try{
            authLockRef.current = true;
            const { confirmPassword, termsAndConditions,countryCode, ...submitData } = data;
            await mutateAsync(submitData);
            dispatch(showNotification({message:"Registered Succesfully", type:"success"}))
            router.push('/verify-email');
        }finally {
            authLockRef.current = false;
        }
    };

    return (

        <div>
            <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 sm:grid-cols-2 gap-x-2 gap-y-4">
                <InputField name="firstName" type="text" control={control} autoComplete="given-name" />
                <InputField name="lastName" type="text" control={control} autoComplete="family-name" />
                <InputField name="email" type="text" control={control} className="sm:col-span-2" autoComplete="email" />
                <PhoneField name="phone" control={control} className="sm:col-span-2"
                    onCountryChange={(country) => {
                        setValue("country", country.name ?? "")
                        setValue("countryCode", country.countryCode ?? "")
                    }}
                />
                <InputField name="country" readOnly={true} control={control} className="sm:col-span-2"/>
                <InputField name="password" type="password" control={control}className="sm:col-span-2"/>
                <InputField name="confirmPassword" type="password" control={control}className="sm:col-span-2"/>
                <div className="sm:col-span-2">
                    <div className="flex items-center gap-2">
                        <CheckboxField name="termsAndConditions" control={control} showError={false} />
                        <Text variant="muted" className="text=xs">
                            I agree to the terms and conditions
                        </Text>
                    
                    </div>
                    {errors.termsAndConditions && (
                        <Text variant="error">
                            {errors.termsAndConditions.message}
                        </Text>
                       
                    )}
                </div>

                <Button type="submit" disabled={isPending || authLockRef.current} className={`${isPending || authLockRef.current ? "bg-theme-dark!" : ""} py-3! rounded-md! mt-2 sm:col-span-2`}>
                    {isPending ? "Registering" : "Register"}
                </Button>
            </form>
            <div className="flex gap-0.5 mt-4 justify-center">
                <Text variant="muted">Already have an account?</Text>
                <Text variant="link" href="/login">Sign in</Text>
            </div>
        </div>
    )
}

export default RegisterForm

"use client";
import InputField from "@/shared/components/ui/molecules/InputField.tsx/InputField.component";
import PhoneField from "@/shared/components/ui/molecules/PhoneField/PhoneField.component";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { profileUpdateSchema } from "../validations/profileUpdateSchema";
import { useProfile, useUpdateProfile } from "../api/user.hooks";
import { useEffect } from "react";
import Button from "@/shared/components/ui/atoms/Button";
import { useAppSelector } from "@/redux/hook";
import { profileUpdateForm } from "../user.types";
import parsePhoneNumberFromString from "libphonenumber-js";
import { Skeleton } from "boneyard-js/react"

const ProfileUpdateForm = () => {

    const { user } = useAppSelector(state => state.auth);
    const { data, isLoading } = useProfile();
    const { mutate, isPending } = useUpdateProfile();
    const { control, handleSubmit, reset, formState: { errors }, setValue } = useForm<profileUpdateForm>({
        resolver: zodResolver(profileUpdateSchema),
        mode: "onChange",
        defaultValues: {
            email: user?.email ?? "",
            firstName: user?.firstName ?? "",
            lastName: "",
            phone: "",
            country: "Nepal",
            countryCode: "Np",
        }
    });

    useEffect(() => {
        if (data) {
            reset({
                email: data.email ?? "",
                firstName: data.firstName ?? "",
                lastName: data.lastName ?? "",
                phone: data.phone ?? "",
                country: data.country ?? "Nepal",
                countryCode: data.phone ? parsePhoneNumberFromString(data.phone)?.country ?? "NP" : "NP"
            })
        }
    }, [data, reset])

    const onSubmit = (data: profileUpdateForm) => {
        const { email, countryCode, ...submitData } = data;
        mutate(submitData);
    };

    return (
        <Skeleton loading={isLoading} name="profile-update-form">
            <div>
                <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 sm:grid-cols-2 gap-x-2 gap-y-4">
                    <InputField name="email" type="text" control={control} readOnly={true} className="sm:col-span-2" autoComplete="email" />
                    <InputField name="firstName" type="text" control={control} autoComplete="given-name" />
                    <InputField name="lastName" type="text" control={control} autoComplete="family-name" />
                    <PhoneField name="phone" control={control} className="sm:col-span-2"
                        onCountryChange={(country) => {
                            setValue("country", country.name ?? "")
                            setValue("countryCode", country.countryCode ?? "")
                        }}
                    />
                    <InputField name="country" readOnly={true} control={control} className="sm:col-span-2" />
                    <Button type="submit" disabled={isPending} className={`${isPending ? "bg-theme-dark!" : ""} py-3! rounded-md! mt-2 sm:col-span-2`}>
                        {isPending ? "Saving.." : "Save"}
                    </Button>
                </form>
            </div>
        </Skeleton>
    )
}

export default ProfileUpdateForm

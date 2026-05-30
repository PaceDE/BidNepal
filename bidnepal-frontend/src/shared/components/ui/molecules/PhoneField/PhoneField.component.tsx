"use client";

import { Controller, FieldValues, Path } from "react-hook-form";
import { camelCaseToSentence } from "@/shared/utils/string";
import { PhoneFieldProps } from "./PhoneField.types";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Text from "../../atoms/Text/Text.component";

const PhoneField = <T extends FieldValues> ({ 
    name, control, onCountryChange, 
    label, placeholder,  
    disabled=false, 
    className 
}: PhoneFieldProps<T>) => {

    const inputLabel = label || camelCaseToSentence(name);
    const inputPlaceholder = placeholder || `Enter ${inputLabel}`;

    return (
        <div className={`flex flex-col gap-1 ${className || ""}`}>

            <Text variant="label" htmlFor={name}>{inputLabel}</Text>
            <Controller
                name={name}
                control={control}
                render={({ field, fieldState }) => (
                    <div className="flex flex-col gap-1">
                        <PhoneInput
                            aria-label={inputLabel}
                            country={"np"}
                            value={field.value}
                            disabled={disabled}
                            onChange={(value,country) => {
                                field.onChange("+" + value);
                                onCountryChange?.(country);
                            }}
                            inputClass="!w-full !border !border-border-primary !rounded-md !py-5 !outline-none focus:!border-theme"
                            buttonClass="focus:!border-theme"
                           
                           
                            placeholder={inputPlaceholder}
                        />

                        {fieldState.error && (
                            <Text variant="error">
                                {fieldState.error.message}
                            </Text>
                        )}
                    </div>
                )}
            />
        </div>
    );
};

export default PhoneField;
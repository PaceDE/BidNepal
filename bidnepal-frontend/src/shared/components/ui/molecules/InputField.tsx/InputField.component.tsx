"use client";

import { Controller, FieldValues } from "react-hook-form";
import Input from "@/shared/components/ui/atoms/Input";
import { camelCaseToSentence } from "@/shared/utils/string";
import { InputFieldProps } from "./InputField.types";
import Text from "../../atoms/Text/Text.component";

const InputField = <T extends FieldValues> ({
    name, control, 
    type = "text",
    label,placeholder, 
    readOnly=false, 
    disabled=false, 
    autoComplete="off", 
    className
}: InputFieldProps<T>) => {

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
                        <Input
                            {...field}
                            id={name}
                            type={type}
                            placeholder={inputPlaceholder}
                            readOnly={readOnly}
                            disabled={disabled}
                            autoComplete={autoComplete}
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

export default InputField;
"use client";

import { Controller, FieldValues } from "react-hook-form";
import { CheckboxFieldProps } from "./CheckboxField.types";
import Text from "../../atoms/Text/Text.component";

const CheckboxField = <T extends FieldValues>({
    name,
    control,
    label,
    readOnly = false,
    disabled = false,
    showError = true,
    className
}: CheckboxFieldProps<T>) => {
    return (
        <div className={`flex flex-col gap-1 ${className || ""}`}>
            <Controller
                name={name}
                control={control}
                render={({ field, fieldState }) => (
                    <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                            {label && (
                                <Text variant="label" htmlFor={name} className="cursor-pointer">
                                    {label}
                                </Text>
                            )}
                            <input
                                aria-label={label || name}
                                id={name}
                                type="checkbox"
                                checked={field.value}
                                onChange={(e) => field.onChange(e.target.checked)}
                                disabled={disabled}
                                readOnly={readOnly}
                                className="size-4 text-theme bg-theme"
                            />
                        </div>
                        {showError && fieldState.error && (
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

export default CheckboxField;
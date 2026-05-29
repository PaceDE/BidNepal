import { Control, FieldValues, Path, UseFormSetValue } from "react-hook-form";

export interface PhoneFieldProps<T extends FieldValues> {
    name: Path<T>;
    control: Control<T>;
    label?: string;
    placeholder?: string;
    disabled?: boolean;
    className?: string;
    onCountryChange?: (country: any) => void;
};

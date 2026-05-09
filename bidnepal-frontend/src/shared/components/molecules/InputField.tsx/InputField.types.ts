import { Control, FieldValues, Path } from "react-hook-form";

export interface InputFieldProps<T extends FieldValues> {
    name: Path<T>;
    control: Control<T>;
    type?: string;
    label?: string;
    placeholder?: string;
    readOnly?: boolean;
    disabled?: boolean;
    autoComplete?: string;
    className?: string;
};

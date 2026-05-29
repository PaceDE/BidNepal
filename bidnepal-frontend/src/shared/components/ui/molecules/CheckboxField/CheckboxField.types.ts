import { Control, FieldValues, Path } from "react-hook-form";

export interface CheckboxFieldProps<T extends FieldValues> {
    name: Path<T>;
    control: Control<T>;   
    label?: string;
    readOnly?: boolean;
    disabled?: boolean;
    showError?: boolean;
    className?: string;
};

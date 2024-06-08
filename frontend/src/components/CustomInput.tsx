import { ISelectOptions } from "@/utils/interfaces/ISelectOptions";
import { MenuItem, TextField } from "@mui/material";
import { FieldValues, Path, UseFormRegister } from "react-hook-form";

interface ICustonInputProps<T extends FieldValues> {
    type: React.HTMLInputTypeAttribute,
    label: string,
    register: UseFormRegister<T>,
    value: Path<T>,
    isSelect: boolean,
    msgError: string,
    error?: boolean | undefined,
    helperText?: string,
    selectOptions?: ISelectOptions[],
    min?: number
    max?: number
    minLength?: number
    maxLength?: number

}

const CustomInput = <T extends FieldValues>({
    type, 
    label,
    register,
    value, 
    isSelect,
    msgError,
    error,
    helperText,
    selectOptions,
    min,
    max,
    minLength,
    maxLength

    
}: ICustonInputProps<T>
) => {

    return (
        <TextField
            fullWidth 
            type={type}
            autoComplete="current-password"
            select={isSelect}
            label={label}
            defaultValue={selectOptions ? selectOptions[0].value : null}
            color="primary"
            {...register(value,
                {
                required: msgError,
                minLength: minLength ? {value: minLength, message: `El ${label} debe tener al menos ${minLength} caracteres`} : undefined,
                maxLength: maxLength ?  {value: maxLength, message: `El ${label} debe tener al menos ${maxLength} caracteres`}: undefined,
                min: min ? {value: min, message: `El ${label} debe ser mayor a ${min - 1}`} : undefined,
                max: max ? {value: max, message: `El ${label} debe ser menor a ${max}`} : undefined,
                }
            )}
            error={error}
            helperText={helperText}
            sx={{
                width: '100%',
            }}            
        >
            {selectOptions && selectOptions.map(option => (
                <MenuItem key={option.value} value={option.value}>
                    {option.label}
                </MenuItem>
            ))}
        </TextField>
    )
}

export {CustomInput}
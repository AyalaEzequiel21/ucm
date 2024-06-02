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
    max
    
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
                minLength: min && type !== 'number' ? {value: min, message: `El ${label} debe tener al menos ${min} caracteres`} : undefined,
                maxLength: max && type !== 'number' ?  {value: max, message: `El ${label} debe tener al menos ${max} caracteres`}: undefined,
                min: min && value !== 'phone'? {value: min, message: `El ${label} debe ser mayor o igual a ${min}`} : undefined,
                max: max && value !== 'phone' ? {value: max, message: `El ${label} debe ser menor a ${max}`} : undefined,
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
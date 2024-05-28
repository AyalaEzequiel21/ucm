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
                maxLength: maxLength ?  {value: maxLength, message: `El ${label} debe tener al menos ${maxLength} caracteres`}: undefined
                }
            )}
            error={error}
            helperText={helperText}
            sx={{
                width: '100%',
                // '& input[type="number"]::-webkit-inner-spin-button, & input[type="number"]::-webkit-outer-spin-button': {
                //     '-webkit-appearance': 'none',
                //     margin: 0,
                // },
                // '& input[type="number"]': {
                //     '-moz-appearance': 'textfield'
                // },
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
import { ISelectOptions } from "@/utils/interfaces/ISelectOptions";
import { MenuItem, TextField } from "@mui/material";
import { FieldValues, Path, useFormContext } from "react-hook-form";

/**
 * Componente CustomInput:
 * Este componente crea un campo de entrada (`input`) altamente configurable y reutilizable, compatible con formularios gestionados por `react-hook-form`.
 * Puede ser utilizado tanto para entradas de texto como para selectores (comboboxes), y maneja validaciones comunes como longitud mínima/máxima y valores numéricos.
 */
export interface ICustonInputProps<T extends FieldValues> {
    type: React.HTMLInputTypeAttribute, // Tipo de entrada (e.g., 'text', 'password', 'number').
    label: string, // Etiqueta asociada al campo de entrada.
    value: Path<T>, // Nombre del campo del formulario gestionado por `react-hook-form`.
    isSelect: boolean, // Define si el campo debe comportarse como un `select` (combobox).
    msgError: string, // Mensaje de error que se muestra si el campo es requerido y no se ha completado.
    error?: boolean | undefined, // Indica si el campo está en estado de error.
    helperText?: string, // Texto de ayuda o mensaje de error que se muestra debajo del campo.
    selectOptions?: ISelectOptions[], // Opciones disponibles si el campo es de tipo `select`.
    min?: number, // Valor mínimo permitido para entradas numéricas.
    max?: number, // Valor máximo permitido para entradas numéricas.
    minLength?: number, // Longitud mínima permitida para el campo de entrada.
    maxLength?: number, // Longitud máxima permitida para el campo de entrada.
    defaultValue?: number // Valor por defecto del campo de entrada.
}

const CustomInput = <T extends FieldValues>({
    type, 
    label,
    value, 
    isSelect,
    msgError,
    error,
    helperText,
    selectOptions,
    min,
    max,
    minLength,
    maxLength,
    defaultValue
}: ICustonInputProps<T>
) => {

    const { register } = useFormContext()
    const getDefaultValue = () => {
        if(defaultValue){
            return defaultValue
        }
        if(selectOptions){
            return selectOptions[0].value
        }
        return null
    }

    const registerProps = value
        ? register(value, {
            required: msgError,
            minLength: minLength ? {value: minLength, message: `El ${label} debe tener al menos ${minLength} caracteres`} : undefined,
            maxLength: maxLength ?  {value: maxLength, message: `El ${label} debe tener al menos ${maxLength} caracteres`}: undefined,
            min: min ? {value: min, message: `El ${label} debe ser mayor a ${min - 1}`} : undefined,
            max: max ? {value: max, message: `El ${label} debe ser menor a ${max}`} : undefined,
        })
        : {}

    return (
        <TextField
            fullWidth 
            type={type}
            autoComplete="current-password"
            select={isSelect}
            label={label}
            defaultValue={getDefaultValue()}
            color="primary"
            {...registerProps}
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
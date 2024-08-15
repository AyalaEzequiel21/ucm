import { Autocomplete, TextField } from "@mui/material"
import { Controller, FieldValues, Path, useFormContext } from "react-hook-form"

/**
 * Componente CustomAutocomplete:
 * Este componente es un campo de autocompletado personalizado que se integra con `react-hook-form`.
 * Permite al usuario seleccionar una opción de una lista desplegable, y actualiza automáticamente los valores del formulario.
 * Es útil en formularios donde se requiere la selección de una opción específica con un identificador asociado.
 */
interface CustomAutocompleteProps<T extends FieldValues> {
    options: { label: string, id: string }[]; // Lista de opciones disponibles para el autocompletado.
    name: Path<T>; // Nombre del campo en el formulario para el valor seleccionado.
    idName: Path<T>; // Nombre del campo en el formulario para el ID de la opción seleccionada.
    label: string; // Etiqueta que se muestra en el campo de texto del autocompletado.
}

const CustomAutocomplete = <T extends FieldValues>({
    options,
    name,
    idName,
    label
}: CustomAutocompleteProps<T>) => {


    const { 
        setValue, 
        control,
        formState: { errors }
    } = useFormContext()

    const error = !!errors[name]

    return (
        <Controller
            name={name}
            rules={{ required: "Debes ingresar un opcion" }}
            control={control}
            render={({field: {onChange, value, ref}}) => {
                return (
                    <Autocomplete
                        options={options}
                        value={options.find(option => option.label === value) || null}
                        getOptionLabel={(option) => option.label || ""}
                        isOptionEqualToValue={(option, value) => option.id === value.id}
                        renderInput={(params) => (
                            <TextField 
                                {...params} 
                                label={label} 
                                inputRef={ref}
                                error={error}
                                helperText={error ? (errors[name]?.message as string) : ""}
                            />
                        )}
                        onChange={(_, newValue) => {
                            setValue(name, newValue ? (newValue.label as unknown as T[typeof name]) : ('' as unknown as T[typeof name]));
                            setValue(idName, newValue ? (newValue.id as unknown as T[typeof idName]) : ('' as unknown as T[typeof idName]));
                            onChange(newValue ? newValue.label : '')
                        }}
                
                        sx={{
                            width: '100%'
                        }}
                    />)
            }}
        />
    )
}

export {CustomAutocomplete}

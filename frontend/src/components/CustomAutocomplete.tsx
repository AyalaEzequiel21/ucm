import { Autocomplete, TextField } from "@mui/material"
import { Controller, FieldValues, Path, useFormContext } from "react-hook-form"

interface CustomAutocompleteProps<T extends FieldValues> {
    options: {label: string, id: string}[]
    name: string
    idName: string
    label: string
}

const CustomAutocomplete = <T extends FieldValues>({
    options,
    name,
    idName,
    label
}: CustomAutocompleteProps<T>) => {

    const { setValue, control } = useFormContext()

    return (
        <Controller
            name={name}
            control={control}
            render={({field: {onChange, value, ref}}) => {
                return (<Autocomplete
                    
                    options={options}
                    value={value || null}
                    getOptionLabel={(option) => option.label}
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                    renderInput={(params) => (
                        <TextField {...params} label={label} inputRef={ref}/>
                    )}
                    onChange={(_, newValue) => {
                        setValue(name , newValue ? newValue.label : '')
                        setValue(idName, newValue ? newValue.id : '')
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

///////////////////////////////////////////////////////////////////////

// TRATAR DE SOLUCIONAR EL TEMA DEL SETEO XQ DEVUELVE UNDEFINED.
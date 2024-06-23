import { Autocomplete, TextField } from "@mui/material"
import { Controller, FieldValues, Path, useFormContext } from "react-hook-form"

interface CustomAutocompleteProps<T extends FieldValues> {
    options: {label: string, id: string}[]
    name: Path<T>
    idName: Path<T>
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
                return (
                <Autocomplete
                    options={options}
                    value={options.find(option => option.label === value) || null}
                    getOptionLabel={(option) => option.label || ""}
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                    renderInput={(params) => (
                        <TextField {...params} label={label} inputRef={ref}/>
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

import { Autocomplete, TextField } from "@mui/material"
import { Control, Controller, FieldValues, Path, useFormContext } from "react-hook-form"

interface CustomAutocompleteProps<T extends FieldValues> {
    options: {label: string, id: string}[]
    control: Control<T>,
    name: Path<T>
    label: string
}

const CustomAutocomplete = <T extends FieldValues>({
    options,
    control, 
    name,
    label
}: CustomAutocompleteProps<T>) => {

    const { setValue } = useFormContext()

    return (
        <Controller
            name={name}
            control={control}
            render={({field: {onChange, value, ref}}) => {
                return (<Autocomplete
                    // {...field}
                    options={options}
                    value={value || null}
                    getOptionLabel={(option) => option.label}
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                    renderInput={(params) => (
                        <TextField {...params} label={label} inputRef={ref}/>
                    )}
                    onChange={(_, newValue) => {
                        setValue('client_name', newValue ? newValue.label : '')
                        setValue('client_id', newValue ? newValue.id : '')
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
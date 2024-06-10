import { Autocomplete, TextField } from "@mui/material"
import { Control, Controller, FieldValues, Path } from "react-hook-form"

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


    return (
        <Controller
            name={name}
            control={control}
            render={({field}) => {
                return (<Autocomplete
                    {...field}
                    options={options}
                    getOptionLabel={(option) => option.label}
                    renderInput={(params) => (
                        <TextField {...params} label={label} />
                    )}
                    onChange={(_, data) => field.onChange(data)}
                />)
            }}
        />
    )
}

export {CustomAutocomplete}
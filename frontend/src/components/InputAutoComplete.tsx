import { Autocomplete, TextField } from "@mui/material"
import { Control, Controller, FieldValues, Path } from "react-hook-form"

interface InputAutoCompleteProps<T extends FieldValues> {
    options: {label: string, id: string}[]
    control: Control<T>,
    name: Path<T>
    label: string
}

const InputAutoComplete = <T extends FieldValues>({
    options,
    control, 
    name,
    label
}: InputAutoCompleteProps<T>) => {


    return (
        <Controller
            name={name}
            control={control}
            render={({field}) => {
                return (<Autocomplete
                    {...field}
                    options={options}
                    getOptionLabel={(option) => option.label}
                    sx={{width: '100%', p: '0'}}
                    renderInput={(params) => (
                        <TextField {...params} label={label} sx={{width: '100%', p: '0'}}/>
                    )}
                    onChange={(_, data) => field.onChange(data)}
                />)
            }}
        />
    )
}

export {InputAutoComplete}
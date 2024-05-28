import { IRadioOptions } from "@/utils/interfaces/IRadioOption"
import { FormControl, FormControlLabel, FormHelperText, FormLabel, Radio, RadioGroup } from "@mui/material"
import { FieldValues, Path, UseFormRegister } from "react-hook-form"

interface ICustomRadioGroupProps<T extends FieldValues>  {
    label: string,
    propertie: Path<T>,
    error?: boolean | undefined,
    options: IRadioOptions[],
    register: UseFormRegister<T>,
}

const CustomRadioGroup = <T extends FieldValues>({ label, propertie, error, options, register }: ICustomRadioGroupProps<T>) => {

    return (
        <FormControl component={'fieldset'} error={error} sx={{width: '100%'}}>
            <FormLabel component ='legend'>{label}</FormLabel>
            <RadioGroup 
                row
                aria-label={label}
                name={propertie}
                defaultValue={options[0].value}
            >
                {options.map(option => (
                    <FormControlLabel
                        value={option.value}
                        control={<Radio {...register(propertie)} />}
                        label={option.label}
                        key={option.label}
                    />
                ))}
            </RadioGroup>
            {error && (
                <FormHelperText>Debes seleccionar una opcion</FormHelperText>
            )}
        </FormControl>
    )
}

export { CustomRadioGroup }
import { IRadioOptions } from "@/utils/interfaces/IRadioOption"
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material"
import { FieldValues, Path, UseFormRegister } from "react-hook-form"

interface ICustomRadioGroupProps<T extends FieldValues>  {
    label: string,
    propertie: Path<T>,
    options: IRadioOptions[],
    register: UseFormRegister<T>,
}

const CustomRadioGroup = <T extends FieldValues>({ label, propertie, options, register }: ICustomRadioGroupProps<T>) => {

    return (
        <FormControl component={'fieldset'} sx={{width: '100%'}}>
            <FormLabel component ='legend'>{label}</FormLabel>
            <RadioGroup 
                row
                aria-label={label}
                name={propertie}
            >
                {options.map(option => (
                    <FormControlLabel
                        value={option.value.toString()}
                        control={<Radio {...register(propertie)} />}
                        label={option.label}
                        key={option.label}
                    />
                ))}
            </RadioGroup>
        </FormControl>
    )
}

export { CustomRadioGroup }
import { IRadioOptions } from "@/utils/interfaces/IRadioOption"
import { FormControl, FormControlLabel, FormHelperText, FormLabel, Radio, RadioGroup } from "@mui/material"
import { FieldValues, Path, useFormContext } from "react-hook-form"

/**
 * Componente CustomRadioGroup:
 * Este componente renderiza un grupo de botones de radio (RadioGroup) dentro de un formulario, con la posibilidad de mostrar un mensaje de error si no se ha seleccionado ninguna opción.
 * Utiliza `react-hook-form` para la gestión de formularios y validación.
 * Es útil para permitir que el usuario seleccione una opción de entre varias disponibles.
 */
interface ICustomRadioGroupProps<T extends FieldValues>  {
    label: string, // Etiqueta que describe el grupo de botones de radio.
    propertie: Path<T>, // Nombre de la propiedad del formulario que este grupo controla.
    error?: boolean | undefined, // Indica si hay un error en la selección.
    options: IRadioOptions[], // Lista de opciones que se mostrarán como botones de radio.
}

const CustomRadioGroup = <T extends FieldValues>({ label, propertie, error, options }: ICustomRadioGroupProps<T>) => {

    const { register } = useFormContext()

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
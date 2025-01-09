import { RootState } from "@/redux/store"
import { IAutocompleteOption } from "@/utils/interfaces/IAutocompleteOptions"
import { IClient } from "@/utils/interfaces/IClient"
import { IClientPayment } from "@/utils/interfaces/IClientPayment"
import { Button, Stack, useTheme } from "@mui/material"
import { FormProvider, useForm } from "react-hook-form"
import { useSelector } from "react-redux"
import { CustomAutocomplete } from "../CustomAutocomplete"
import { CustomInput } from "../CustomInput"
import { paymentMethodOptions } from "@/utils/dataUtils/AllOptions"

interface ReportDetailsProps {
    onAddDetail: (detail: Partial<IClientPayment>) => void  
}

const ReportDetailsForm: React.FC<ReportDetailsProps> = ({onAddDetail}) => {

    const {palette} = useTheme()
    const {clients} = useSelector((state: RootState) => state.client.allClients)
    const methods = useForm<Partial<IClientPayment>>({
        defaultValues: {
            client_name: '',
            amount: 0,
            payment_method: 'efectivo',
        }
    })

    const {
        handleSubmit,
        reset,
        formState: { errors },
    } = methods

    const onSubmit = (data: Partial<IClientPayment>) => {
        if (data.client_name && data.amount && data.amount > 0) {
            const dataProcessed = {...data, amount: Number(data.amount)}
            onAddDetail(dataProcessed)
            reset();
        }
    }

    const clientOptions: IAutocompleteOption[] = clients?.map((client: IClient) => ({
        label: client.fullname,
        id: client._id
    })) || []

    return (
        <FormProvider {...methods}>
            <Stack direction="column" spacing={2.5}>
                <CustomAutocomplete
                    label="Cliente"
                    name="client_name"
                    idName="client_id"
                    options={clientOptions}
                />
                <Stack direction={'row'} spacing={1}>
                    <CustomInput 
                        type="text"
                        label="Metodo de Pago"
                        isSelect={true}
                        selectOptions={paymentMethodOptions}
                        value="payment_method"
                        msgError="Por favor ingrese el metodo de pago"
                        error={!!errors.payment_method}
                        helperText={errors.payment_method?.message}
                        min={1}
                        defaultValue={'efectivo'}
                    />
                    <CustomInput 
                        type="number"
                        label="Total del Pago"
                        isSelect={false}
                        value="amount"
                        msgError="Por favor ingrese un monto mayor a 0"
                        error={!!errors.amount}
                        helperText={errors.amount?.message}
                        min={1}
                    />
                </Stack>
                <Button onClick={handleSubmit(onSubmit)} variant="outlined" sx={{borderColor: palette.primary.dark, color: palette.primary.dark}}>Agregar</Button>
            </Stack>
        </FormProvider>
    )
}

export { ReportDetailsForm }
import { useAddClientPaymentMutation } from "@/redux/api/clientPaymentApi";
import { INewClientPaymentValues } from "@/utils/interfaces/registerModels/INewClientPaymentValues";
import { FormAddProps } from "@/utils/types/FormAddProps";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { CustomFormLayout } from "../CustomFormLayout";
import { CustomInput } from "../CustomInput";
import { useGetAllClientsQuery } from "@/redux/api/clientApi";
import { IClient } from "@/utils/interfaces/IClient";
import { CustomAutocomplete } from "../CustomAutocomplete";
import { ISelectOptions } from "@/utils/interfaces/ISelectOptions";

const PaymentAddForm: React.FC<FormAddProps> = ({confirmAlertSucess, confirmErrorAlert, onCloseModal}) => {
    
    const [addClientPayment, {isLoading}] = useAddClientPaymentMutation()
    const { data: clientsData } = useGetAllClientsQuery()
    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined)
    const methods = useForm<INewClientPaymentValues>()
    const {
        handleSubmit,
        reset,
        formState: {errors}
    } = methods

    const onSubmit = async (dataForm: INewClientPaymentValues) => {
        console.log(dataForm);
    }

    interface AutocompleteOption {
        label: string,
        id: string
    }

    const clientOptions: AutocompleteOption[] = clientsData?.data.map((client: IClient) => ({
        label: client.fullname,
        id: client._id
    })) || []

    const paymentMethodOptions: ISelectOptions[] = [
        { label: 'Efectivo', value: 'efectivo'},
        { label: 'Transf. Bancaria', value: 'banco'},
        { label: 'Mercadopago', value: 'mercadopago'},
        { label: 'Cheque', value: 'cheque'},
    ]

    useEffect(()=> {
                console.log(clientsData);
    }, [clientsData])


    return (
        <FormProvider {...methods}>
            <CustomFormLayout
                handleSubmit={handleSubmit(onSubmit)}
                title="Crear Pago"
                labelButton="Crear"
                isLoading={isLoading}
                errorMessage={errorMessage}
            >
                <CustomAutocomplete 
                    label="Ingrese el cliente"
                    name="client_name"
                    idName="client_id"
                    options={clientOptions}
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
                />
            </CustomFormLayout>
        </FormProvider>
    )

}

export {PaymentAddForm}
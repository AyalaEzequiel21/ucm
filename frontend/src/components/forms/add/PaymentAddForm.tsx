import { useAddClientPaymentMutation } from "@/redux/api/clientPaymentApi";
import { INewClientPaymentValues } from "@/utils/interfaces/registerModels/INewClientPaymentValues";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { IClient } from "@/utils/interfaces/IClient";
import { ApiErrorResponseType } from "@/utils/types/ApiErrorResponeType";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { IAutocompleteOption } from "@/utils/interfaces/IAutocompleteOptions";
import { paymentMethodOptions } from "@/utils/dataUtils/AllOptions";
import { CustomFormLayout } from "@/components/CustomFormLayout";
import { CustomAutocomplete } from "@/components/CustomAutocomplete";
import { CustomInput } from "@/components/CustomInput";
import { useModalAlert } from "@/hooks/useModalAlert";

const PaymentAddForm: React.FC<object> = () => {
    
    const [addClientPayment, {isLoading}] = useAddClientPaymentMutation()
    const {clients} = useSelector((state: RootState) => state.client.allClients)
    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined)
    const { toggleModal, toggleErrorAlert, toggleSuccessAlert } = useModalAlert()
    const methods = useForm<INewClientPaymentValues>()
    const {
        handleSubmit,
        reset,
        formState: {errors}
    } = methods

    const onSubmit = async (dataForm: INewClientPaymentValues) => {
        const dataProsseced = {
            ...dataForm,
            amount: Number(dataForm.amount)
        }
        try{
            await addClientPayment(dataProsseced).unwrap()
            toggleSuccessAlert('Pago agregado exitosamente')
            toggleModal()
            reset()
        } catch(e){
            const err = e as ApiErrorResponseType
            toggleErrorAlert('Error al agregar el pago')
            setErrorMessage(err.data.message)
        }
    }

    const clientOptions: IAutocompleteOption[] = clients?.map((client: IClient) => ({
        label: client.fullname,
        id: client._id
    })) || []

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
                />
            </CustomFormLayout>
        </FormProvider>
    )

}

export {PaymentAddForm}
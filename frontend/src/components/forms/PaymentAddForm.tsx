import { useAddClientPaymentMutation } from "@/redux/api/clientPaymentApi";
import { INewClientPaymentValues } from "@/utils/interfaces/registerModels/INewClientPaymentValues";
import { FormAddProps } from "@/utils/types/FormAddProps";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { CustomFormLayout } from "../CustomFormLayout";
import { CustomInput } from "../CustomInput";
import { useGetAllClientsQuery } from "@/redux/api/clientApi";
import { IClient } from "@/utils/interfaces/IClient";
import { CustomAutocomplete } from "../CustomAutocomplete";

const PaymentAddForm: React.FC<FormAddProps> = ({confirmAlertSucess, confirmErrorAlert, onCloseModal}) => {
    
    const [addClientPayment, {isLoading}] = useAddClientPaymentMutation()
    const { data: clientsData } = useGetAllClientsQuery()
    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined)

    const {
        register, 
        handleSubmit,
        reset,
        control,
        formState: {errors}
    } = useForm<INewClientPaymentValues>()

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

    useEffect(()=> {
        console.log(clientsData);
    }, [clientsData])


    return (
        <CustomFormLayout
            handleSubmit={handleSubmit(onSubmit)}
            title="Crear Pago"
            labelButton="Crear"
            isLoading={isLoading}
            errorMessage={errorMessage}
        >
            <CustomAutocomplete 
                control={control}
                label="Ingrese el nombre del cliente"
                name="client_name"
                options={clientOptions}
            />
            <CustomInput 
                type="number"
                label="Total del Pago"
                register={register}
                isSelect={false}
                value="amount"
                msgError="Por favor ingrese un monto mayor a 0"
                error={!!errors.amount}
                helperText={errors.amount?.message}
                min={1}
            />
        </CustomFormLayout>
    )

}

export {PaymentAddForm}
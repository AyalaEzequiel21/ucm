import { useAddClientPaymentMutation } from "@/redux/api/clientPaymentApi";
import { INewClientPaymentValues } from "@/utils/interfaces/registerModels/INewClientPaymentValues";
import { FormAddProps } from "@/utils/types/FormAddProps";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { CustomFormLayout } from "../CustomFormLayout";
import { CustomInput } from "../CustomInput";
import { useGetAllClientsQuery } from "@/redux/api/clientApi";
import { IClient } from "@/utils/interfaces/IClient";
import { Autocomplete } from "@mui/material";

const PaymentAddForm: React.FC<FormAddProps> = ({confirmAlertSucess, confirmErrorAlert, onCloseModal}) => {
    
    const [addClientPayment, {isLoading}] = useAddClientPaymentMutation()
    const { data: clientsData } = useGetAllClientsQuery()
    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined)

    const {
        register, 
        handleSubmit,
        reset,
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
            <Autocomplete
                    disablePortal
                    options={clientOptions}
                    getOptionLabel={(option) => option.label}
                    // value={value ? clientOptions.find(option => option.id === value) : null}
                    // onChange={(event, item) => {
                    //     onChange(item ? item.id : '');
                    // }}
                    renderInput={(params) => (
                        <CustomInput 
                            // {...params}
                            type="text"
                            label="Nombre del Cliente"
                            register={register}
                            value="client_name"
                            isSelect={false}
                            msgError="Ingrese el nombre de un cliente"
                            error={!!errors.client_name}
                            helperText={errors.client_name?.message}
                        />
                    )}  
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
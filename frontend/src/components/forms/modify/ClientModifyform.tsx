import { useModifyClientMutation } from "@/redux/api/clientApi"
import { IClientDetails, IClientMongo } from "@/utils/interfaces/IClient"
import { useState } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { CustomFormLayout } from "../../CustomFormLayout"
import { CustomRadioGroup } from "../../CustomRadioGroup"
import { categoriesOptions, inDeliveryOptions } from "@/utils/dataUtils/AllOptions"
import { CustomInput } from "../../CustomInput"
import { ApiErrorResponseType } from "@/utils/types/ApiErrorResponeType"
import { INewClientValues } from "@/utils/interfaces/registerModels/INewCLientValues"
import { useModalAlert } from "@/hooks/useModalAlert"
import { getCapitalizeString } from "@/utils/functionsHelper/getCapitalizeString"

interface ClientModifyFormProps {
    clientData: IClientDetails
}

const ClientModifyForm: React.FC<ClientModifyFormProps> = ({clientData}) => {
    const [modifyClient, {isLoading}] = useModifyClientMutation()
    const [errorMessage, setErrorMessage] = useState<string|undefined>(undefined)
    const methods = useForm<INewClientValues>()
    const { toggleModal, toggleErrorAlert, toggleSuccessAlert } = useModalAlert()
    const { handleSubmit, reset, formState: {errors} } = methods

    const onSubmit = async (dataForm: INewClientValues) => {
        const updatedClient: IClientMongo = {
            fullname: getCapitalizeString(dataForm.fullname),
            phone: dataForm.phone,
            balance: clientData.balance,
            category: dataForm.category,
            in_delivery: dataForm.in_delivery.toString() === 'true',
            _id: clientData._id,
            is_active: dataForm.is_active?.toString() === 'true'
        }
        
        if(updatedClient.fullname !== clientData.fullname || updatedClient.phone !== clientData.phone || updatedClient.category !== clientData.category || updatedClient.in_delivery !== clientData.in_delivery || updatedClient.is_active !== clientData.is_active){
            try{
                await modifyClient(updatedClient).unwrap()
                toggleSuccessAlert('Cliente modificado con exito')
                reset()
                toggleModal()
            } catch(e){
                const err = e as ApiErrorResponseType
                toggleErrorAlert('Error al modificar el cliente')
                console.error(err.data.message);
                setErrorMessage(err.data.message)
            }
        } else {
            setErrorMessage("No se realizaron cambios")
        }
    }

    return(
        <FormProvider {...methods}>
            <CustomFormLayout
                handleSubmit={handleSubmit(onSubmit)}
                isLoading={isLoading}
                labelButton="Modificar"
                title="Modificar Cliente"
                errorMessage={errorMessage}
            >
                <CustomInput 
                    type="text"
                    label="Nombre del Cliente"
                    isSelect={false}
                    value="fullname"
                    msgError="Por favor ingrese el nombre del cliente"
                    error={!!errors.fullname}
                    helperText={errors.fullname?.message}
                    minLength={4}
                    maxLength={15}
                    defaultValue={clientData.fullname}
                />
                <CustomInput 
                    type="number"
                    label="Telefono del Cliente"
                    isSelect={false}
                    value="phone"
                    msgError="Por favor ingrese el telefono del cliente"
                    error={!!errors.phone}
                    helperText={errors.phone?.message}
                    minLength={8}
                    maxLength={15}
                    defaultValue={clientData.phone}
                />
                <CustomInput 
                    type="text"
                    label="Categoria"
                    isSelect={true}
                    value="category"
                    msgError="Seleccione una categoria para el cliente"
                    error={!!errors.category}
                    helperText={errors.category?.message}
                    selectOptions={categoriesOptions}
                    defaultValue={clientData.category}
                />
                <CustomRadioGroup 
                    label="Reparto"
                    propertie="in_delivery"
                    error={!!errors.in_delivery}
                    options={inDeliveryOptions}
                    defaultValue={clientData.in_delivery}
                />
                {!clientData.is_active && <CustomRadioGroup 
                    label="Reactivar"
                    propertie="is_active"
                    error={!!errors.is_active}
                    options={inDeliveryOptions}
                    defaultValue={clientData.is_active}
                />}
            </CustomFormLayout>
        </FormProvider>
    )
}

export {ClientModifyForm}
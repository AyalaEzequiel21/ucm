import { FormProvider, useForm } from "react-hook-form"
import { CustomFormLayout } from "../../CustomFormLayout"
import { CustomInput } from "../../CustomInput"
import { CustomRadioGroup } from "../../CustomRadioGroup"
import { useAddClientMutation } from "@/redux/api/clientApi"
import { useState } from "react"
import { ApiErrorResponseType } from "@/utils/types/ApiErrorResponeType"
import { getCapitalizeString } from "@/utils/functionsHelper/getCapitalizeString"
import { INewClientValues } from "@/utils/interfaces/registerModels/INewCLientValues"
import { categoriesOptions, inDeliveryOptions } from "@/utils/dataUtils/AllOptions"
import { useModalAlert } from "@/hooks/useModalAlert"


const ClientAddForm: React.FC<object> = () => {

    const [addClient, {isLoading}] = useAddClientMutation()
    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined) 
    const methods = useForm<INewClientValues>()
    const { toggleModal, toggleErrorAlert, toggleSuccessAlert } = useModalAlert()
    const { handleSubmit, reset, formState: {errors} } = methods


    const onSubmit = async (dataForm: INewClientValues) => {
        const inDelivery = dataForm.in_delivery.toString()
        const processedDataForm = {
            ...dataForm,
            fullname: getCapitalizeString(dataForm.fullname),
            phone: dataForm.phone.toString(),
            in_delivery: inDelivery === 'true'
        }
        try{
            // const response = 
            await addClient(processedDataForm).unwrap()
            toggleSuccessAlert('Cliente agregado exitosamente')
            reset()
            toggleModal()
            
        } catch(e){
            const err = e as ApiErrorResponseType
            toggleErrorAlert('Error al agregar el cliente')
            console.log(err.data.message);
            setErrorMessage(err.data.message)
        }
    }

    return (
        <FormProvider {...methods}>
            <CustomFormLayout
            handleSubmit={handleSubmit(onSubmit)}
            title="Agregar Cliente"
            labelButton="Agregar"
            isLoading={isLoading}
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
                    defaultValue={'cat_1'}
                />
                <CustomRadioGroup 
                    label="Reparto"
                    propertie="in_delivery"
                    error={!!errors.in_delivery}
                    options={inDeliveryOptions}
                />
            </CustomFormLayout>
        </FormProvider>
    )
}

export {ClientAddForm}
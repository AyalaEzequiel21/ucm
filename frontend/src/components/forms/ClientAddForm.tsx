import { useForm } from "react-hook-form"
import { CustomFormLayout } from "../CustomFormLayout"
import { CustomInput } from "../CustomInput"
import { INewClientValues } from "@/utils/interfaces/registerModels/INewCLientValues"
import { ISelectOptions } from "@/utils/interfaces/ISelectOptions"
import { CustomRadioGroup } from "../CustomRadioGroup"
import { IRadioOptions } from "@/utils/interfaces/IRadioOption"
import { useAddClientMutation } from "@/redux/api/clientApi"
import { useState } from "react"
import { ApiErrorResponseType } from "@/utils/types/ApiErrorResponeType"

type ClientAddFormProps = object

const ClientAddForm: React.FC<ClientAddFormProps> = () => {

    const [addClient, {isLoading, isSuccess}] = useAddClientMutation()
    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined)

    const {
        register, 
        handleSubmit,
        reset,
        formState: {errors}
    } = useForm<INewClientValues>()

    const onSubmit = async (dataForm: INewClientValues) => {
        console.log(dataForm)
        try{
            const response = await addClient(dataForm).unwrap()
            console.log(response);
            reset()
            
        } catch(e){
            const err = e as ApiErrorResponseType
            console.log(e);
            
            setErrorMessage(err.data.message)
        }
    }

    const categoriesOptions: ISelectOptions[] = [
        {
            label: 'Cargador',
            value: 'cat_1'
        },
        {
            label: 'Carnicero',
            value: 'cat_2'
        }
    ]

    const inDeliveryOptions: IRadioOptions[] = [
        {
            label: 'SI',
            value: true
        },
        {
            label: 'NO',
            value: false
        }
    ]

    return (
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
                register={register}
                isSelect={false}
                value="fullname"
                msgError="Por favor ingrese el nombre del cliente"
                error={!!errors.fullname}
                helperText={errors.fullname?.message}
            />
            <CustomInput 
                type="text"
                label="Telefono del Cliente"
                register={register}
                isSelect={false}
                value="phone"
                msgError="Por favor ingrese el telefono del cliente"
                error={!!errors.phone}
                helperText={errors.phone?.message}
            />
            <CustomInput 
                type="text"
                label="Categoria"
                register={register}
                isSelect={true}
                value="category"
                msgError="Seleccione una categoria para el cliente"
                error={!!errors.category}
                helperText={errors.category?.message}
                selectOptions={categoriesOptions}
            />
            <CustomRadioGroup 
                label="Reparto"
                propertie="in_delivery"
                options={inDeliveryOptions}
                register={register}
            />
        </CustomFormLayout>
    )
}

export {ClientAddForm}
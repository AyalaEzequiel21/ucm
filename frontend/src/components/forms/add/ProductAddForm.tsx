import { useAddProductMutation } from "@/redux/api/productApi"
import { CustomFormLayout } from "../../CustomFormLayout"
import { useState } from "react"
import { CustomInput } from "../../CustomInput"
import { FormProvider, useForm } from "react-hook-form"
import { INewProductValues } from "@/utils/interfaces/registerModels/INewProductValue"
import { ApiErrorResponseType } from "@/utils/types/ApiErrorResponeType"
import { getCapitalizeString } from "@/utils/functionsHelper/getCapitalizeString"
import { useModalAlert } from "@/hooks/useModalAlert"


const ProductAddForm: React.FC<object> = () => {
    
    const [addProduct, {isLoading}] = useAddProductMutation()
    const { toggleModal, toggleErrorAlert, toggleSuccessAlert } = useModalAlert()
    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined)
    const methods = useForm<INewProductValues>()
    const {
        handleSubmit,
        reset,
        formState: {errors}
    } = methods

    const onSubmit = async (dataForm: INewProductValues) => {
        const processedDataForm = {
            ...dataForm,
            product_name: getCapitalizeString(dataForm.product_name),
            first_price: Number(dataForm.first_price),
            second_price: Number(dataForm.second_price)
        }
        try{
            await addProduct(processedDataForm).unwrap()
            toggleSuccessAlert('Producto agregado exitosamente')
            toggleModal()
            reset()
        }catch (e){
            const err = e as ApiErrorResponseType
            toggleErrorAlert('Error al agregar el producto')
            console.log(err)
            setErrorMessage(err.data.message)
        }
    }

    return (
        <FormProvider {...methods}>
            <CustomFormLayout
                handleSubmit={handleSubmit(onSubmit)}
                title="Agregar Producto"
                labelButton="Agregar"
                isLoading={isLoading}
                errorMessage={errorMessage}
            >
                <CustomInput 
                    type="text"
                    label="Nombre del Producto"
                    isSelect={false}
                    value="product_name"
                    msgError="Por favor ingrese el nombre del producto"
                    error={!!errors.product_name}
                    helperText={errors.product_name?.message}
                    minLength={5}
                    maxLength={25}
                />
                <CustomInput 
                    type="number"
                    label="Primer Precio"
                    isSelect={false}
                    value="first_price"
                    msgError="Por favor ingrese el primer precio del producto"
                    error={!!errors.first_price}
                    helperText={errors.first_price?.message}
                    min={1}
                />
                <CustomInput 
                    type="number"
                    label="Segundo Precio"
                    isSelect={false}
                    value="second_price"
                    msgError="Por favor ingrese el segundo precio del producto"
                    error={!!errors.second_price}
                    helperText={errors.second_price?.message}
                    min={1}
                />
            </CustomFormLayout>
        </FormProvider>
    )
}

export {ProductAddForm}
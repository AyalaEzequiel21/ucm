import { useAddProductMutation } from "@/redux/api/productApi"
import { CustomFormLayout } from "../CustomFormLayout"
import { useState } from "react"
import { CustomInput } from "../CustomInput"
import { useForm } from "react-hook-form"
import { INewProductValues } from "@/utils/interfaces/registerModels/INewProductValue"
import { ApiErrorResponseType } from "@/utils/types/ApiErrorResponeType"
import { getCapitalizeString } from "@/utils/functionsHelper/getCapitalizeString"
import { FormAddProps } from "@/utils/types/FormAddProps"


const ProductAddForm: React.FC<FormAddProps> = ({confirmAlertSucess, confirmErrorAlert, onCloseModal}) => {
    
    const [addProduct, {isLoading}] = useAddProductMutation()
    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined)

    const {
        register, 
        handleSubmit,
        reset,
        formState: {errors}
    } = useForm<INewProductValues>()

    const onSubmit = async (dataForm: INewProductValues) => {
        console.log(dataForm)
        const processedDataForm = {
            ...dataForm,
            product_name: getCapitalizeString(dataForm.product_name),
            first_price: Number(dataForm.first_price),
            second_price: Number(dataForm.second_price)
        }
        try{
            await addProduct(processedDataForm).unwrap()
            confirmAlertSucess('El producto se registro con exito')
            onCloseModal()
            reset()
        }catch (e){
            const err = e as ApiErrorResponseType
            confirmErrorAlert()
            console.log(err)
            setErrorMessage(err.data.message)
        }
    }

    return (
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
                register={register}
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
                register={register}
                isSelect={false}
                value="first_price"
                msgError="Por favor ingrese el primer precio del producto"
                error={!!errors.first_price}
                helperText={errors.first_price?.message}
                min={1}
                max={9999}
            />
            <CustomInput 
                type="number"
                label="Segundo Precio"
                register={register}
                isSelect={false}
                value="second_price"
                msgError="Por favor ingrese el segundo precio del producto"
                error={!!errors.second_price}
                helperText={errors.second_price?.message}
                min={1}
                max={9999}
            />
        </CustomFormLayout>
    )
}

export {ProductAddForm}
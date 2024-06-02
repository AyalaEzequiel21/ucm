import { useAddProductMutation } from "@/redux/api/productApi"
import { CustomFormLayout } from "../CustomFormLayout"
import { useState } from "react"
import { CustomInput } from "../CustomInput"
import { useForm } from "react-hook-form"
import { INewProductValues } from "@/utils/interfaces/registerModels/INewProductValue"


type ProductAddFormProps = {
    onCloseModal: ()=> void,
    confirmAlertSucess: (message: string)=> void,
    confirmErrorAlert: ()=> void
}

const ProductAddForm: React.FC<ProductAddFormProps> = ({confirmAlertSucess, confirmErrorAlert, onCloseModal}) => {
    
    const [addProduct, {isLoading}] = useAddProductMutation()
    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined)

    const {
        register, 
        handleSubmit,
        reset,
        formState: {errors}
    } = useForm<INewProductValues>()

    const onSubmit = () => {

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
                min={5}
                max={25}
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
                min={0}
                max={100000}
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
                min={0}
                max={100000}
            />
        </CustomFormLayout>
    )
}

export {ProductAddForm}
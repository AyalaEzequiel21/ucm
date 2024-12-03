import { useModifyProductMutation } from "@/redux/api/productApi";
import { IProduct } from "@/utils/interfaces/IProduct";
import { INewProductValues } from "@/utils/interfaces/registerModels/INewProductValue";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { CustomFormLayout } from "../CustomFormLayout";
import { CustomInput } from "../CustomInput";
import { ApiErrorResponseType } from "@/utils/types/ApiErrorResponeType";


interface ProductModifyFormProps {
    productData: IProduct
}

const ProductModifyForm: React.FC<ProductModifyFormProps> = ({ productData }) => {
    const [modifyProduct, { isLoading }] = useModifyProductMutation()
    const [errorMessage, setErrorMessage] = useState<string|undefined>(undefined)
    const methods = useForm<INewProductValues>()
    const { handleSubmit, reset, formState: {errors} } = methods

    const onSumit = async(dataForm: INewProductValues)=> {
        const updatedProduct = {...productData, ...dataForm}
        if(updatedProduct.product_name !== productData.product_name || updatedProduct.first_price !== productData.first_price || updatedProduct.second_price !== productData.second_price) {
            try{
                await modifyProduct(updatedProduct).unwrap()
                reset()
            } catch(e) {
                const err = e as ApiErrorResponseType
                setErrorMessage(err.data.message)
            }
        }else {
            setErrorMessage("No se realizaron cambios")
        }
    }

    return(
        <FormProvider {...methods}>
            <CustomFormLayout
                handleSubmit={handleSubmit(onSumit)}
                isLoading={isLoading}
                labelButton="Modificar"
                title="Modificar Producto"
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
                    defaultValue={productData.product_name}
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
                    max={9999}
                    defaultValue={productData.first_price}
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
                    max={9999}
                    defaultValue={productData.second_price}
                />
            </CustomFormLayout>
        </FormProvider>
    )
}

export { ProductModifyForm }
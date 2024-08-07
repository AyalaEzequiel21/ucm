import { useAddSupplierMutation } from "@/redux/api/supplierApi";
import { FormAddProps } from "@/utils/types/FormAddProps";
import { useState } from "react";
import { CustomFormLayout } from "../CustomFormLayout";
import { FormProvider, useForm } from "react-hook-form";
import { INewSupplier } from "@/utils/interfaces/registerModels/INewSupplier";
import { CustomInput } from "../CustomInput";
import { getCapitalizeString } from "@/utils/functionsHelper/getCapitalizeString";
import { ApiErrorResponseType } from "@/utils/types/ApiErrorResponeType";

const SupplierAddForm: React.FC<FormAddProps> = ({confirmAlertSucess, confirmErrorAlert, onCloseModal}) => {

    const [addSupplier, {isLoading}] = useAddSupplierMutation()
    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined)
    const methods = useForm<INewSupplier>()
    const {
        handleSubmit,
        reset,
        formState: {errors}
    } = methods

    const onSubmit = async (dataForm: INewSupplier) => {
        const processedDataForm = {
            ...dataForm,
            supplier_name: getCapitalizeString(dataForm.supplier_name),
            primeProduct: getCapitalizeString(dataForm.primeProduct)
        }

        try{
            const response = await addSupplier(processedDataForm).unwrap()
            console.log(response)
            confirmAlertSucess(`El cliente se registro con exito`)
            reset()
            onCloseModal()
        } catch(e){
            const err = e as ApiErrorResponseType
            confirmErrorAlert()
            console.log(err.data.message);
            setErrorMessage(err.data.message)
        }
    }

    return (
        <FormProvider {...methods}>
            <CustomFormLayout
                handleSubmit={handleSubmit(onSubmit)}
                title="Agregar Proveedor"
                labelButton="Agregar"
                isLoading={isLoading}
                errorMessage={errorMessage}
            >
                <CustomInput
                    type="text"
                    label="Nombre del Proveedor"
                    isSelect={false}
                    value="supplier_name"
                    msgError="Por favor ingrese el nombre del proveedor"
                    error={!!errors.supplier_name}
                    helperText={errors.supplier_name?.message}
                    minLength={4}
                    maxLength={15}
                />
                <CustomInput
                    type="number"
                    label="Telefono del Proveedor"
                    isSelect={false}
                    value="phone"
                    msgError="Por favor ingrese el telefono del proveedor"
                    error={!!errors.phone}
                    helperText={errors.phone?.message}
                    minLength={8}
                    maxLength={25}
                />
                <CustomInput
                    type="text"
                    label="Producto o Materia"
                    isSelect={false}
                    value="primeProduct"
                    msgError="Por favor ingrese el nombre del producto o materia"
                    error={!!errors.primeProduct}
                    helperText={errors.primeProduct?.message}
                    minLength={5}
                    maxLength={20}
                />
            </CustomFormLayout>
        </FormProvider>
    )
}

export {SupplierAddForm}
import { useModalAlert } from "@/context/ModalContext";
import { useModifySupplierMutation } from "@/redux/api/supplierApi";
import { ISupplier, ISupplierDetails } from "@/utils/interfaces/ISupplier";
import { INewSupplier } from "@/utils/interfaces/registerModels/INewSupplier";
import { ApiErrorResponseType } from "@/utils/types/ApiErrorResponeType";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { CustomFormLayout } from "../../CustomFormLayout";
import { CustomInput } from "../../CustomInput";


interface SupplierModifyFormProps {
    supplierData: ISupplierDetails
}

const SupplierModifyForm: React.FC<SupplierModifyFormProps> = ({ supplierData }) => {
    const [modifySupplier, { isLoading }] = useModifySupplierMutation()
    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined)
    const methods = useForm<INewSupplier>()
    const { toggleModal, toggleErrorAlert, toggleSuccessAlert } = useModalAlert()
    const { handleSubmit, reset, formState: { errors } } = methods

    const onSubmit = async (dataForm: INewSupplier) => {
        const updatedSupplier: ISupplier = {
            _id: supplierData._id,
            supplier_name: dataForm.supplier_name,
            primeProduct: dataForm.primeProduct,
            phone: dataForm.phone,
            balance: supplierData.balance,
        }

        if (updatedSupplier.supplier_name !== supplierData.supplier_name || updatedSupplier.primeProduct !== supplierData.primeProduct || updatedSupplier.phone !== supplierData.phone) {
            try {
                await modifySupplier(updatedSupplier).unwrap()
                toggleSuccessAlert()
                reset()
                toggleModal()
            } catch (e) {
                const err = e as ApiErrorResponseType
                toggleErrorAlert()
                console.log(err.data.message);
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
                errorMessage={errorMessage}
                title="Modificar Proveedor"
                labelButton="Modificar"
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
                    defaultValue={supplierData.supplier_name}
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
                    defaultValue={supplierData.phone}
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
                    defaultValue={supplierData.primeProduct}
                />
            </CustomFormLayout>
        </FormProvider>
    )
}

export {SupplierModifyForm}
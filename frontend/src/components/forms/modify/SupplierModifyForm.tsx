import { useModifySupplierMutation } from "@/redux/api/supplierApi";
import { ISupplier, ISupplierDetails } from "@/utils/interfaces/ISupplier";
import { INewSupplier } from "@/utils/interfaces/registerModels/INewSupplier";
import { ApiErrorResponseType } from "@/utils/types/ApiErrorResponeType";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { CustomFormLayout } from "../../CustomFormLayout";
import { CustomInput } from "../../CustomInput";
import { useModalAlert } from "@/hooks/useModalAlert";
import { getCapitalizeString } from "@/utils/functionsHelper/getCapitalizeString";
import { inDeliveryOptions } from "@/utils/dataUtils/AllOptions";
import { CustomRadioGroup } from "@/components/CustomRadioGroup";


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
            supplier_name: getCapitalizeString(dataForm.supplier_name),
            primeProduct: dataForm.primeProduct,
            phone: dataForm.phone,
            balance: supplierData.balance,
            is_active: dataForm.is_active?.toString() === 'true'
        }

        if (updatedSupplier.supplier_name !== supplierData.supplier_name || updatedSupplier.primeProduct !== supplierData.primeProduct || updatedSupplier.phone !== supplierData.phone) {
            try {
                await modifySupplier(updatedSupplier).unwrap()
                toggleSuccessAlert('Proveedor modificado con éxito')
                reset()
                toggleModal()
            } catch (e) {
                const err = e as ApiErrorResponseType
                toggleErrorAlert('Error al modificar el proveedor')
                console.error(err.data.message)
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
                {!supplierData.is_active && <CustomRadioGroup 
                    label="Reactivar"
                    propertie="is_active"
                    error={!!errors.is_active}
                    options={inDeliveryOptions}
                    defaultValue={supplierData.is_active}
                />}
            </CustomFormLayout>
        </FormProvider>
    )
}

export {SupplierModifyForm}
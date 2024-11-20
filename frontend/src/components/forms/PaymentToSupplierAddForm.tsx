import { useAddPaymentToSupplierMutation } from "@/redux/api/paymentToSupplierApi";
import { RootState } from "@/redux/store";
import { ISupplier } from "@/utils/interfaces/ISupplier";
import { INewPaymentToSupplierValues } from "@/utils/interfaces/registerModels/INewPaymentToSupplierValues";
import { ApiErrorResponseType } from "@/utils/types/ApiErrorResponeType";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { CustomFormLayout } from "../CustomFormLayout";
import { CustomAutocomplete } from "../CustomAutocomplete";
import { CustomInput } from "../CustomInput";
import { IAutocompleteOption } from "@/utils/interfaces/IAutocompleteOptions";
import { paymentMethodOptions } from "@/utils/dataUtils/PaymentMethodsOptions.";
import { useModalAlert } from "@/context/ModalContext";

const PaymentToSupplierAddForm: React.FC<object> = () => {

    const [addPaymentToSupplier, {isLoading}] = useAddPaymentToSupplierMutation()
    const {suppliers} = useSelector((state: RootState) => state.supplier.allSuppliers)
    const { toggleModal, toggleErrorAlert, toggleSuccessAlert } = useModalAlert()
    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined)
    const methods = useForm<INewPaymentToSupplierValues>()
    const {
        handleSubmit,
        reset,
        formState: {errors} 
    } = methods

    const onSubmit = async (dataForm: INewPaymentToSupplierValues) => {
        console.log(dataForm);
        const dataProsseced = {
            ...dataForm,
            total_payment: Number(dataForm.total_payment)
        }
        try{
            const response = await addPaymentToSupplier(dataProsseced).unwrap()
            console.log(response);
            toggleSuccessAlert()
            toggleModal()
            reset()
        } catch(e){
            const err = e as ApiErrorResponseType
            toggleErrorAlert()
            console.log(err)
            setErrorMessage(err.data.message)
        }
    }

    const suppliersOptions: IAutocompleteOption[] = suppliers?.map((supplier: ISupplier) => ({
        label: supplier.supplier_name,
        id: supplier._id
    }))

    return (
        <FormProvider {...methods}>
            <CustomFormLayout 
                handleSubmit={handleSubmit(onSubmit)}
                title="Crear Pago"
                labelButton="Crear"
                isLoading={isLoading}
                errorMessage={errorMessage}
            >
                <CustomAutocomplete
                    label="Ingrese el proveedor"
                    name="supplier_name"
                    idName="supplier_id"
                    options={suppliersOptions}
                />
                <CustomInput
                    type="number"
                    label="Total del Pago"
                    isSelect={false}
                    value="total_payment"
                    msgError="Por favor ingrese un monto mayor a 0"
                    error={!!errors.total_payment}
                    helperText={errors.total_payment?.message}
                    min={1}
                />
                <CustomInput 
                    type="text"
                    label="Metodo de Pago"
                    isSelect={true}
                    selectOptions={paymentMethodOptions}
                    value="payment_method"
                    msgError="Por favor ingrese el metodo de pago"
                    error={!!errors.payment_method}
                    helperText={errors.payment_method?.message}
                    min={1}
                />
            </CustomFormLayout>
        </FormProvider>
    )
}

export { PaymentToSupplierAddForm }
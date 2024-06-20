import { useAddPurchaseMutation } from "@/redux/api/purchaseApi";
import { RootState } from "@/redux/store";
import { INewPurchaseValues } from "@/utils/interfaces/registerModels/INewPurchase";
import { FormAddProps } from "@/utils/types/FormAddProps";
import { useState } from "react";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { AutocompleteOption } from "./PaymentAddForm";
import { ISupplier } from "@/utils/interfaces/ISupplier";
import { CustomFormLayout } from "../CustomFormLayout";
import { CustomAutocomplete } from "../CustomAutocomplete";
import { Stack } from "@mui/material";
import { CustomInput } from "../CustomInput";


const PurchaseAddForm: React.FC<FormAddProps> = ({confirmAlertSucess, confirmErrorAlert, onCloseModal}) => {
    
    const [addPurchase, {isLoading}] = useAddPurchaseMutation()
    const {suppliers} = useSelector((state: RootState) => state.supplier.allSuppliers)
    const [errorMessage, setErrorMessage] = useState<string|undefined>(undefined)
    const methods = useForm<INewPurchaseValues>({
        defaultValues: {
            purchaseDetails: [{product_name: '', quantity: 1, unity_price: 0}]
        }
    })
    const {
        handleSubmit,
        control,
        reset,
        formState: {errors}
    } = methods

    const { fields, append, remove } = useFieldArray({
        control,
        name:'purchaseDetails'
    })

    const onSubmit = (dataForm: INewPurchaseValues) => {
        console.log(dataForm);
    }

    const supplierOptions: AutocompleteOption[] = suppliers.map((supplier: ISupplier) => ({
        label: supplier.supplier_name,
        id: supplier._id
    })) || []


    return (
        <FormProvider {...methods}>
                <CustomFormLayout
                    handleSubmit={(handleSubmit(onSubmit))}
                    title="Crear Compra"
                    labelButton="Crear"
                    isLoading={isLoading}
                    errorMessage={errorMessage}
                >
                    <CustomAutocomplete 
                        label="Ingrese el proveedor"
                        name="supplier_name"
                        idName="supplier_id"
                        options={supplierOptions}
                    />
                    {fields.map((field, index) => (
                        <Stack key={field.id} spacing={2} sx={{ marginBottom: '1rem' }}>
                            <CustomInput
                                type="text"
                                label="Producto"
                                isSelect={false}
                                value={`details.${index}.product_name`}
                                msgError="Por favor ingrese un producto"
                                error={!!errors.purchaseDetails?.[index]?.product_name}
                                helperText={errors.purchaseDetails?.[index]?.product_name?.message}
                            />
                            <CustomInput 
                                type="number"
                                label="Cantidad"
                                isSelect={false}
                                value={`details.${index}.quantity`}
                                msgError="Por favor ingrese una cantidad"
                                error={!!errors.purchaseDetails?.[index]?.quantity}
                                helperText={errors.purchaseDetails?.[index]?.quantity?.message}
                        />
                        </Stack>
                    ))}
                </CustomFormLayout>
        </FormProvider>
    )
}

export {PurchaseAddForm}


///   SEGUIR LA RECOMENDACION DE GPT,
///   MODIFICAR LOS ESTILOS, Y AGREGAR EN ALGUN LADO LA DISTINCION DE DETALLE.
///   
///  
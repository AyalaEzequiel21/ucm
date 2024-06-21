import { useAddPurchaseMutation } from "@/redux/api/purchaseApi";
import { RootState } from "@/redux/store";
import { INewPurchaseValues } from "@/utils/interfaces/registerModels/INewPurchase";
import { FormAddProps } from "@/utils/types/FormAddProps";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { AutocompleteOption } from "./PaymentAddForm";
import { ISupplier } from "@/utils/interfaces/ISupplier";
import { CustomFormLayout } from "../CustomFormLayout";
import { CustomAutocomplete } from "../CustomAutocomplete";
import { IPurchaseDetails } from "@/utils/interfaces/IPurchase";


const PurchaseAddForm: React.FC<FormAddProps> = ({confirmAlertSucess, confirmErrorAlert, onCloseModal}) => {
    
    const [addPurchase, {isLoading}] = useAddPurchaseMutation()
    const {suppliers} = useSelector((state: RootState) => state.supplier.allSuppliers)
    const [errorMessage, setErrorMessage] = useState<string|undefined>(undefined)
    const [details, setDetails] = useState<IPurchaseDetails[]>([]);
    const methods = useForm<INewPurchaseValues>()
    const {
        handleSubmit,
        control,
        reset,
        setValue, 
        getValues,
        formState: {errors}
    } = methods

    const onSubmit = (dataForm: INewPurchaseValues) => {
        console.log(dataForm);
    }

    const supplierOptions: AutocompleteOption[] = suppliers.map((supplier: ISupplier) => ({
        label: supplier.supplier_name,
        id: supplier._id
    })) || []

    const addDetail = () => {
        const detail = getValues('purchaseDetails')
        setDetails([...details, { 
            product_id: detail[1], 
            product_name: detail[0], 
            quantity: Number(detail[2]), 
            unity_price: Number(detail[3]) 
        }])
        reset({
            purchaseDetails: [{ product_id: '', product_name: '', quantity: 1, price: 0 }]
        })
    }

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
                   
                </CustomFormLayout>
        </FormProvider>
    )
}

export {PurchaseAddForm}


///   SEGUIR LA RECOMENDACION DE GPT,
///   MODIFICAR LOS ESTILOS, Y AGREGAR EN ALGUN LADO LA DISTINCION DE DETALLE.
///   
///  
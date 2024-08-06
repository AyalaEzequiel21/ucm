import { useAddPurchaseMutation } from "@/redux/api/purchaseApi";
import { RootState } from "@/redux/store";
import { INewPurchaseValues, IOnlyPurchase } from "@/utils/interfaces/registerModels/INewPurchase";
import { FormAddProps } from "@/utils/types/FormAddProps";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { ISupplier } from "@/utils/interfaces/ISupplier";
import { CustomFormLayout } from "../CustomFormLayout";
import { CustomAutocomplete } from "../CustomAutocomplete";
import { IPurchaseDetails } from "@/utils/interfaces/IPurchase";
import { Stack, Typography, useTheme } from "@mui/material";
import { PurchaseDetailsForm } from "./PurchaseDetailsForm";
import { getCapitalizeString } from "@/utils/functionsHelper/getCapitalizeString";
import { IAutocompleteOption } from "@/utils/interfaces/IAutocompleteOptions";
import { DetailsFormLayout } from "./DetailsFormLayout";


const PurchaseAddForm: React.FC<FormAddProps> = ({confirmAlertSucess, confirmErrorAlert, onCloseModal}) => {
    
    const {palette} = useTheme()
    const [addPurchase, {isLoading}] = useAddPurchaseMutation()
    const {suppliers} = useSelector((state: RootState) => state.supplier.allSuppliers)
    const [errorMessage, setErrorMessage] = useState<string|undefined>(undefined)
    const [detailsPurchase, setDetailsPurchase] = useState<IPurchaseDetails[]>([])
    const methods = useForm<IOnlyPurchase>({
        defaultValues: {
            supplier_id: '',
            supplier_name: '',
        }
    })
    const {
        handleSubmit,
    } = methods

    const onAddDetail = (detail: IPurchaseDetails) => {
        setDetailsPurchase(prev => [...prev, detail])
    }

    const onRemoveDetail = (index: number) => {
        setDetailsPurchase(prev => prev.filter((_, i) => i !== index));
      }

    const onSubmit = async(dataForm: IOnlyPurchase) => {
        if(dataForm.supplier_id && detailsPurchase.length > 0){
            const data: INewPurchaseValues = {...dataForm, purchaseDetail: detailsPurchase }
            console.log(data)
            try {
                await addPurchase(data).unwrap();
                confirmAlertSucess('Compra registrada');
                onCloseModal();
              } catch (error) {
                setErrorMessage(`Error al agregar la compra`)
                console.log(error)
                confirmErrorAlert()
              } 
        } else {
            setErrorMessage('Seleccione un proveedor y agregue al menos un detalle.');
          }
    }

    const supplierOptions: IAutocompleteOption[] = suppliers.map((supplier: ISupplier) => ({
        label: supplier.supplier_name,
        id: supplier._id
    })) || []

   

    return (
        <FormProvider {...methods}>
                <CustomFormLayout
                    handleSubmit={handleSubmit(onSubmit)}
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
                   <Stack direction="column" spacing={2.5}>
                        <PurchaseDetailsForm onAddDetail={onAddDetail}/>
                        <Typography variant="h5" sx={{color: palette.primary.dark,mb: '0.2rem'}}>Detalle</Typography>
                        <DetailsFormLayout
                            details={detailsPurchase}
                            renderDetail={detail => `-${getCapitalizeString(detail.product_name)}: ${detail.quantity}kg x ${detail.unity_price} = ${(detail.quantity * detail.unity_price).toFixed(2)}`}
                            onRemoveDetail={onRemoveDetail}
                        />
                   </Stack>
                </CustomFormLayout>
        </FormProvider>
    )
}

export {PurchaseAddForm}

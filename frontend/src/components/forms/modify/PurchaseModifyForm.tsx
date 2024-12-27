import { useModifyPurchaseMutation } from "@/redux/api/purchaseApi";
import { getCapitalizeString } from "@/utils/functionsHelper/getCapitalizeString";
import { IPurchaseDetails, IPurchaseForDetails } from "@/utils/interfaces/IPurchase";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { CustomFormLayout } from "../../CustomFormLayout";
import { Stack, Typography, useTheme } from "@mui/material";
import { PurchaseDetailsForm } from "./../PurchaseDetailsForm";
import { DetailsFormLayout } from "./../DetailsFormLayout";
import { getFormatedValue } from "@/utils/functionsHelper/getFormatedValue";
import { useModalAlert } from "@/hooks/useModalAlert";
import { ApiErrorResponseType } from "@/utils/types/ApiErrorResponeType";

interface PurchaseModifyFormProps {
    purchaseData: IPurchaseForDetails
}
const PurchaseModifyForm: React.FC<PurchaseModifyFormProps> = ({ purchaseData }) => {
    const {palette} = useTheme()
    const [modifyPurchase, { isLoading }] = useModifyPurchaseMutation()
    const [errorMessage, setErrorMessage] = useState<string|undefined>(undefined)
    const [detailsPurchase, setDetailsPurchase] = useState<IPurchaseDetails[]>(purchaseData.purchaseDetail)
    const methods = useForm<IPurchaseDetails>({
        defaultValues: {
            product_name: '',
            quantity: 1,
            unity_price: 0,
        }
    })
    const { toggleModal, toggleErrorAlert, toggleSuccessAlert } = useModalAlert()
    const { handleSubmit, reset } = methods

    const onAddDetail = (detail: IPurchaseDetails) => {
        setDetailsPurchase(prev => {
            const exists = prev.some(item => item.product_name === detail.product_name)
            if(exists){
                setErrorMessage(`Ya se agrego el producto ${getCapitalizeString(detail.product_name)}`)
                return prev
            }
            setErrorMessage(undefined)
            return [...prev, detail]
        })
    }

    const onRemoveDetail = (index: number) => {
        setDetailsPurchase(prev => prev.filter((_, i) => i !== index));
    }

    const hasChanges = () => {
        if(detailsPurchase.length !== purchaseData.purchaseDetail.length) return true
        return detailsPurchase.some((detail, index) => {
            const original = purchaseData.purchaseDetail[index]
            return(
                detail.product_name !== original.product_name ||
                detail.quantity !== original.quantity ||
                detail.unity_price !== original.unity_price
            )
        })
    }

    const onSubmit = async() => {
        if (!hasChanges()) {
            setErrorMessage('No se realizaron cambios en la compra.');
            return;
        }
        try {
            setErrorMessage(undefined);
            await modifyPurchase({ ...purchaseData, purchaseDetail: detailsPurchase }).unwrap()
            toggleSuccessAlert('Compra modificada con éxito')
            reset()
            toggleModal()
        } catch (error) {
            const err = error as ApiErrorResponseType
            console.error(error);
            setErrorMessage(err.data.message)
            toggleErrorAlert('Error al modificar la compra.')
        }
    }

    return (
        <FormProvider {...methods}>
            <CustomFormLayout
                handleSubmit={handleSubmit(onSubmit)}
                title="Modificar Compra"
                labelButton="Modificar"
                isLoading={isLoading}
                errorMessage={errorMessage}
            >
                <Stack direction="column" spacing={2.5}>
                    <PurchaseDetailsForm onAddDetail={onAddDetail}/>
                    <Typography variant="h5" sx={{color: palette.primary.dark,mb: '0.2rem'}}>Detalle</Typography>
                    <DetailsFormLayout
                        details={detailsPurchase}
                        renderDetail={detail => `-${getCapitalizeString(detail.product_name)}:\n${detail.quantity}kg x ${detail.unity_price} = ${getFormatedValue(detail.quantity * detail.unity_price)}`}
                        onRemoveDetail={onRemoveDetail}
                        totalAdd={detailsPurchase.length > 0 ? detailsPurchase.reduce((total, detail) => total + detail.quantity * detail.unity_price, 0) : undefined}
                    />
                </Stack>
            </CustomFormLayout>
        </FormProvider>
    )

}

export {PurchaseModifyForm}
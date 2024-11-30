import { useModalAlert } from "@/context/ModalContext";
import { useModifySaleMutation } from "@/redux/api/saleApi";
import { getCapitalizeString } from "@/utils/functionsHelper/getCapitalizeString";
import { IDetailsSale, ISaleDetails } from "@/utils/interfaces/ISale";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { CustomFormLayout } from "../CustomFormLayout";
import { Stack, Typography, useTheme } from "@mui/material";
import { SaleDetailsForm } from "./SaleDetailsForm";
import { DetailsFormLayout } from "./DetailsFormLayout";
import { getFormatedValue } from "@/utils/functionsHelper/getFormatedValue";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

interface SaleModifyFormProps {
    saleData: IDetailsSale
}

const SaleModifyForm: React.FC<SaleModifyFormProps> = ({ saleData }) => {
    const {clients} = useSelector((state: RootState) => state.client.allClients)
    const {palette} = useTheme()
    const [modifySale, { isLoading }] = useModifySaleMutation()
    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined)
    const [detailsSale, setDetailsSale] = useState<ISaleDetails[]>(saleData.details)
    const methods = useForm<ISaleDetails>({
        defaultValues: {
            product_name: '',
            price: 0,
            quantity: 1,
        }
    })
    const getClientCategory = (clientId: string) => {
        const client = clients.find(client => client._id === clientId)
        return client?.category
    }
    
    const { handleSubmit, reset } = methods
    const { toggleModal, toggleErrorAlert, toggleSuccessAlert } = useModalAlert()

    const onAddDetail = (detail: ISaleDetails) => {
        setDetailsSale(prev => {
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
        setDetailsSale(prev => prev.filter((_, i) => i !== index));
    }

    const hasChanges = () => {
        if(detailsSale.length !== saleData.details.length) return true
        return detailsSale.some((detail, index) => {
            const original = saleData.details[index]
            return(
                detail.product_name !== original.product_name ||
                detail.quantity !== original.quantity ||
                detail.price !== original.price
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
            const {createdAt, payment, ...newSale} = saleData
            void createdAt
            void payment
            await modifySale({...newSale, details: detailsSale}).unwrap()
            toggleSuccessAlert()
            reset()
            toggleModal()
        } catch (error) {
            console.error(error);
            toggleErrorAlert()
        }
    }

    return(
        <FormProvider {...methods}>
            <CustomFormLayout
                handleSubmit={handleSubmit(onSubmit)}
                title="Modificar Venta"
                labelButton="Modificar"
                isLoading={isLoading}
                errorMessage={errorMessage}
            >
                <Stack direction="column" spacing={2.5}>
                    <SaleDetailsForm onAddDetail={onAddDetail} clientCategory={getClientCategory(saleData.client_id) || null}/>
                    <Typography variant="h5" sx={{color: palette.primary.dark,mb: '0.2rem'}}>Detalle</Typography>
                    <DetailsFormLayout
                        details={detailsSale}
                        renderDetail={detail => `-${getCapitalizeString(detail.product_name)}:\n${detail.quantity}kg x ${detail.price} = ${getFormatedValue(detail.quantity * detail.price)}`}
                        onRemoveDetail={onRemoveDetail}
                        totalAdd={detailsSale.length > 0 ? detailsSale.reduce((total, detail) => total + detail.quantity * detail.price, 0) : undefined}
                    />
                </Stack>
            </CustomFormLayout>
        </FormProvider>
    )
}

export { SaleModifyForm }
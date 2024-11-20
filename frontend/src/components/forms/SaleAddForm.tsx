import { useAddSaleMutation } from "@/redux/api/saleApi";
import { RootState } from "@/redux/store";
import { ISale, ISaleDetails } from "@/utils/interfaces/ISale";
import { INewSaleValues, IOnlySale } from "@/utils/interfaces/registerModels/INewSaleValues";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { CustomFormLayout } from "../CustomFormLayout";
import { CustomAutocomplete } from "../CustomAutocomplete";
import { Accordion, AccordionDetails, AccordionSummary, Box, Stack, Typography, useTheme } from "@mui/material";
import { getCapitalizeString } from "@/utils/functionsHelper/getCapitalizeString";
import { SaleDetailsForm } from "./SaleDetailsForm";
import { IAutocompleteOption } from "@/utils/interfaces/IAutocompleteOptions";
import { DetailsFormLayout } from "./DetailsFormLayout";
import { getFormatedValue } from "@/utils/functionsHelper/getFormatedValue";
import { CategoryType } from "@/utils/types/CategoryType";
import { PaymentInSaleForm } from "./PaymentInSaleForm";
import { useModalAlert } from "@/context/ModalContext";

const SaleAddForm: React.FC<object> = () => {

    const {palette} = useTheme()
    const [addSale, {isLoading}] = useAddSaleMutation()
    const {clients} = useSelector((state: RootState) => state.client.allClients)
    const { toggleModal, toggleErrorAlert, toggleSuccessAlert } = useModalAlert()
    const [errorMessage, setErrorMessage] = useState<string|undefined>(undefined)
    const [detailsSale, setDetailsSale] = useState<ISaleDetails[]>([])
    const [selectedClientCategory, setSelectedClientCategory] = useState<CategoryType | null>(null)
    const [isAddingPayment, setIsAddingPayment] = useState(false)
    const methods = useForm<ISale>({
        defaultValues: {
            client_name: '',
            details: [],
            payment: {
                amount: 0,
                payment_method: 'efectivo'
            }
        }
    })
    const { 
        handleSubmit, 
        watch, 
        // formState: {errors} 
    } = methods
    const onAddDetail = (detail: ISaleDetails) => {
        setDetailsSale(prev => {
            const exists = prev.some(item => item.product_id === detail.product_id)
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

    const onSubmit = async(dataForm: IOnlySale) => {  
              
        if(dataForm.client_id && detailsSale.length > 0){
            const data: INewSaleValues = {
                ...dataForm, 
                details: detailsSale, 
                payment: (isAddingPayment && dataForm.payment) ? {
                    client_name: dataForm.client_name,
                    client_id: dataForm.client_id,
                    amount: Number(dataForm.payment?.amount),
                    payment_method: dataForm.payment?.payment_method
                } : null
            }            
            try {                
                await addSale(data).unwrap();
                toggleSuccessAlert()
                toggleModal()
              } catch (error) {  
                setErrorMessage(`Error al agregar la venta`)
                toggleErrorAlert()
              } 
        } else {
            setErrorMessage('Seleccione un cliente y agregue al menos un detalle.');
          }
    }

    const clientsOptions: IAutocompleteOption[] = clients.map((client) => ({
        label: client.fullname,
        id: client._id
    })) || []
    
    const selectedClientId = watch('client_id')

    useEffect(()=> {
        const client = clients.find(c => c._id === selectedClientId)
        if(client){
            setSelectedClientCategory(client.category)
        }        
    }, [selectedClientId, clients, isAddingPayment])

    return(
        <FormProvider {...methods}>
            <CustomFormLayout 
                handleSubmit={handleSubmit(onSubmit)}
                title="Crear Venta"
                labelButton="Crear"
                isLoading={isLoading}
                errorMessage={errorMessage}
            >
                <CustomAutocomplete
                    label="Ingrese el cliente"
                    name="client_name"
                    idName="client_id"
                    options={clientsOptions}
                />
                <Stack direction={"column"} spacing={2.5}>
                    <SaleDetailsForm onAddDetail={onAddDetail} clientCategory={selectedClientCategory}/>
                    <Typography variant="h5" sx={{color: palette.primary.dark,mb: '0.2rem'}}>Detalle</Typography>
                    <DetailsFormLayout
                        details={detailsSale}
                        renderDetail={detail => `${getCapitalizeString(detail.product_name)}:\n${detail.quantity}kg x ${detail.price} = ${getFormatedValue(detail.quantity * detail.price)}`}
                        onRemoveDetail={onRemoveDetail}
                        totalAdd={detailsSale.length > 0 ? detailsSale.reduce((total, detail) => total + (detail.quantity * detail.price), 0): undefined}
                    />
                </Stack>
                <Box width={'100%'}>
                    <Accordion 
                        sx={{backgroundColor: palette.grey[200]}}
                        onChange={(_, expanded) => {
                            setIsAddingPayment(expanded);
                        }}
                    >
                        <AccordionSummary>
                            <Typography variant="h5" sx={{color: palette.primary.dark,mb: '0.2rem'}}>Agregar Pago</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            {isAddingPayment && <PaymentInSaleForm />}
                        </AccordionDetails>
                    </Accordion>
                </Box>
            </CustomFormLayout>
        </FormProvider>
    )
}

export {SaleAddForm}
import { useAddSaleMutation } from "@/redux/api/saleApi";
import { RootState } from "@/redux/store";
import { ISale, ISaleDetails } from "@/utils/interfaces/ISale";
import { INewSaleValues, IOnlySale } from "@/utils/interfaces/registerModels/INewSaleValues";
import { FormAddProps } from "@/utils/types/FormAddProps";
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

const SaleAddForm: React.FC<FormAddProps> = ({confirmAlertSucess, confirmErrorAlert, onCloseModal}) => {

    const {palette} = useTheme()
    const [addSale, {isLoading}] = useAddSaleMutation()
    const {clients} = useSelector((state: RootState) => state.client.allClients)
    const [errorMessage, setErrorMessage] = useState<string|undefined>(undefined)
    const [detailsSale, setDetailsSale] = useState<ISaleDetails[]>([])
    const [selectedClientCategory, setSelectedClientCategory] = useState<CategoryType | null>(null)
    const [isAddingPayment, setIsAddingPayment] = useState(false)
    const methods = useForm<ISale>({
        defaultValues: {
            client_name: '',
            details: [],
            payment: null
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
        console.log(dataForm);
              
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
                console.log(data)
                
                await addSale(data).unwrap();
                confirmAlertSucess('Venta registrada');
                onCloseModal();
              } catch (error) {  
                setErrorMessage(`Error al agregar la venta`)
                console.log(error)
                confirmErrorAlert()
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
        // console.log(methods.getValues(), isAddingPayment);
        
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
                            if (!expanded) {
                                // Limpiar los valores del pago si el acordeón se cierra
                                // methods.setValue('payment.amount', 0);
                                // methods.setValue('payment.payment_method', 'efectivo');
                            }
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
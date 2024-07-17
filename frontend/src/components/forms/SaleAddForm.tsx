import { useAddSaleMutation } from "@/redux/api/saleApi";
import { RootState } from "@/redux/store";
import { ISaleDetails } from "@/utils/interfaces/ISale";
import { INewSaleValues, IOnlySale } from "@/utils/interfaces/registerModels/INewSale";
import { FormAddProps } from "@/utils/types/FormAddProps";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { CustomFormLayout } from "../CustomFormLayout";
import { CustomAutocomplete } from "../CustomAutocomplete";
import { AutocompleteOption } from "./PaymentAddForm";
import { Box, IconButton, Stack, Typography, useTheme } from "@mui/material";
import { Close } from "@mui/icons-material";
import { getCapitalizeString } from "@/utils/functionsHelper/getCapitalizeString";
import { SaleDetailsForm } from "./SaleDetailsForm";


const SaleAddForm: React.FC<FormAddProps> = ({confirmAlertSucess, confirmErrorAlert, onCloseModal}) => {

    const {palette} = useTheme()
    const [addSale, {isLoading}] = useAddSaleMutation()
    const {clients} = useSelector((state: RootState) => state.client.allClients)
    const [errorMessage, setErrorMessage] = useState<string|undefined>(undefined)
    const [detailsSale, setDetailsSale] = useState<ISaleDetails[]>([])
    const methods = useForm<IOnlySale>({
        defaultValues: {
            client_id: '',
            client_name: '',
        }
    })
    const { handleSubmit } = methods
    const onAddDetail = (detail: ISaleDetails) => {
        setDetailsSale(prev => [...prev, detail])
    }

    const onRemoveDetail = (index: number) => {
        setDetailsSale(prev => prev.filter((_, i) => i !== index));
    }

    const onSubmit = async(dataForm: IOnlySale) => {
        if(dataForm.client_id && detailsSale.length > 0){
            const data: INewSaleValues = {...dataForm, saleDetails: detailsSale }
            console.log(data)
            try {
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

    const clientsOptions: AutocompleteOption[] = clients.map((client) => ({
        label: client.fullname,
        id: client._id
    })) || []

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
                    <SaleDetailsForm onAddDetail={onAddDetail}/>
                    <Typography variant="h5" sx={{color: palette.primary.dark,mb: '0.2rem'}}>Detalle</Typography>
                    <Box>
                        {detailsSale.map((detail, index) => (
                            <>
                                <Stack key={index} direction="row" spacing={1} alignItems="center" justifyContent={'center'} paddingBottom={'0.3rem'}>
                                    <Typography sx={{fontSize: '13px', fontWeight: 'bold', color: palette.primary.dark, textAlign: 'start', width: '100%'}}>
                                        -{getCapitalizeString(detail.product_name)}: {detail.quantity}kg x ${detail.price} = ${(detail.quantity * detail.price).toFixed(2)}
                                    </Typography>
                                    <IconButton onClick={() => onRemoveDetail(index)}><Close sx={{color: palette.primary.dark}}/></IconButton>
                                </Stack>
                            </>
                        ))}
                    </Box>
                </Stack>
            </CustomFormLayout>
        </FormProvider>
    )
}

export {SaleAddForm}
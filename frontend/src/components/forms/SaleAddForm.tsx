import { useAddSaleMutation } from "@/redux/api/saleApi";
import { RootState } from "@/redux/store";
import { ISaleDetails } from "@/utils/interfaces/ISale";
import { INewSaleValues, IOnlySale } from "@/utils/interfaces/registerModels/INewSale";
import { FormAddProps } from "@/utils/types/FormAddProps";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { CustomFormLayout } from "../CustomFormLayout";
import { CustomAutocomplete } from "../CustomAutocomplete";
import { Stack, Typography, useTheme } from "@mui/material";
import { getCapitalizeString } from "@/utils/functionsHelper/getCapitalizeString";
import { SaleDetailsForm } from "./SaleDetailsForm";
import { IAutocompleteOption } from "@/utils/interfaces/IAutocompleteOptions";
import { DetailsFormLayout } from "./DetailsFormLayout";
import { getFormatedValue } from "@/utils/functionsHelper/getFormatedValue";
import { CategoryType } from "@/utils/types/CategoryType";

const SaleAddForm: React.FC<FormAddProps> = ({confirmAlertSucess, confirmErrorAlert, onCloseModal}) => {

    const {palette} = useTheme()
    const [addSale, {isLoading}] = useAddSaleMutation()
    const {clients} = useSelector((state: RootState) => state.client.allClients)
    const [errorMessage, setErrorMessage] = useState<string|undefined>(undefined)
    const [detailsSale, setDetailsSale] = useState<ISaleDetails[]>([])
    const [selectedClientCategory, setSelectedClientCategory] = useState<CategoryType | null>(null)
    const methods = useForm<IOnlySale>({
        defaultValues: {
            client_id: '',
            client_name: '',
        }
    })
    const { handleSubmit, watch } = methods
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
            const data: INewSaleValues = {...dataForm, details: detailsSale }
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
    }, [selectedClientId, clients])

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
            </CustomFormLayout>
        </FormProvider>
    )
}

export {SaleAddForm}
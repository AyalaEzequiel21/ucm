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


const SaleAddForm: React.FC<FormAddProps> = ({confirmAlertSucess, confirmErrorAlert, onCloseModal}) => {

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

            </CustomFormLayout>
        </FormProvider>
    )
}

export {SaleAddForm}
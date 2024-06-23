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
import { Box, Button, Stack, Typography, useTheme } from "@mui/material";
import { CustomInput } from "../CustomInput";


const PurchaseAddForm: React.FC<FormAddProps> = ({confirmAlertSucess, confirmErrorAlert, onCloseModal}) => {
    
    const {palette} = useTheme()
    const [addPurchase, {isLoading}] = useAddPurchaseMutation()
    const {suppliers} = useSelector((state: RootState) => state.supplier.allSuppliers)
    const [errorMessage, setErrorMessage] = useState<string|undefined>(undefined)
    const [details, setDetails] = useState<IPurchaseDetails[]>([]);
    const methods = useForm<INewPurchaseValues>()
    const {
        handleSubmit,
        reset, control, setValue, getValues,
        formState: {errors}
    } = methods

    const onSubmit = (dataForm: INewPurchaseValues) => {
        
        console.log(dataForm)
    }

    const supplierOptions: AutocompleteOption[] = suppliers.map((supplier: ISupplier) => ({
        label: supplier.supplier_name,
        id: supplier._id
    })) || []

    const addDetail = () => {
        const currentValues = getValues();
        const newDetail: IPurchaseDetails = {
            product_name: currentValues.purchaseDetails[0].product_name,
            quantity: Number(currentValues.purchaseDetails[0].quantity),
            unity_price: Number(currentValues.purchaseDetails[0].unity_price),
        };
        setDetails([...details, newDetail]);
        setValue('purchaseDetails.product_name', '');
        setValue('purchaseDetails.quantity', 1);
        setValue('purchaseDetails.unity_price', 0);
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
                   <Stack direction="column" spacing={2.5}>
                        <CustomInput
                            type="text"
                            label="Producto"
                            isSelect={false}
                            value="purchaseDetails.product_name"
                            msgError="Por favor ingrese un producto"
                            error={!!errors.purchaseDetails}
                            helperText={errors.purchaseDetails?.message}
                        />
                        <Stack direction='row' spacing={1}>
                            <CustomInput
                                type="number"
                                label="Cantidad"
                                isSelect={false}
                                value="quantity"
                                msgError="Por favor ingrese un monto mayor a 0"
                                error={!!errors.purchaseDetails}
                                helperText={errors.quantity?.message}
                                min={1}
                            />
                            <CustomInput 
                                type="number"
                                label="Precio"
                                isSelect={false}
                                value="unity_price"
                                msgError="Por favor ingrese un monto mayor a 0"
                                error={!!errors.purchaseDetails}
                                helperText={errors.unity_price?.message}
                                min={1}
                            />
                            <Button variant="outlined" onClick={addDetail}>Agregar</Button>
                        </Stack>
                        <Typography variant="h5" sx={{color: palette.primary.dark,mb: '0.2rem'}}>Detalle</Typography>
                        <Box>
                            {details.map((detail, index) => (
                                <Stack key={index} direction="row" spacing={1} alignItems="center">
                                    <Typography variant="h6">{detail.product_name}: {detail.quantity}kg x ${detail.unity_price}</Typography>
                                    <Button variant="outlined" color="error" onClick={() => {}}>Eliminar</Button>
                                </Stack>
                            ))}
                        </Box>
                   </Stack>
                </CustomFormLayout>
        </FormProvider>
    )
}

export {PurchaseAddForm}


///   SEGUIR LA RECOMENDACION DE GPT,
///   MODIFICAR LOS ESTILOS, Y AGREGAR EN ALGUN LADO LA DISTINCION DE DETALLE.
///   
///  
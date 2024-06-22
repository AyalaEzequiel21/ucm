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
    const methods = useForm<INewPurchaseValues>({
        defaultValues: {
            purchaseDetails: [
                {
                    product_name:'alga',
                    quantity: 10,
                    unity_price: 500
                },
                {
                    product_name:'lechuga',
                    quantity: 10,
                    unity_price: 500
                }
            ]
        }
    })
    const {
        handleSubmit,
        control,
        reset,
        setValue, 
        getValues,
        formState: {errors}
    } = methods

    const onSubmit = (dataForm: INewPurchaseValues) => {
        const values = getValues('purchaseDetails')
        console.log(dataForm, values)
    }

    const supplierOptions: AutocompleteOption[] = suppliers.map((supplier: ISupplier) => ({
        label: supplier.supplier_name,
        id: supplier._id
    })) || []

    // const addDetail = () => {
    //     const detail = getValues('purchaseDetails')
    //     setDetails([...details, { 
    //         product_id: detail[1], 
    //         product_name: detail[0], 
    //         quantity: Number(detail[2]), 
    //         unity_price: Number(detail[3]) 
    //     }])
    //     reset({
    //         purchaseDetails: [{ product_id: '', product_name: '', quantity: 1, price: 0 }]
    //     })
    // }

    const addDetail = () => {
        const values = getValues('purchaseDetails')
        console.log(values);
        
        // setDetails([...details], {
        //     product_id: values[0], 
        //     product_name: values[0], 
        //     quantity: Number(values[2]), 
        //     unity_price: Number(values[3])
        // })

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
                                value="purchaseDetails.quantity"
                                msgError="Por favor ingrese un monto mayor a 0"
                                error={!!errors.purchaseDetails}
                                helperText={errors.purchaseDetails?.quantity.message}
                                min={1}
                            />
                            <CustomInput 
                                type="number"
                                label="Precio"
                                isSelect={false}
                                value="purchaseDetails.unity_price"
                                msgError="Por favor ingrese un monto mayor a 0"
                                error={!!errors.purchaseDetails}
                                helperText={errors.purchaseDetails?.unity_price.message}
                                min={1}
                            />
                            <Button variant="outlined" onClick={addDetail}>Agregar</Button>
                        </Stack>
                        <Typography variant="h5" sx={{color: palette.primary.dark,mb: '0.2rem'}}>Detalle</Typography>
                        <Box>
                            {details.map((detail, index) => (
                                <Stack key={index} direction="row" spacing={2} alignItems="center">
                                <Typography>{detail.product_name} - Cantidad: {detail.quantity} - Precio: ${detail.unity_price}</Typography>
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
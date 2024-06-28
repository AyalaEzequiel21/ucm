import { useAddPurchaseMutation } from "@/redux/api/purchaseApi";
import { RootState } from "@/redux/store";
import { INewPurchaseValues } from "@/utils/interfaces/registerModels/INewPurchase";
import { FormAddProps } from "@/utils/types/FormAddProps";
import { useState } from "react";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { AutocompleteOption } from "./PaymentAddForm";
import { ISupplier } from "@/utils/interfaces/ISupplier";
import { CustomFormLayout } from "../CustomFormLayout";
import { CustomAutocomplete } from "../CustomAutocomplete";
import { IPurchaseDetails } from "@/utils/interfaces/IPurchase";
import { Box, Button, IconButton, Stack, Typography, useTheme } from "@mui/material";
import { CustomInput } from "../CustomInput";
import { Close } from "@mui/icons-material";


const PurchaseAddForm: React.FC<FormAddProps> = ({confirmAlertSucess, confirmErrorAlert, onCloseModal}) => {
    
    const {palette} = useTheme()
    const [addPurchase, {isLoading}] = useAddPurchaseMutation()
    const {suppliers} = useSelector((state: RootState) => state.supplier.allSuppliers)
    const [errorMessage, setErrorMessage] = useState<string|undefined>(undefined)
    const [detailsPurchase, setDetailsPurchase] = useState<IPurchaseDetails[]>([])
    const methods = useForm<INewPurchaseValues>({
        defaultValues: {
            supplier_id: '',
            supplier_name: '',
            purchaseDetails: []
        }
    })
    const {
        handleSubmit,
        getValues, setValue,
        formState: {errors}
    } = methods

    const onSubmit = (dataForm: INewPurchaseValues) => {
        
        console.log(dataForm, detailsPurchase)
    }

    const supplierOptions: AutocompleteOption[] = suppliers.map((supplier: ISupplier) => ({
        label: supplier.supplier_name,
        id: supplier._id
    })) || []

    const addDetail = () => {
        const currentValues = getValues('purchaseDetails')[0];
        setDetailsPurchase((details => [...details, currentValues]))
        setValue('purchaseDetails', detailsPurchase)
        // const newDetail: IPurchaseDetails = {
        //     product_name: currentValues.product_name,
        //     quantity: Number(currentValues.quantity),
        //     unity_price: Number(currentValues.unity_price),
        // }
        // if(newDetail.product_name){
        //     append(newDetail)
        //     setValue('purchaseDetails.0', {product_name: '', quantity: 0, unity_price: 0})
        // }
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
                            value="purchaseDetails.0.product_name"
                            msgError="Por favor ingrese un producto"
                            error={!!errors.purchaseDetails?.[0]?.product_name}
                            helperText={errors.purchaseDetails?.[0]?.product_name?.message}
                        />
                        <Stack direction='row' spacing={1}>
                            <CustomInput
                                type="number"
                                label="Cantidad"
                                isSelect={false}
                                value="purchaseDetails.0.quantity"
                                msgError="Por favor ingrese un monto mayor a 0"
                                error={!!errors.purchaseDetails?.[0]?.quantity}
                                helperText={errors.purchaseDetails?.[0]?.quantity?.message}
                                min={1}
                            />
                            <CustomInput 
                                type="number"
                                label="Precio"
                                isSelect={false}
                                value="purchaseDetails.0.unity_price"
                                msgError="Por favor ingrese un monto mayor a 0"
                                error={!!errors.purchaseDetails?.[0]?.unity_price}
                                helperText={errors.purchaseDetails?.[0]?.unity_price?.message}
                                min={1}
                            />
                            <Button variant="outlined" onClick={addDetail}>Agregar</Button>
                        </Stack>
                        <Typography variant="h5" sx={{color: palette.primary.dark,mb: '0.2rem'}}>Detalle</Typography>
                        <Box>
                            {detailsPurchase.map((detail, index) => (
                                <Stack key={index} direction="row" spacing={1} alignItems="center" justifyContent={'center'}>
                                    <Typography sx={{fontSize: '15px', fontWeight: 'bold', color: palette.primary.main, textAlign: 'start', width: '100%'}}>- {detail.product_name}: {detail.quantity}kg x ${detail.unity_price}</Typography>
                                    <IconButton onClick={() => remove(index)}><Close sx={{color: palette.primary.dark}}/></IconButton>
                                </Stack>
                            ))}
                        </Box>
                   </Stack>
                </CustomFormLayout>
        </FormProvider>
    )
}

export {PurchaseAddForm}


// NO PUEDO ENCONTRAR SOLUCION, PENSAR EN HACER UN FORM  MAS PERSOSNALISADO SIN UTILIZAR CUSTOMINPUT Y USAR TEXTFIELD PARA HCERLO MAS FLEXIBLE 

// /   
// /  
import { ISaleDetails } from "@/utils/interfaces/ISale";
import { Button, Stack, useTheme } from "@mui/material";
import { CustomAutocomplete } from "../CustomAutocomplete";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { FormProvider, useForm } from "react-hook-form";
import { CustomInput } from "../CustomInput";
import { IAutocompleteOption } from "@/utils/interfaces/IAutocompleteOptions";
import { CategoryType } from "@/utils/types/CategoryType";
import { useEffect } from "react";

interface SaleDetailsProps {
    onAddDetail: (detail: ISaleDetails) => void,
    clientCategory: CategoryType | null
}

const SaleDetailsForm: React.FC<SaleDetailsProps> = ({onAddDetail, clientCategory}) => {
    const {palette} = useTheme()
    const methods = useForm<ISaleDetails>({
        defaultValues: {
            product_id: '',
            product_name: '',
            quantity: 1,
            price: 0,
          }
    })
    const {products} = useSelector((state: RootState) => state.product.allProducts)
    const {
        handleSubmit,
        reset,
        watch,
        setValue,
        formState: { errors },
      } = methods

      const onSubmit = (data: ISaleDetails) => {
        if (data.product_name && data.quantity > 0 && data.price > 0) {
          const dataProcessed = {...data, quantity: Number(data.quantity), price: Number(data.price)}
          onAddDetail(dataProcessed);
          reset();
        }
      }

      const productsOptions: IAutocompleteOption[] = products.map((product) => ({
        label: product.product_name,
        id: product._id  
      })) || []
      const selectedProductId = watch("product_id")

      useEffect(() => {
        const product = products.find(p => p._id === selectedProductId)
        if (product) {
            const price = clientCategory === 'cat_1' ? product.first_price : product.second_price            
            setValue('price', price, {shouldDirty: true})
        }
      }, [clientCategory, selectedProductId, products, setValue])

      return (
        <FormProvider {...methods}>
            <Stack direction="column" spacing={2.5}>
                <CustomAutocomplete 
                    label="Ingrese el producto"
                    name="product_name"
                    idName="product_id"
                    options={productsOptions}
                />
                <Stack direction='row' spacing={1}>
                    <CustomInput 
                        type="number"
                        label="Cantidad"
                        value={"quantity"}
                        isSelect={false}
                        msgError="Por favor ingrese un monto mayor a 0"
                        error={!!errors.quantity}
                        helperText={errors.quantity ? 'Por favor ingrese un monto mayor a 0' : ''}
                        min={1}
                    />
                    <CustomInput
                        type="number"
                        label="Precio"
                        value={"price"}
                        isSelect={false}
                        msgError="Por favor ingrese un monto mayor a 0"
                        error={!!errors.price}
                        helperText={errors.price ? 'Por favor ingrese un monto mayor a 0' : ''}
                        min={1}
                    />
                    <Button onClick={handleSubmit(onSubmit)} variant="outlined" sx={{borderColor: palette.primary.dark, color: palette.primary.dark}}>Agregar</Button>
                </Stack>
            </Stack>
        </FormProvider>
      )
}

export {SaleDetailsForm}
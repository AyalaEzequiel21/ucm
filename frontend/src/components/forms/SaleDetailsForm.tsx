import { ISaleDetails } from "@/utils/interfaces/ISale";
import { Button, Stack, useTheme } from "@mui/material";
import { CustomAutocomplete } from "../CustomAutocomplete";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { FormProvider, useForm } from "react-hook-form";
import { CustomInput } from "../CustomInput";
import { AutocompleteOption } from "./PaymentAddForm";

interface SaleDetailsProps {
    onAddDetail: (detail: ISaleDetails) => void
}

const SaleDetailsForm: React.FC<SaleDetailsProps> = ({onAddDetail}) => {
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
        formState: { errors },
      } = methods

      const onSubmit = (data: ISaleDetails) => {
        if (data.product_name && data.quantity > 0 && data.price > 0) {
          const dataProcessed = {...data, quantity: Number(data.quantity), price: Number(data.price)}
          onAddDetail(dataProcessed);
          reset();
        }
      }

      const productsOptions: AutocompleteOption[] = products.map((product) => ({
        label: product.product_name,
        id: product._id  
      })) || []

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
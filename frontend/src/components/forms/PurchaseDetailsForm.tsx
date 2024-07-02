import { IPurchaseDetails } from "@/utils/interfaces/IPurchase";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { CustomFormLayout } from "../CustomFormLayout";
import { CustomInput } from "../CustomInput";
import { Button, Stack, TextField } from "@mui/material";

interface PurchaseDetailsProps {
    onAddDetail: (detail: IPurchaseDetails) => void
}

const PurchaseDetailsForm: React.FC<PurchaseDetailsProps> = ({onAddDetail}) => {

    const methods = useForm<IPurchaseDetails>({
        defaultValues: {
            product_name: '',
            quantity: 1,
            unity_price: 0,
          }
    })

    const {
        handleSubmit,
        reset,
        formState: { errors },
      } = methods

      const onSubmit = (data: IPurchaseDetails) => {
        if (data.product_name && data.quantity > 0 && data.unity_price > 0) {
          onAddDetail(data);
          reset();
        }
      }

    return (
      <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack direction="column" spacing={2.5}>
          <Controller
            name="product_name"
            control={methods.control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Producto"
                error={!!errors.product_name}
                helperText={errors.product_name ? 'Por favor ingrese un producto' : ''}
              />
            )}
          />
          <Stack direction='row' spacing={1}>
            <Controller
              name="quantity"
              control={methods.control}
              render={({ field }) => (
                <TextField
                  {...field}
                  type="number"
                  label="Cantidad"
                  inputProps={{ min: 1 }}
                  error={!!errors.quantity}
                  helperText={errors.quantity ? 'Por favor ingrese un monto mayor a 0' : ''}
                />
              )}
            />
            <Controller
              name="unity_price"
              control={methods.control}
              render={({ field }) => (
                <TextField
                  {...field}
                  type="number"
                  label="Precio"
                  inputProps={{ min: 0 }}
                  error={!!errors.unity_price}
                  helperText={errors.unity_price ? 'Por favor ingrese un monto mayor a 0' : ''}
                />
              )}
            />
            <Button type="submit" variant="outlined">Agregar</Button>
          </Stack>
        </Stack>
      </form>
    </FormProvider>
    )
}

export {PurchaseDetailsForm}
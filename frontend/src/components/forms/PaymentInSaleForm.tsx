import { Box } from "@mui/material"
import { CustomInput } from "../CustomInput"
import { useFormContext } from "react-hook-form";
import { IClientPaymentForSale } from "@/utils/interfaces/IClientPayment";
import { paymentMethodOptions } from "@/utils/dataUtils/PaymentMethodsOptions.";

interface PaymentInSaleFormProps {
}

const PaymentInSaleForm: React.FC<PaymentInSaleFormProps> = () => {

    const { formState:{errors} } = useFormContext<IClientPaymentForSale>()

    return(
        <Box>
            <Box mb={2}>
                <CustomInput
                    type="number"
                    label="Total del pago"
                    min={1}
                    isSelect={false}
                    value="payment.amount"  // Este valor se registra en el formulario principal
                    msgError="Por favor ingrese un monto mayor a 0"
                    error={!!errors.amount}
                    helperText={errors.amount?.message}
                />
            </Box>
            <Box>
                <CustomInput
                    type="text"
                    label="Metodo de Pago"
                    isSelect={true}
                    selectOptions={paymentMethodOptions}
                    value="payment.payment_method"
                    msgError="Por favor ingrese el metodo de pago"
                    error={!!errors.payment_method}
                    helperText={errors.payment_method?.message}
                />                            
            </Box>
        </Box>
    )
}

export { PaymentInSaleForm }
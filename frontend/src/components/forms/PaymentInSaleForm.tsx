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
            <CustomInput
                type="number"
                label="Total del pago"
                min={0}
                isSelect={false}
                value="payment.amount"  // Este valor se registra en el formulario principal
                msgError="Por favor ingrese un monto mayor a 0"
                error={!!errors.amount}
                helperText={errors.amount?.message}
            />
            <CustomInput
                type="text"
                label="Metodo de Pago"
                isSelect={true}
                selectOptions={paymentMethodOptions}
                value="payment.payment_method"
                msgError="Por favor ingrese el metodo de pago"
                error={false}
                helperText={errors.payment_method?.message}
            />                            
        </Box>
    )
}

export { PaymentInSaleForm }
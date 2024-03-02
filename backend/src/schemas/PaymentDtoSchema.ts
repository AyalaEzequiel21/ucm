import { z } from "zod";
import { validateAmount } from "../utilities/validateIsAmount";
import { PaymentMethod } from "../utilities/types/PaymentMethod";

const paymentDtoSchema = z.object({
    client_name: z.string().min(5),
    amount: validateAmount(),
    payment_method: PaymentMethod
})

type PaymentDtoType = z.infer<typeof paymentDtoSchema>

export { paymentDtoSchema, PaymentDtoType }
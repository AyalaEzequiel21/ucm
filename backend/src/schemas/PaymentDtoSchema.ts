import { z } from "zod";
import { validateAmount } from "../utilities/validateIsAmount";
import { PaymentMethod } from "../utilities/types/PaymentMethod";
import { validateObjectId } from "../utilities/validateObjectId";

const paymentDtoSchema = z.object({
    client_id: validateObjectId().optional(),
    client_name: z.string().min(4).max(15),
    amount: validateAmount(),
    payment_method: PaymentMethod
})

type PaymentDtoType = z.infer<typeof paymentDtoSchema>

export { paymentDtoSchema, PaymentDtoType }
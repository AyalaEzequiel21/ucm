import { z } from "zod";
import { validateObjectId } from "../utilities/validateObjectId";
import { validateAmount } from "../utilities/validateIsAmount";
import { PaymentMethod } from "../utilities/types/PaymentMethod";

// CLIENT PAYMENT
const newClientPaymentSchema = z.object({
    client_id: validateObjectId().optional(),
    client_name: z.string().min(4).max(15),
    amount: validateAmount(),
    payment_method: PaymentMethod,
    sale_id: validateObjectId().optional(),
    report_id: validateObjectId().optional().nullable()
})

type ClientPaymentType = z.infer<typeof newClientPaymentSchema>

// CLIENT PAYMENT MONGO

const clientPaymentMongoSchema = newClientPaymentSchema.extend({
    _id: validateObjectId().optional(),
})

type ClientPaymentMongoType = z.infer<typeof clientPaymentMongoSchema>

export { newClientPaymentSchema, ClientPaymentType, clientPaymentMongoSchema, ClientPaymentMongoType}
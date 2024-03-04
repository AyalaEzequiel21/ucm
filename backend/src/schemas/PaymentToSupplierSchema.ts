import { z } from "zod";
import { validateObjectId } from "../utilities/validateObjectId";
import { PaymentMethod } from "../utilities/types/PaymentMethod";
import { validateAmount } from "../utilities/validateIsAmount";

// PAYMENT TO SUPPLIER
const newPaymentToSupplierSchema = z.object({
    supplier_id: validateObjectId().optional(),
    supplier_name: z.string().min(4).max(15),
    payment_method: PaymentMethod,
    total_payment: validateAmount()
})

type PaymentToSupplier = z.infer<typeof newPaymentToSupplierSchema>

// PAYMENT TO SUPLLIER MONGO
const paymentToSupplierMongoSchema = newPaymentToSupplierSchema.extend({
    _id: validateObjectId()
})

type PaymentToSupplierMongo = z.infer<typeof paymentToSupplierMongoSchema>

export { newPaymentToSupplierSchema, PaymentToSupplier, paymentToSupplierMongoSchema, PaymentToSupplierMongo}
import { z } from "zod";
import { validateObjectId } from "../utilities/validateObjectId";
import { purchaseMongoSchema } from "./PurchaseSchema";
import { paymentToSupplierMongoSchema } from "./PaymentToSupplierSchema";

// SUPPLIER 
const newSupplierSchema = z.object({
    supplier_name: z.string().min(4).max(15),
    phone: z.string().min(8).max(25),
})

type SupplierType = z.infer<typeof newSupplierSchema>

// SUPPLIER MONGO
const supplierMongoSchema = newSupplierSchema.extend({
    _id: validateObjectId(),
    balance: z.number().optional(),
    purchases: z.array(purchaseMongoSchema).optional(),
    payments: z.array(paymentToSupplierMongoSchema).optional()
})

type SupplierMongoSchema = z.infer<typeof supplierMongoSchema>

export { newSupplierSchema, SupplierType, supplierMongoSchema, SupplierMongoSchema }
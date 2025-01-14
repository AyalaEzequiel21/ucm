import { z } from "zod";
import { validateObjectId } from "../utilities/validateObjectId";

// SUPPLIER 
const newSupplierSchema = z.object({
    supplier_name: z.string().min(4).max(15),
    phone: z.string().min(8).max(25),
    primeProduct: z.string().min(5).max(20)
})

type SupplierType = z.infer<typeof newSupplierSchema>

// SUPPLIER MONGO
const supplierMongoSchema = newSupplierSchema.extend({
    _id: validateObjectId(),
    balance: z.number(),
    purchases: z.array(validateObjectId()).optional(),
    payments: z.array(validateObjectId()).optional(),
    is_active: z.boolean().optional(), 
    createdAt: z.date().optional()
})

type SupplierMongoType = z.infer<typeof supplierMongoSchema>

export { newSupplierSchema, SupplierType, supplierMongoSchema, SupplierMongoType }
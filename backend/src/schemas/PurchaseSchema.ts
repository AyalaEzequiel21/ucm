import { z } from "zod";
import { validateObjectId } from "../utilities/validateObjectId";
import { validateAmount } from "../utilities/validateIsAmount";

// PURCHASE DETAIL
const purchaseDetailSchema = z.object({
    product_id: validateObjectId().optional(),
    product_name: z.string().min(5).max(18).optional(),
    description: z.string().min(5).max(70),
    quantity: validateAmount(),
    partial_total: validateAmount()
})

type PurchaseDetailType = z.infer<typeof purchaseDetailSchema>

// PURCHASE
const newPurchaseSchema = z.object({
    supplier_id: validateObjectId().optional(),
    supplier_name: z.string().min(4).max(14),
    purchaseDetail: z.array(purchaseDetailSchema),
    total_purchase: validateAmount().optional()
})

type PurchaseType = z.infer<typeof newPurchaseSchema> 

// PURCHASE MONGO 
const purchaseMongoSchema = newPurchaseSchema.extend({
    _id: validateObjectId().optional()
})

type PurchaseMongoType = z.infer<typeof purchaseMongoSchema>

export { purchaseDetailSchema, PurchaseDetailType, newPurchaseSchema, PurchaseType, purchaseMongoSchema, PurchaseMongoType}
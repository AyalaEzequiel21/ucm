import { z } from "zod";
import { validateAmount } from "../utilities/validateIsAmount";
import { paymentDtoSchema } from "./PaymentDtoSchema";
import { validateObjectId } from "../utilities/validateObjectId";

// DETAIL SALE
const detailSaleSchema = z.object({
    product_id: validateObjectId().optional(),
    product_name: z.string(),
    price: validateAmount(),
    quantity: validateAmount(),
    partial_total: validateAmount().optional()
})

type DetailSaleType = z.infer<typeof detailSaleSchema>

// SALE
const newSaleSchema = z.object({
    client_id: validateObjectId().optional(),
    client_name: z.string().min(4).max(15),
    details: z.array(detailSaleSchema),
    total_sale: validateAmount().optional(),
    payment_dto: paymentDtoSchema.optional(),
    payment_id: validateObjectId().optional(),
})

type SaleType = z.infer<typeof newSaleSchema>

// SALE MONGO
const saleMongoSchema = newSaleSchema.extend({
    _id: validateObjectId()
})

type SaleMongoType = z.infer<typeof saleMongoSchema>

export { detailSaleSchema, DetailSaleType, newSaleSchema, SaleType, saleMongoSchema, SaleMongoType}
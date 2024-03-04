import { z } from "zod";
import { validateObjectId } from "../utilities/validateObjectId";
import { validateAmount } from "../utilities/validateIsAmount";
import { SalesListStatus } from "../utilities/types/SalesListStatus";

const detailSaleListSchema = z.object({
    sale_id: validateObjectId().optional(),
    client_name: z.string().min(4).max(15),
    totalSale: validateAmount()
})

type DetailSaleListType = z.infer<typeof detailSaleListSchema>

// SALES LIST 
const newSalesListSchema = z.object({
    salesdetail: z.array(detailSaleListSchema)
})

type SalesListType = z.infer<typeof newSalesListSchema>

// SALES LIST MONGO 
const salesListMongoSchema = newSalesListSchema.extend({
    _id: validateObjectId().optional(),
    status: SalesListStatus.optional(),
})

type SalesListMongoType = z.infer<typeof salesListMongoSchema>

export { detailSaleListSchema, DetailSaleListType, newSalesListSchema, SalesListType, salesListMongoSchema, SalesListMongoType}
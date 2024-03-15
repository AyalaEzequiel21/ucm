import { z } from "zod"
import { validateObjectId } from "../utilities/validateObjectId"
import { validateAmount } from "../utilities/validateIsAmount"

// PRODUCT
const newProductSchema = z.object({
    product_name: z.string().min(5).max(18),
    first_price: validateAmount(),
    second_price: validateAmount(),
    stock: validateAmount()
})

type ProductType = z.infer<typeof newProductSchema>

// PRODUCT MONGO 

const productMongoSchema = newProductSchema.extend({
    _id: validateObjectId(),
    is_active: z.boolean()
})

type ProductMongoType = z.infer<typeof productMongoSchema>

export { newProductSchema, ProductType, productMongoSchema, ProductMongoType}
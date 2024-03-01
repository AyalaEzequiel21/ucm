import { z } from "zod"
import { validateObjectId } from "../utilities/validateObjectId"

// PRODUCT

const newProductSchema = z.object({
    product_name: z.string().min(5).max(18),
    first_price: z.number().refine(value => value > 0, {message: "The price must be more that 0"}),
    secondary_price: z.number().refine(value => value > 0, {message: "The price must be more that 0"})
})

type ProductType = z.infer<typeof newProductSchema>

// PRODUCT MONGO 

const productMongoSchema = newProductSchema.extend({
    _id: validateObjectId(),
    is_active: z.boolean()
})

type ProductMongoType = z.infer<typeof productMongoSchema>

export { newProductSchema, ProductType, productMongoSchema, ProductMongoType}
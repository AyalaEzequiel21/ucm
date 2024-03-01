import { Schema, model } from "mongoose";
import { ProductMongoType } from "../schemas/ProductsSchema";

const productSchema = new Schema<ProductMongoType>(
    {
        product_name: {
            type: String,
            required: true,
            minlength: 5,
            maxlength: 18
        },
        first_price: {
            required: true,
            type: Number,
            min: 0.1
        },
        secondary_price: {
            required: true,
            type: Number,
            min: 0.1
        },
        is_active: {
            type: Boolean,
            default: true
        }
    }
)

const ProductModel = model("product", productSchema, "products")

export default ProductModel
import { Schema, model } from "mongoose";
import { ProductMongoType } from "../schemas/ProductsSchema";

const productSchema = new Schema<ProductMongoType>(
    {
        product_name: {
            type: String,
            required: true,
            unique: true,
            minlength: 5,
            maxlength: 25
        },
        first_price: {
            required: true,
            type: Number,
            min: 0.1
        },
        second_price: {
            required: true,
            type: Number,
            min: 0.1
        },
        stock: {
            type: Number,
            min: 1,
            default: 300
        },
        is_active: {
            type: Boolean,
            default: true
        }
    },
    {
        versionKey: false,
        timestamps: true
    }
)

const ProductModel = model("product", productSchema, "products")

export default ProductModel
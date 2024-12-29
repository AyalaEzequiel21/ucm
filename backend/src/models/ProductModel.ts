import { Schema } from "mongoose";
import { ProductMongoType } from "../schemas/ProductsSchema";

export const productSchema = new Schema<ProductMongoType>(
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
        }
    },
    {
        versionKey: false,
        timestamps: true
    }
)
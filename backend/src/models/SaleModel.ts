import mongoose, { Schema } from "mongoose";
import { DetailSaleType, SaleType } from "../schemas/SaleSchema";

const detailSaleSchema = new Schema<DetailSaleType>(
    {
        product_id: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: "Product",
            required: true
        }, 
        product_name: {
            type: String, 
            required: true,
            minlength: 5
        }, 
        quantity: {
            type: Number,
            required: true,
            min: 0.1
        },
        partial_total: {
            type: Number,
            required: true,
            min: 0.1
        }
    }
)

export const saleSchema = new Schema<SaleType>(
    {
        client_id: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: "Client",
            required: true
        },
        client_name: {
            type: String, 
            required: true,
            minlength: 5
        }, 
        details: [
            detailSaleSchema
        ],
        total_sale: {
            type: Number,
            required: true,
            min: 0.1
        },
        payment_id: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: "Client",
            required: true
        },
        payment_total: {
            type: Number,
            required: true,
            default: 0.0
        },
    },
    {
        versionKey: false,
        timestamps: true
    }
)
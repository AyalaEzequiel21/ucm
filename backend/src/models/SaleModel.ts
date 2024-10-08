import mongoose, { Schema } from "mongoose";
import { DetailSaleType, SaleType } from "../schemas/SaleSchema";
import { clientPaymentSchema } from "./ClientPaymentModel";

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
        price: {
            type: Number,
            required: true,
            min: 0.1
        },
        quantity: {
            type: Number,
            required: true,
            min: 0.1
        },
        partial_total: {
            type: Number,
            min: 0.1,
        }
    }
)

detailSaleSchema.pre('validate', function(next) {
    if (this.quantity && this.price) {
        this.partial_total = this.quantity * this.price;
    }
    next();
});


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
            minlength: 4
        }, 
        details: [
            detailSaleSchema
        ],
        total_sale: {
            type: Number,
            min: 0.1
        },
        payment: { 
            type: mongoose.Schema.Types.Mixed||undefined, 
            ref: 'ClientPayment', 
            required: false 
        },
        createdAt: {
            type: Date,
            required: false
        }
    },
    {
        versionKey: false,
        timestamps: true
    }
)

saleSchema.pre('save', function(next) {
    if (this.details && this.details.length > 0) {
        this.total_sale = this.details.reduce((total, detail) => {
            return total + (detail.partial_total || 0);
        }, 0);
    }
    next();
})
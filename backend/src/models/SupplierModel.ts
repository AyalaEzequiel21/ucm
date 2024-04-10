import mongoose, { Schema } from "mongoose";
import { SupplierMongoType } from "../schemas/SupplierSchema";

export const supplierSchema = new Schema<SupplierMongoType>(
    {
        supplier_name: {
            type: String,
            required: true,
            minlength: 4,
            maxlength: 15
        },
        phone: {
            type: String,
            required: true,
            minlength: 8,
            maxlength: 25
        },
        primeProduct: {
            type: String,
            required: true,
            minlength: 5,
            maxlength: 20
        },
        balance: {
            type: Number,
            default: 0.0
        },
        payments: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "PaymentToSupplier",
            default: []
        }], 
        purchases: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Purchases",
            default: []
        }]
    },
    {
        versionKey: false,
        timestamps: true
    }
)
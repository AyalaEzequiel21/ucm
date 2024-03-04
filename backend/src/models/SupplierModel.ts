import { Schema } from "mongoose";
import { SupplierMongoSchema } from "../schemas/SupplierSchema";

const supplierSchema = new Schema<SupplierMongoSchema>(
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
        balance: {
            type: Number,
            default: 0.0
        },
        payments: {
            type: Schema.Types.ObjectId,
            ref: "PaymentToSupplier",
            default: new Array
        }, 
        purchases: {
            type: Schema.Types.ObjectId,
            ref: "Purchases",
            default: new Array
        }
    },
    {
        versionKey: false,
        timestamps: true
    }
)
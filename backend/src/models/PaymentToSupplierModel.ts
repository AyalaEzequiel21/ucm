import mongoose, { Schema } from "mongoose";
import { PaymentToSupplierType } from "../schemas/PaymentToSupplierSchema";
import { paymentMethodsArray } from "../utilities/types/PaymentMethod";

export const paymentToSupplierSchema = new Schema<PaymentToSupplierType>(
    {
        supplier_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Supplier",
            required: true
        },
        supplier_name: {
            type: String,
            required: true,
            minlength: 4,
            maxlength: 15
        },
        payment_method: {
            type: String,
            enum: paymentMethodsArray,
            required: true
        },
        total_payment: {
            type: Number,
            min: 1,
            required: true
        }
    },
    {
        versionKey: false,
        timestamps: true
    }
)
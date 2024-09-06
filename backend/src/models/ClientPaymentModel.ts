import mongoose, { Schema } from "mongoose";
import { ClientPaymentType } from "../schemas/ClientPaymentSchema";
import { paymentMethodsArray } from "../utilities/types/PaymentMethod";

export const clientPaymentSchema = new Schema<ClientPaymentType>(
    {
        client_id: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: "Client", 
            required: true
        },
        client_name: {
            required: true,
            type: String,
        },
        amount: {
            type: Number,
            required: true,
            min: 0.1

        },
        payment_method: {
            required: true,
            type: String,
            enum: paymentMethodsArray
        },
        sale_id: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: "Sale",
            required: false
        },
        report_id: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: "Report",
            required: false
        },
    },
    {
        versionKey: false,
        timestamps: true
    }
)
import mongoose, { Schema, model } from "mongoose";
import { ClientPaymentType } from "../schemas/ClientPaymentSchema";
import { paymentMethodsArray } from "../utilities/types/PaymentMethod";

const clientPaymentSchema = new Schema<ClientPaymentType>(
    {
        client_id: {
            type: mongoose.Types.ObjectId, 
            ref: "Client", 
            required: true
        },
        client_name: {
            required: true,
            type: String,
        },
        amount: {

        },
        payment_method: {
            required: true,
            enum: paymentMethodsArray
        },
        sale_id: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: "Sale"
        },
        report_id: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: "Report"
        },
    },
    {
        versionKey: false,
        timestamps: true
    }
)

const ClientPaymentModel = model("Client_payment", clientPaymentSchema, "client_payments")

export default ClientPaymentModel
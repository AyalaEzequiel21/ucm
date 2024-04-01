import { Schema } from "mongoose";
import { PaymentsReportMongoType } from "../schemas/PaymentsReportSchema";
import { reportStatusArray } from "../utilities/types/ReportStatus";
import mongoose from "mongoose";

export const paymentsReportSchema = new Schema<PaymentsReportMongoType>(
    {
        payments: [{
            type: mongoose.Schema.Types.ObjectId, 
            ref: "ClientPayment",
            default: []
        }],
        payments_dto: [
            Schema.Types.Mixed
        ],
        report_status: {
            type: String,
            enum: reportStatusArray,
            default: "pendiente"
        }
    },
    {
        versionKey: false,
        timestamps: true
    }
)
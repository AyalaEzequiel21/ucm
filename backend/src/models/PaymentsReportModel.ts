import { Schema, model } from "mongoose";
import { PaymentsReportMongoType } from "../schemas/PaymentsReportSchema";
import { reportStatusArray } from "../utilities/types/ReportStatus";

const paymentsReportSchema = new Schema<PaymentsReportMongoType>(
    {
        payments: [{
            type: Schema.Types.ObjectId, 
            ref: "Payment",
            default: new Array
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

const PaymentsReportModel = model("PaymentsReport", paymentsReportSchema, "paymentsReports")

export default PaymentsReportModel
import { z } from "zod";
import { paymentDtoSchema } from "./PaymentDtoSchema";
import { validateObjectId } from "../utilities/validateObjectId";
import { ReportStatus } from "../utilities/types/ReportStatus";

// PAYMENTS REPORT 
const newPaymentsReportSchema = z.object({
    payments: z.array(validateObjectId()).optional(),
    payments_dto: z.array(paymentDtoSchema)
})

type PaymentsReportType = z.infer<typeof newPaymentsReportSchema>

// PAYMENTS REPORT MONGO

const paymentsReportMongoSchema = newPaymentsReportSchema.extend({
    _id: validateObjectId().optional(),
    report_status: ReportStatus,
})

type PaymentsReportMongoType = z.infer<typeof paymentsReportMongoSchema>

export { newPaymentsReportSchema, PaymentsReportType, paymentsReportMongoSchema, PaymentsReportMongoType }
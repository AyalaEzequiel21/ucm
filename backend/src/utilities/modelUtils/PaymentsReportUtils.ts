import mongoose, { ClientSession, ObjectId } from "mongoose";
import { BadRequestError } from "../../errors/CustomErros";
import { PaymentDtoType } from "../../schemas/PaymentDtoSchema";
import { checkId } from "../validateObjectId";
import { processOnePayment } from "./PaymentsUtils";
import { ClientPaymentMongoType } from "../../schemas/ClientPaymentSchema";
import { IdType } from "../types/IdType";

/////////////////////////
// PAYMENTS REPORT UTILS
/////////////////////////

const checkIsValidPayments = (payments: PaymentDtoType[]) => {
    payments.map(payment => {
        if(payment.client_id){
            checkId(payment.client_id)
            if (payment.amount <= 0){
                throw new BadRequestError('Algunos datos ingresados, no son validos')
            }
        }
    })
}

const processPaymentsOfReport = async (payments: PaymentDtoType[], reportId: IdType, session: ClientSession) => {
    const paymentsId: ObjectId[] = []
    try {
        for(const paymentDto of payments) {
            const newPayment: ClientPaymentMongoType = await processOnePayment(paymentDto, reportId, undefined, session)
            if(newPayment){
                paymentsId.push(new mongoose.Schema.ObjectId(newPayment._id))
            }
        }
        return paymentsId
    } catch(e){
        throw e
    }
}

export { checkIsValidPayments, processPaymentsOfReport }
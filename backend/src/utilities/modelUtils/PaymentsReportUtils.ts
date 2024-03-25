import mongoose, { ClientSession, ObjectId } from "mongoose";
import { BadRequestError } from "../../errors/CustomErros";
import { PaymentDtoType } from "../../schemas/PaymentDtoSchema";
import { checkId } from "../validateObjectId";
import { IdType } from "../types/IdType";
import { ClientPaymentMongoType, ClientPaymentType } from "../../schemas/ClientPaymentSchema";
import { processOnePayment } from "./ClientPaymentUtils";

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
    const paymentsId: ClientPaymentType[] = []
    try {
        for(const paymentDto of payments) {
            const newPayment = await processOnePayment(paymentDto, reportId, undefined, session)
            if(newPayment){
               paymentsId.push(newPayment)
           }
        }
        return paymentsId
    } catch(e){
        throw e
    }
}

export { checkIsValidPayments, processPaymentsOfReport }
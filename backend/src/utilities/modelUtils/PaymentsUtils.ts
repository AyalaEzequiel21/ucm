import mongoose, { ClientSession, ObjectId } from "mongoose"
import { PaymentDtoType } from "../../schemas/PaymentDtoSchema"
import { IdType } from "../types/IdType"
import { BadRequestError } from "../../errors/CustomErros"
import { ClientPaymentType } from "../../schemas/ClientPaymentSchema"
import { ClientPaymentModel } from "../../models"
import { getClientById } from "../../services/ClientService"

/////////////////////////
// PAYMENTS REPORT UTILS
/////////////////////////

const processOnePayment = async (payment: PaymentDtoType, reportId: IdType|undefined, saleId: IdType|undefined, session: ClientSession ) => {
    if(!payment.client_id){ // CHECK IF EXISTS CLIENT ID OR RUN AN EXCEPTION IF NOT EXISTS
        throw new BadRequestError('Algunos datos faltan o son invalidos')
    }
    try {
        const newPaymentdata: ClientPaymentType = {
            client_id: payment.client_id,
            amount: payment.amount,
            client_name: payment.client_name,
            payment_method: payment.payment_method,
            report_id: reportId?.toString(),
            sale_id: saleId?.toString()
        }
        const newPayment = await ClientPaymentModel.create([newPaymentdata], {session})
        const client = await getClientById(payment.client_id, session)  
        // QUEDE ACA, FALTA VALIDAR LA REPSUESTS Y AGREGAR EL PAGO AL CLIENTE JUNTO CON 
        // LA ACTULIZACION DEL BALNCE Y RETORNAR EL PRIMER RESULTAFO
    } catch(e) {
        throw e
    }
}

export { processOnePayment }
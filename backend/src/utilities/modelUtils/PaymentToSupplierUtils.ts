import { ClientSession } from "mongoose";
import { IdType } from "../types/IdType";
import { getSupplierById } from "../../services/SupplierService";
import { ResourceNotFoundError } from "../../errors/CustomErros";
import { PaymentToSupplierModel } from "../../models";


/////////////////////////////
// PAYMENT TO SUPPLIER UTILS
/////////////////////////////

// ADD THE PAYMENT TO SUPPLIER AND UPDATE THE BALANCE
const addPaymentToSupplier = async (supplierId: IdType, paymentToSupplierId: IdType, session: ClientSession) => {
    try {
        const supplier = await getSupplierById(supplierId, session) // FIND THE SUPPLIER WITH THIS ID
        if(!supplier) { // IF THE SUPPLIER IS NOT FOUND, THEN RUN AN EXCEPTION
            throw new ResourceNotFoundError('Proveedor')
        }
        const paymentSupplier = await PaymentToSupplierModel.findById(paymentToSupplierId).session(session) // FIND THE PAYMENT TO SUPPLIER WITH HIS ID
        if(!paymentSupplier) { // IF THE PAYMENT NOT EXISTS RUN AN EXCEPTION
            throw new ResourceNotFoundError('Pago a proveedor')
        }
        if(supplier.payments && supplier.balance !== undefined){
            const paymentForSupplier = {
                ...paymentSupplier.toObject(),
                _id: paymentSupplier._id.toString()
            }
            supplier.payments.push(paymentForSupplier._id) // ADD THE PAYMENT TO SUPPLIER LIST OF PAYMENTS
            supplier.balance -= paymentForSupplier.total_payment // UPDATE THE SUPPLIER BALANCE
            await supplier.save({session})
        }
    } catch(e){
        throw e
    }
}

// REMOVE THE PAYMENT FROM SUPPLIER AND UPDATE THE BALANCE
const subtractPaymentToSupplier = async (supplierId: IdType, paymentSupplierId: IdType, session: ClientSession) => {
    try {
        const supplier = await getSupplierById(supplierId, session) // FIND THE SUPPLIER WITH THIS ID
        if(!supplier) { // IF THE SUPPLIER IS NOT FOUND, THEN RUN AN EXCEPTION
            throw new ResourceNotFoundError('Proveedor')
        }
        const paymentSupplier = await PaymentToSupplierModel.findById(paymentSupplierId).session(session) // FIND THE PAYMENT TO SUPPLIER WITH HIS ID
        if(!paymentSupplier) { // IF THE PAYMENT NOT EXISTS RUN AN EXCEPTION
            throw new ResourceNotFoundError('Pago a proveedor')
        }
        if(supplier.payments && supplier.balance !== undefined){
            supplier.payments = supplier.payments.filter(payment => payment != paymentSupplierId) // SUBTRACT THE PAYMENT ID FROM THE LIST OF PAYMENTS
            supplier.balance += paymentSupplier.total_payment // UPDATE THE SUPPLIER BALANCE
            await supplier.save({session})
        }
    } catch(e) {
        throw e
    }
}

export { addPaymentToSupplier, subtractPaymentToSupplier }
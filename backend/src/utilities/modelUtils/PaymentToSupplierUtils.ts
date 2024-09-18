import { ClientSession } from "mongoose";
import { IdType } from "../types/IdType";
import { getSupplierById } from "../../services/SupplierService";
import { ResourceNotFoundError } from "../../errors/CustomErros";
import { PaymentToSupplierModel } from "../../models";
import { PaymentToSupplierMongoType } from "../../schemas/PaymentToSupplierSchema";


/////////////////////////////
// PAYMENT TO SUPPLIER UTILS
/////////////////////////////

// ADD THE PAYMENT TO SUPPLIER AND UPDATE THE BALANCE
const addPaymentToSupplier = async (supplierId: IdType, paymentToSupplier: PaymentToSupplierMongoType, session: ClientSession) => {
    try {
        const supplier = await getSupplierById(supplierId) // FIND THE SUPPLIER WITH THIS ID
        if(!supplier) { // IF THE SUPPLIER IS NOT FOUND, THEN RUN AN EXCEPTION
            throw new ResourceNotFoundError('Proveedor')
        }
        if(supplier && supplier.payments && supplier.balance){
            supplier.payments.push(paymentToSupplier._id) // ADD THE PAYMENT TO SUPPLIER LIST OF PAYMENTS
            supplier.balance -= paymentToSupplier.total_payment // UPDATE THE SUPPLIER BALANCE
            await supplier.save({session})
        }
    } catch(e){
        throw e
    }
}

// REMOVE THE PAYMENT FROM SUPPLIER AND UPDATE THE BALANCE
const subtractPaymentToSupplier = async (supplierId: IdType, paymentSupplierId: IdType, amount: number, session: ClientSession) => {
    try {
        const supplier = await getSupplierById(supplierId) // FIND THE SUPPLIER WITH THIS ID
        if(supplier && supplier.payments && supplier.balance) { // IF THE SUPPLIER IS NOT FOUND, THEN RUN AN EXCEPTION
            supplier.payments = supplier.payments.filter(payment => payment != paymentSupplierId) // SUBTRACT THE PAYMENT ID FROM THE LIST OF PAYMENTS
            supplier.balance += amount // UPDATE THE SUPPLIER BALANCE
            await supplier.save({session})
            
        }
    } catch(e) {
        throw e
    }
}

export { addPaymentToSupplier, subtractPaymentToSupplier }


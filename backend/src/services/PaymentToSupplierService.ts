import { startSession } from "../config/startSession";
import { BadRequestError, ResourceNotFoundError } from "../errors/CustomErros";
import { ErrorsPitcher } from "../errors/ErrorsPitcher";
import { PaymentToSupplierModel } from "../models";
import { PaymentToSupplierType } from "../schemas/PaymentToSupplierSchema";
import { addPaymentToSupplier, subtractPaymentToSupplier } from "../utilities/modelUtils/PaymentToSupplierUtils";
import { IdType } from "../utilities/types/IdType";
import { checkId } from "../utilities/validateObjectId";
import { getSupplierById } from "./SupplierService";

////////////////////////////////
// PAYMENT TO SUPPLIER SERVICE
////////////////////////////////

// CREATE 
const createPaymentToSupplier = async (paymentToSupplier: PaymentToSupplierType) => {
    const { supplier_id } = paymentToSupplier // GET THE DATA FOR CREATE THE PAYMENT TO SUPPLIER
    const session = await startSession() // INIT A SESSION FOR A TRANSACTION
    if(!supplier_id){ // IF THE SUPPLIER ID NOT EXISTS RUN AN EXCEPTION
        throw new BadRequestError("Faltan datos necesarios")
    }
    try {
        session.startTransaction() // INIT TRANSACTIONS
        const supplier = await getSupplierById(supplier_id, session) // FIND THE SUPPLIER WITH THIS ID
        if(!supplier) { // IF SUPPLIER NOT EXISTS RUN AN EXCEPTION
            throw new ResourceNotFoundError('Proveedor')
        }
        const paymentSupplierCreated = await PaymentToSupplierModel.create([paymentToSupplier], {session}) // CREATE THE NEW PAYMENT TO SUPPLIER
        const paymentId = paymentSupplierCreated[0]._id.toString() // GET THE PAYMENT ID AND CONVERT TO STRING
        await addPaymentToSupplier(supplier_id, paymentId, session) //  ADD THE PAYMENT TO SUPPLIER AND UPDATE HIS BALANCE
        await session.commitTransaction() // CONFIRM ALL CHANGES AND THE TRANSACTION
        return paymentSupplierCreated[0]
    } catch(e) {
        await session.abortTransaction() //ABORT THE TRANSACTION
        ErrorsPitcher(e)
    } finally {
        await session.endSession() // END THE TRANSACTION
    }
}

// DELETE 
const removePaymentToSupplierById = async (paymentSupplierId: IdType) => {
    checkId(paymentSupplierId)
    const session = await startSession() // INIT A SESSION FOR TRANSACTIONS
    try {
        session.startTransaction() // INIT THE TRANSACTION
        const paymentSupplier = await PaymentToSupplierModel.findById(paymentSupplierId) //  FIND THE PAYMENT WITH HIS ID
        if(!paymentSupplier){
            throw new ResourceNotFoundError('Pago a proveedor') // IF THE PAYMENT IS NOT FOUND RUN AN EXCEPTION
        }
        if(!paymentSupplier.supplier_id){
            throw new BadRequestError("Faltan datos necesarios")
        }
        await subtractPaymentToSupplier(paymentSupplier.supplier_id, paymentSupplierId, session) // SUBTRACT THE PAYMENT AND UPDATE THE BALANCE
        await PaymentToSupplierModel.findByIdAndDelete(paymentSupplierId, {session})
        await session.commitTransaction() // COMFIRM THE TRANSACTIONS
    } catch(e){
        await session.abortTransaction() //ABORT THE TRANSACTION
        ErrorsPitcher(e)
    }finally{
        await session.endSession() // END THE TRANSACTION
    }
}

export { createPaymentToSupplier, removePaymentToSupplierById }
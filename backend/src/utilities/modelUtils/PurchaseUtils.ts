import { ClientSession } from "mongoose";
import { IdType } from "../types/IdType";
import { getSupplierById } from "../../services/SupplierService";
import { ResourceNotFoundError } from "../../errors/CustomErros";
import { PurchaseModel } from "../../models";


/////////////////////////
// PURCHASE UTILS
/////////////////////////


const addPurchaseToSupplier = async (supplierId: IdType, purchaseId: IdType, session: ClientSession) => {
    try {
        const supplier = await getSupplierById(supplierId, session) // FIND THE SUPPLIER
        if(!supplier) {
            throw new ResourceNotFoundError('Proveedor') // IF THE SUPPLIER IS NOT FOUND RUN AN EXCEPTION
        }
        const purchase = await PurchaseModel.findById(purchaseId).session(session) //  FIND THE PURCHASE, IF NOT EXISTS THEN RUN AN EXCEPTION
        if(!purchase) {
            throw new ResourceNotFoundError('Compra a proveedor')
        }
        if(supplier.purchases && supplier.balance && purchase.total_purchase !== undefined){
            const purchaseForSupplier = {
                ...purchase.toObject(), // CONVERT TE PURCHASE TO OBJECT FOR UPDATE SUPPLIER BALANCE
                _id: purchase._id.toString()
            }
            supplier.purchases.push(purchaseForSupplier._id) // ADD PURCHASE TO SUPPLIER LIST OF PURCHASES
            supplier.balance += purchase.total_purchase // UPDATE THE SUPPLIER BALANCE
            await supplier.save({session})
        }
    } catch(e) {
        throw e
    }
}

export { addPurchaseToSupplier }
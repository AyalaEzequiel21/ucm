import { startSession } from "../config/startSession";
import { BadRequestError, ResourceNotFoundError } from "../errors/CustomErros";
import { ErrorsPitcher } from "../errors/ErrorsPitcher";
import { PurchaseModel } from "../models";
import { PurchaseType } from "../schemas/PurchaseSchema";
import { addPurchaseToSupplier } from "../utilities/modelUtils/PurchaseUtils";
import { IdType } from "../utilities/types/IdType";
import { checkId } from "../utilities/validateObjectId";
import { getSupplierById } from "./SupplierService";

/////////////////////////
// PURCHASE SERVICE
///////////////////////

// CREATE
const createPurchase = async (purchase: PurchaseType) => {
    const { supplier_id, supplier_name, purchaseDetail } = purchase //  GET THE DATA FOR CREATR THE PURCHASE
    if(!supplier_id || !supplier_name || !purchaseDetail || purchaseDetail.length === 0){
        throw new BadRequestError("Faltan algunos datos necesarios") //  IF THE SOME PROPERTIE NOT EXISTS RUN AN EXCEPTION
    }
    const session = await startSession() //  INIT A SESSION
    try {
        session.startTransaction() // START A TRANSACTION
        const supplier = await getSupplierById(supplier_id,) //  FIND SUPPLIER WITH HIS ID AND SUPPLIER SERVICE
        if(!supplier) {
            throw new ResourceNotFoundError('Proveedor') //  IF THE SUPPLIER IS NOT FOUND RUN AN EXCEPTION
        }
        const purchaseCreated = await PurchaseModel.create([{ // CREATE THE NEW PURCHASE 
            supplier_id: supplier_id,
            supplier_name: supplier_name, 
            purchaseDetail: purchaseDetail
        }], {session})
        const { _id, total_purchase } = purchaseCreated[0] // GET SOME PROPERTIES FOR UPDATE SUPPLIER BALANCE
        if(total_purchase !== undefined){
            await addPurchaseToSupplier(supplier_id, _id.toString(), session) // ADD THE PURCHASE TO SUPPLIER AND UPDATE THE BALANCE
        }
        await purchaseCreated[0].save({session})
        await session.commitTransaction() // CONFIRM ALL CHANGES AND THE TRANSACTION
    } catch(e) {
        await session.abortTransaction() //ABORT THE TRANSACTION
        ErrorsPitcher(e)
    } finally {
        await session.endSession() // END THE SESSION
    }
}

// GET BY ID
const getPurchaseById = async (purchaseId: IdType) => {
    checkId(purchaseId)
    try {
        const purchase = await PurchaseModel.findById(purchaseId) //  FIND PURCHASE BY HIS ID
        if(!purchase) { // CHECK IF EXISTS PURCHASE OR RUN AN EXCEPTION
            throw new ResourceNotFoundError('Compra a proveedor')
        }
        return purchase
    } catch(e){
        ErrorsPitcher(e)
    }
}

// GET ALL
const getAllPurchases = async () => {
    try {
        const purchases = await PurchaseModel.find()
        return purchases
    } catch(e){
        ErrorsPitcher(e)
    }
}

export { createPurchase, getPurchaseById, getAllPurchases }
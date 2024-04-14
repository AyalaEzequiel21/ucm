import { startSession } from "../config/startSession";
import { BadRequestError, ResourceNotFoundError } from "../errors/CustomErros";
import { ErrorsPitcher } from "../errors/ErrorsPitcher";
import { PurchaseModel } from "../models";
import { PurchaseMongoType, PurchaseType } from "../schemas/PurchaseSchema";
import { convertDateString, validateDate } from "../utilities/datesUtils";
import { addDiffrenceToBalanceSupplier, addPurchaseToSupplier, removePurchaseToSupplier } from "../utilities/modelUtils/PurchaseUtils";
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
        const supplier = await getSupplierById(supplier_id, session) //  FIND SUPPLIER WITH HIS ID AND SUPPLIER SERVICE
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

// UPDATE 
const modifyPurchase = async (purchaseUpdated: PurchaseMongoType) => {
    const { _id, purchaseDetail, supplier_id } = purchaseUpdated // GET THE IDS AND DETAILS FOR UPDATE THE PURCHASE
    if(!_id || !supplier_id || !purchaseDetail || purchaseDetail.length === 0) {
        throw new BadRequestError('Faltan algunos datos necesarios') // IF SOME PROPERTIE NOT EXISTS RUN AN EXCEPTION
    }
    const session = await startSession() // INIT A SESSION
    try {
        session.startTransaction() // START A TRANSACTION
        const purchaseSaved = await PurchaseModel.findById(_id).session(session) //  FIND THE PURCHASE WITH THIS ID
        if(!purchaseSaved){
            throw new ResourceNotFoundError('Compra a proveedor')
        }
        const oldTotal = purchaseSaved.total_purchase //  GET OLD PURCHASE TOTAL
        purchaseSaved.purchaseDetail = purchaseDetail // UPDATE THE PURCHASE DETAILS
        await purchaseSaved.save({session}) // SAVE THE UPDATED PURCHASE
        if(oldTotal !== undefined && purchaseSaved.total_purchase !== undefined){
            const difference = purchaseSaved.total_purchase - oldTotal // CALCULATE THE DIFFERENCE BEETWEN OLD TOTAL SALE AND THE NEW TOTAL
            difference !== 0 && addDiffrenceToBalanceSupplier(supplier_id, difference, session) //  ADD THE DIFFERENCE TO SUPPLIER BALANCE
        }
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

// GET BY SUPPLIER NAME 
const getPurchaseBySupplierName = async (supplierName: string) => {
    try {   
        const purchasesFound = await PurchaseModel.find({supplier_name: { $regex: supplierName, $options: 'i' }}) //  FIND ALL PURCHASE THAT CONTAINS THE CLIENT NAME    
        return purchasesFound
    } catch(e){
        ErrorsPitcher(e)
    }
}

// GET BY PURCHASE DATE
const getPurchasesByDate = async (purchaseDate: string) => {
    if(!validateDate(purchaseDate)){ // CHECK THAT DATE IS VALID FORMAT OR RUN AN EXCEPTION
        throw new BadRequestError('Datos ingresados no son validos')
    }
    const newFormatDate = convertDateString(purchaseDate) //  CONVERT THE PURCHASE DATE TO DATE WITH VALID FORMAT
    try {
        const purchasesFound = await PurchaseModel.find({createdAt: newFormatDate}) // FIND ALL PURCHASES WITH HIS DATE
        return purchasesFound
    } catch(e) {
        ErrorsPitcher(e)
    }
}

// DELETE BY ID
const removePurchaseById = async (purchaseId: IdType) => {
    checkId(purchaseId)
    const session = await startSession() // INIT A SESSION FOR TRANSACTIONS
    try {
        const purchase = await PurchaseModel.findById(purchaseId).session(session) //  FIND THE PURCHASE BY ID, IF NOT EXISTS RUN AN EXCEPTION
        if(!purchase){
            throw new ResourceNotFoundError('Compra a proveedor')
        }
        if(purchase.supplier_id !== undefined ){ // IF SUPPLIER ID EXISTS THEN REMOVE THE PURCHASE FROM THE SUPPLIER
            await removePurchaseToSupplier(purchase.supplier_id, purchaseId, session)
        }
         await PurchaseModel.findByIdAndDelete(purchaseId) // DELETE THE PURCHASE BY HIS ID
    } catch(e) {
        await session.abortTransaction() //ABORT THE TRANSACTION
        ErrorsPitcher(e)
    }finally{
        await session.endSession() // END THE TRANSACTION
    }
}

export { createPurchase, modifyPurchase, getPurchaseById, getAllPurchases, getPurchaseBySupplierName, getPurchasesByDate, removePurchaseById }
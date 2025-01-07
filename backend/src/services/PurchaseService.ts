import { startSession } from "../config/startSession";
import { BadRequestError, ResourceNotFoundError } from "../errors/CustomErros";
import { ErrorsPitcher } from "../errors/ErrorsPitcher";
import { PurchaseModel } from "../models";
import { PurchaseMongoType, PurchaseType } from "../schemas/PurchaseSchema";
import { convertDateString, validateDate } from "../utilities/datesUtils";
import { addDiferenceToBalanceSupplier, addPurchaseToSupplier, removePurchaseToSupplier, validateSupplier } from "../utilities/modelUtils/PurchaseUtils";
import { IdType } from "../utilities/types/IdType";
import { checkId } from "../utilities/validateObjectId";
import { getSupplierById } from "./SupplierService";

/////////////////////////
// PURCHASE SERVICE
///////////////////////

// CREATE
const createPurchase = async (purchase: PurchaseType) => {
    const { supplier_id, supplier_name, purchaseDetail } = purchase //  GET THE DATA FOR CREATR THE PURCHASE
    if(!supplier_id || !supplier_name || !purchaseDetail){
        throw new BadRequestError("Faltan algunos datos necesarios") //  IF THE SOME PROPERTIE NOT EXISTS RUN AN EXCEPTION        
    }
    const session = await startSession() //  INIT A SESSION
    try {
        session.startTransaction() // START A TRANSACTION
        const supplierExists = await validateSupplier(supplier_id) //  FIND SUPPLIER WITH HIS ID AND SUPPLIER SERVICE
        if(supplierExists){
            const purchaseCreated: unknown[] = await PurchaseModel.create([{ // CREATE THE NEW PURCHASE 
                supplier_id: supplier_id,
                supplier_name: supplier_name, 
                purchaseDetail: purchaseDetail
            }], {session})

            const purchaseParsed = purchaseCreated[0] as PurchaseMongoType
            await addPurchaseToSupplier(supplier_id, purchaseParsed, session) // ADD THE PURCHASE TO SUPPLIER AND UPDATE THE BALANCE
            await session.commitTransaction() // CONFIRM ALL CHANGES AND THE TRANSACTION
            return purchaseParsed
        }
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
        const purchaseSaved = await PurchaseModel.findById(_id) //  FIND THE PURCHASE WITH THIS ID
        if(!purchaseSaved){
            throw new ResourceNotFoundError('Compra a proveedor')
        }
        const oldTotal = purchaseSaved.total_purchase //  GET OLD PURCHASE TOTAL
        purchaseSaved.purchaseDetail = purchaseDetail // UPDATE THE PURCHASE DETAILS
        await purchaseSaved.save({session}) // SAVE THE UPDATED PURCHASE
        if(oldTotal && purchaseSaved.total_purchase){
            const difference = purchaseSaved.total_purchase - oldTotal // CALCULATE THE DIFFERENCE BEETWEN OLD TOTAL SALE AND THE NEW TOTAL            
            if(difference !== 0) await addDiferenceToBalanceSupplier(supplier_id, difference, session) //  ADD THE DIFFERENCE TO SUPPLIER BALANCE
        }
        await session.commitTransaction() // CONFIRM ALL CHANGES AND THE TRANSACTION
        return purchaseSaved
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
        const purchase = await PurchaseModel.findById(purchaseId).lean() //  FIND PURCHASE BY HIS ID
        if(!purchase) { // CHECK IF EXISTS PURCHASE OR RUN AN EXCEPTION
            throw new ResourceNotFoundError('Compra a proveedor')
        }
        return purchase
    } catch(e){
        ErrorsPitcher(e)
    }
}

// GET FOR DETAILS BY ID
const getPurchaseForDetailsById = async (purchaseId: IdType) => {
    checkId(purchaseId)
    try {
        const purchase = await PurchaseModel.findById(purchaseId).lean() //  FIND PURCHASE BY HIS ID
        if(!purchase) { // CHECK IF EXISTS PURCHASE OR RUN AN EXCEPTION
            throw new ResourceNotFoundError('Compra a proveedor')
        }
        const supplier = await getSupplierById(purchase.supplier_id || '') // GET SUPPLIER DATA FOR DETAILS
        const response = {
            ...purchase,
            supplierBalance: supplier?.balance,
            paymentsQuantity: supplier?.payments?.length,
            
        }
        return response
    } catch(e){
        ErrorsPitcher(e)
    }
}

// GET ALL
const getAllPurchases = async () => {
    try {
        const purchases = await PurchaseModel.find().lean()
        return purchases
    } catch(e){
        ErrorsPitcher(e)
    }
}

// GET BY SUPPLIER NAME 
const getPurchaseBySupplierName = async (supplierName: string) => {
    try {   
        const purchasesFound = await PurchaseModel.find({supplier_name: { $regex: supplierName, $options: 'i' }}).lean() //  FIND ALL PURCHASE THAT CONTAINS THE CLIENT NAME    
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
        const purchasesFound = await PurchaseModel.find({createdAt: newFormatDate}).lean() // FIND ALL PURCHASES WITH HIS DATE
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
        session.startTransaction() // INIT THE TRANSACTION
        const purchase = await PurchaseModel.findById(purchaseId) //  FIND THE PURCHASE BY ID, IF NOT EXISTS RUN AN EXCEPTION
        if(!purchase){
            throw new ResourceNotFoundError('Compra a proveedor')
        }
        // const purchaseParsed = purchase as unknown as PurchaseMongoType // PARSE THE PURCHASE AS UNKNOWN FOR CAN PARSE AS PURCHASEMONGOTYPE
        if(purchase.supplier_id && purchase.total_purchase){ // IF SUPPLIER ID EXISTS THEN REMOVE THE PURCHASE FROM THE SUPPLIER
            await removePurchaseToSupplier(purchase.supplier_id, purchaseId, purchase.total_purchase, session)
        }
        await purchase.deleteOne({session}) // DELETE THE PURCHASE BY HIS ID
        await session.commitTransaction() // CONFIRM ALL CHANGES AND THE TRANSACTION
    } catch(e) {
        await session.abortTransaction() //ABORT THE TRANSACTION
        ErrorsPitcher(e)
    }finally{
        await session.endSession() // END THE TRANSACTION
    }
}

export { createPurchase, modifyPurchase, getPurchaseById, getPurchaseForDetailsById, getAllPurchases, getPurchaseBySupplierName, getPurchasesByDate, removePurchaseById }
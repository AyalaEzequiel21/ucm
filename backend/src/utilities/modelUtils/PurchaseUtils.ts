import { ClientSession } from "mongoose";
import { IdType } from "../types/IdType";
import { getSupplierById } from "../../services/SupplierService";
import { ResourceNotFoundError } from "../../errors/CustomErros";
import { PurchaseModel } from "../../models";
import { PurchaseMongoType } from "../../schemas/PurchaseSchema";
import { IPurchasesOfSupplierDetails } from "../interfaces/ISupplierDetails";


/////////////////////////
// PURCHASE UTILS
/////////////////////////


const addPurchaseToSupplier = async (supplierId: IdType, purchase: PurchaseMongoType, session: ClientSession) => {
    try {
        const supplier = await getSupplierById(supplierId)  // FIND THE SUPPLIER
        const { total_purchase, _id } = purchase
        if(supplier &&  total_purchase && _id){ // IF THE SUPPLIER EXISTS ADD THE PURCHASE TO THE LIST OF PURCHASESs
            supplier.purchases?.push(_id) // ADD PURCHASE TO SUPPLIER LIST OF PURCHASES
            supplier.balance += total_purchase || 0// UPDATE THE SUPPLIER BALANCE
            await supplier.save({session}) // SAVE THE SUPPLIER
        }
    } catch(e) {
        throw e
    }
}

const addDiferenceToBalanceSupplier = async (supllierId: IdType, diffrence: number, session: ClientSession) => {
    try {
        const supplier = await getSupplierById(supllierId) // FIND THE SUPPLIER WITH THE SERVICE BY ID
        if(!supplier) {
            throw new ResourceNotFoundError('Proveedor') //  IF THE SUPPLIER IS NOT FOUND, THEN RUN AN EXCEPTION
        }   
        supplier.balance += diffrence     
        await supplier.save({session}) //  SAVE THE SUPPLIER
    } catch(e){
        throw e
    }
}

const removePurchaseToSupplier = async (supplierId: IdType, purchase: PurchaseMongoType, session: ClientSession) => {
    try{
        const supplier = await getSupplierById(supplierId) //  FIND THE SUPPLIER WITH THE SERVICE, IF NOT EXISTS RUN AN EXCEPTION
        if(!supplier){
            throw new ResourceNotFoundError('Proveedor')
        }
        if(supplier.purchases && supplier.balance && purchase.total_purchase){
            supplier.purchases = supplier.purchases?.filter(item => item != purchase._id) // SUBTRACT THE PURCHASE FROM THE LIST OF SUPPLIER 
            supplier.balance -= purchase.total_purchase // UPDATE THE SUPPLIER BALANCE
        }
        await supplier.save({session})
    } catch(e) {
        throw e
    }
}

const validateSupplier = async (supplierId: IdType) => {
    const supplier = await getSupplierById(supplierId)
    return !!supplier
}

const getPurchasesOfSupplierForDetails = async (supplierId: IdType) => {
    const purchases = await PurchaseModel.find({supplier_id: supplierId})
        .select('_id total_purchase createdAt')
        .lean<IPurchasesOfSupplierDetails[]>()
    return purchases
}


export { addPurchaseToSupplier, addDiferenceToBalanceSupplier, getPurchasesOfSupplierForDetails, removePurchaseToSupplier, validateSupplier }
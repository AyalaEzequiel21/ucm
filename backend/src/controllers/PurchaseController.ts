import { NextFunction, Request, Response } from "express";
import { PurchaseMongoType, PurchaseType } from "../schemas/PurchaseSchema";
import { createPurchase, getAllPurchases, getPurchaseById, getPurchaseBySupplierName, getPurchasesByDate, modifyPurchase, removePurchaseById } from "../services/PurchaseService";

/////////////////////////
// PURCHASE CONTROLLER
///////////////////////

// REGISTER PURCHASE 
const registerPurchase = async (req: Request, res: Response, next: NextFunction) => {
    const purchase: PurchaseType = req.body // GET THE DATA FOR REGISTER PURCHASE
    try {
        const purchaseCreated = await createPurchase(purchase) // CREATE THE PURCHASE WITH THE SERVICE
        res.status(201).json({ok: true, data: purchaseCreated})
    } catch(e) {
        next(e)
    }
}

// UPDATE PURCHASE
const updatePurchase = async (req: Request, res: Response, next: NextFunction) => {
    const purchase: PurchaseMongoType = req.body // GET THE PURCHASE UPDATED FROM REQUEST
    try {
        const purchaseUpdated = await modifyPurchase(purchase) //  UPDATE THE PURCHASE WITH THE SERVICE
        res.status(200).json({ok: true, data: purchaseUpdated})
    }catch(e){
        next(e)
    }
}

// FIND PURCHASE BY ID
const findPurchaseById = async (req: Request, res: Response, next: NextFunction) => {
    const purchaseId = req.params.purchaseId // GET THE PURCHASE ID FROM THE PARAMS 
    try {
        const purchase = await getPurchaseById(purchaseId) // FIBD THE PURCHASE BY HIS ID
        res.status(200).json({ok: true, data: purchase})
    } catch(e) {
        next(e)
    }
}

// FIND PURCHASE DETAILS BY ID
const findPurchaseForDetailsById = async (req: Request, res: Response, next: NextFunction) => {
    const purchaseId = req.params.purchaseId // GET THE PURCHASE ID FROM THE PARAMS 
    try {
        const purchase = await getPurchaseById(purchaseId) // FIBD THE PURCHASE BY HIS ID
        res.status(200).json({ok: true, data: purchase})
    } catch(e) {
        next(e)
    }
}


// FIND ALL PURCHASES
const findAllPurchases = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const purchases = await getAllPurchases() // FIND ALL PURCHASES WITH THE SERVICE
        res.status(200).json({ok: true, data: purchases})
    } catch(e){
        next(e)
    }
}

// FIND PURCHASES BY SUPPLIER NAME
const findPurchasesBySupplierName = async (req: Request, res: Response, next: NextFunction) => {
    const supplierName = req.params.supplierName // GET THE SUPPLIER NAME FROM PARAMS
    try {
        const purchasesFound = await getPurchaseBySupplierName(supplierName) //  FIND PURCHASES WITH THE SUPPLIER NAME AND THE SERVICE
        res.status(200).json({ok: true, data: purchasesFound})
    } catch(e) {
        next(e)
    }
}

// FIND PURCHASES BY DATE
const findPurchasesByDate = async (req: Request, res: Response, next: NextFunction) => {
    const {date} = req.query // GET THE PURCHASE DATE FROM PARAMS
    try {
        const purchasesFound = await getPurchasesByDate(date as string) //  FIND ALL PURCHASES OF THESE DATE
        res.status(200).json({ok: true, data: purchasesFound})
    } catch(e) {
        next(e)
    }
}

// DELETE PURCHASE BY ID
const deletePurchaseById = async (req: Request, res: Response, next: NextFunction) => {
    const purchaseId = req.params.purchaseId //  GET THE PURCHASE ID FROM THE PARAMS
    try {
        await removePurchaseById(purchaseId) // DELETE THE PURCHASE WITH THE SERVICE AND HIS ID
        res.status(204).json({ok: true})
    } catch(e){
        next(e)
    }
}

export { registerPurchase, updatePurchase, findPurchaseById, findPurchaseForDetailsById, findAllPurchases, findPurchasesBySupplierName, findPurchasesByDate, deletePurchaseById }
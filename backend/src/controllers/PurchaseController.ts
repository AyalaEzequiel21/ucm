import { NextFunction, Request, Response } from "express";
import { PurchaseType } from "../schemas/PurchaseSchema";
import { createPurchase, getAllPurchases, getPurchaseById } from "../services/PurchaseService";
import { ErrorsPitcher } from "../errors/ErrorsPitcher";

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

// FIND ALL PURCHASES
const findAllPurchases = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const purchases = await getAllPurchases() // FIND ALL PURCHASES WITH THE SERVICE
        res.status(200).json({ok: true, data: purchases})
    } catch(e){
        ErrorsPitcher(e)
    }
}

export { registerPurchase, findPurchaseById, findAllPurchases }
import { NextFunction, Request, Response } from "express"
import { SupplierType } from "../schemas/SupplierSchema"
import { createSupplier, getAllSuppliers } from "../services/SupplierService"


/////////////////////////
// SUPPLIER CONTROLLER
///////////////////////

// NEW SUPPLIER 
const registerSupplier = async (req: Request, res: Response, next: NextFunction) => {
    const supplier: SupplierType = req.body // GET THE SUPPLIER DATA TO CREATE FROM REQUEST
    try {
        const newSupplier = await createSupplier(supplier) // REGISTER THE NEW SUPPLIER WITH CLIENT SERVICE
        res.status(201).json({ok: true, data: newSupplier})
    } catch (e) {
        next(e)
    }
}

// FIND ALL SUPLLIERS
const findAllSuppliers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const suppliers = await getAllSuppliers() //  FIND ALL SUPPLIERS WITH THE SERVICE
        res.status(200).json({ok: true, data: suppliers})
    } catch(e) {
        next(e)
    }
}

export { registerSupplier, findAllSuppliers }
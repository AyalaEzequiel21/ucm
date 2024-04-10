import { NextFunction, Request, Response } from "express"
import { SupplierMongoType, SupplierType } from "../schemas/SupplierSchema"
import { createSupplier, getAllSuppliers, getSupplierById, getSuppliersByName, modifySupplier, removeSupplierById } from "../services/SupplierService"


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

// FIND SUPPLIERS BY NAME
const findSuppliersByName = async (req: Request, res: Response, next: NextFunction) => {
    const supplierName = req.params.supplierName //  GET THE SUPPLIER NAME FROM PARAMAS
    try {
        const suppliersFound = await getSuppliersByName(supplierName) // FIND ALL SUPPLIERS THAT CONTAINS THE SUPPLIERNAME WITH THE SERVICE
        res.status(200).json({ok: true, data: suppliersFound})
    } catch(e) {
        next(e)
    }
}

// FIND SUPPLIER BY ID
const findSupplierById = async (req: Request, res: Response, next: NextFunction) => {
    const supplierId = req.params.supplierId //  GET THE SUPPLIER ID FROM PARAMS
    try{
        const supplier = await getSupplierById(supplierId) //  FIND SUPPLIER BY HIS ID WITH THE SERVICE
        res.status(200).json({ok: true, data: supplier})
    } catch(e) {
        next(e)
    }
}

// UPDATED SUPPLIER
const updateSupplier = async (req: Request, res: Response, next: NextFunction) => {
    const supplierUpdated: SupplierMongoType = req.body //  GET THE SUPPLIER UPDATED FROM BODY
    try{
        const supplier = await modifySupplier(supplierUpdated) // UPDATE THE SUPPLIER WITH THE SERVICE
        res.status(200).json({ok: true, data: supplier})
    } catch(e){
        next(e)
    }
}

// DELETE SUPPLIER BY ID
const deleteSupplierById = async (req: Request, res: Response, next: NextFunction) => {
    const supplierId = req.params.supplierId //  GET THE SUPPLIER ID FROM PARAMS
    try {
        await removeSupplierById(supplierId) //  DELETE THE SUPPLIER WITH HIS ID AND THE SERVICE
        res.status(204).json({ok: true})
    } catch(e) {
        next(e)
    }
}

export { registerSupplier, findAllSuppliers, findSuppliersByName, findSupplierById, updateSupplier, deleteSupplierById }
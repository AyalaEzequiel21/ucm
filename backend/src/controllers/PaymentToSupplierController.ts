import { NextFunction, Request, Response } from "express";
import { PaymentToSupplierType } from "../schemas/PaymentToSupplierSchema";
import { createPaymentToSupplier, removePaymentToSupplierById } from "../services/PaymentToSupplierService";

////////////////////////////////////
// PAYMENT TO SUPPLIER CONTROLLER
///////////////////////////////////

// REGISTER NEW PAYMENT TO SUPPLIER
const registerPaymentToSupplier = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const paymentSupplier: PaymentToSupplierType = req.body // GET THE PAYMENT DATA FROM BODY REQUEST
        const newPaymentSupplier = await createPaymentToSupplier(paymentSupplier) // CREATE THE NEW PAYMENT TO SUPPLIER WITH THE SERVICE
        res.status(201).json({ok: true, data: newPaymentSupplier})
    } catch(e) {
        next(e)
    }
}

// DELETE THE PAYMENT TO SUPPLIER BY ID
const deletePaymentSupplierById = async (req: Request, res: Response, next: NextFunction) => {
    const paymentToSupplierId = req.params.paymentToSupplierId //  GET THE PAYMENT TO SUPPLIER ID
    try {
        await removePaymentToSupplierById(paymentToSupplierId) // DELETE THE PAYMENT SUPPLIER BY ID
        res.status(204).json({ok: true})
    } catch(e){
        next(e)
    }
}

export { registerPaymentToSupplier, deletePaymentSupplierById }
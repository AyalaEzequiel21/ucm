import { NextFunction, Request, Response } from "express";
import { PaymentToSupplierType } from "../schemas/PaymentToSupplierSchema";
import { createPaymentToSupplier, getAllPaymentsToSupplier, getPaymentToSupplierById, getPaymentsToSupplierByDate, getPaymentsToSupplierByPaymentMethod, getPaymentsToSupplierBySupplierId, removePaymentToSupplierById } from "../services/PaymentToSupplierService";
import { PaymentMethodType } from "../utilities/types/PaymentMethod";

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

// FIND ALL PAYMENTS TO SUPPLIER
const findAllPaymentsToSupplier = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const paymentsSupplier = await getAllPaymentsToSupplier() //  FIND ALL PAYMENTS SUPPLIER WITH THE SERVICE
        res.status(200).json({ok: true, data: paymentsSupplier})
    } catch(e){
        next(e)
    }
}

// FIND PAYMENT TO SUPPLIER BY ID
const findPaymentToSupplierById = async (req: Request, res: Response, next: NextFunction) => {
    const paymentId = req.params.paymentId // GET THE PAYMENT SUPPLIER ID FROM THE PARAMS
    try {
        const paymentSupplier = await getPaymentToSupplierById(paymentId) //  FIND THE PAYMENT TO SUPPLIER BY HIS ID
        res.status(200).json({ok: true, data: paymentSupplier})
    } catch(e){
        next(e)
    }
}

 // FIND PAYMENTS BY PAYMENT METHOD
 const findPaymentsSupplierByPaymentMethod = async (req: Request, res: Response, next: NextFunction) => {
    const method = req.params.paymentMethod as PaymentMethodType //  GET THE PAYMENT MEHOD FROM THE PARAMS
    try {
        const paymentsFound = await getPaymentsToSupplierByPaymentMethod(method) //  FIND ALL PAYMENTS TO SUPPLIER BY HIS PAYMENT METHOD WITH THE SERVICE
        res.status(200).json({ok: true, data: paymentsFound})
    } catch(e) {
        next(e)
    }
 }

 // FIND PAYMENTS TO SUPPLIER BY SUPPLIER ID
 const findPaymentsSupplierBySupplierId = async (req: Request, res: Response, next: NextFunction) => {
    const supplierId = req.params.supplierId //  GET THE SUPPLIER ID FROM THE PARAMS
    try {
        const paymentsFound = await getPaymentsToSupplierBySupplierId(supplierId) //  FIND ALL PAYMENTS TO SUPPLIER BY SUPPLIER ID WITH THE SERVICE
        res.status(200).json({ok: true, data: paymentsFound})
    } catch(e){
        next(e)
    }
 }

 // FIND PAYMENTS TO SUPPLIER BY DATE 
 const findPaymentsSupplierByDate = async (req: Request, res: Response, next: NextFunction) => {
    const {date} = req.query //  GET THE PAYMENT DATE FROM QUERY REQUEST
    try {
        const paymentsFound = await getPaymentsToSupplierByDate(date as string) //  FIND PAYMENTS TO SUPPLIER WITH THAT DATE WITH THE SERVICE
        res.status(200).json({ok: true, data: paymentsFound})
    } catch(e) {
        next(e)
    }
 }

export { registerPaymentToSupplier, deletePaymentSupplierById, findAllPaymentsToSupplier, findPaymentToSupplierById, findPaymentsSupplierByPaymentMethod, findPaymentsSupplierBySupplierId, findPaymentsSupplierByDate }
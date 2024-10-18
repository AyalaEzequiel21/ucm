import { NextFunction, Request, Response } from "express";
import { ClientPaymentType } from "../schemas/ClientPaymentSchema";
import { createClientPayment, getAllClientsPayments, getClientPaymentsById, getClientPaymentsByIdForDetail, getClientsPaymentsByDate, getPaymentsByClientId, getPaymentsPaymentMethod, removeClientPayment } from "../services/ClientPaymentService";
import { PaymentMethodType } from "../utilities/types/PaymentMethod";
import { RequestExtended } from "../utilities/interfaces/RequestExtended";

/////////////////////////
// CLIENT PAYMENT CONTROLLER
///////////////////////

// NEW CLIENT PAYMENT
const registerClientPayment = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const clientPayment: ClientPaymentType = req.body //  GET THE DATA PAYMENT FROM REQUEST
        const newClientPayment = await createClientPayment(clientPayment) // REGISTER THE NEW CLIENT PAYMENT WITH THE SERVICE
        res.status(201).json({ok: true, data: newClientPayment})
    } catch(e) {
        next(e)
    }
}

// DELETE CLIENT PAYMENT
const deleteClientPaymentById = async (req: Request, res: Response, next: NextFunction) => {
    const paymentId = req.params.clientPaymentId  // GET THE PAYMENT ID FROM THE PARAMAS REQUEST
    try {
        await removeClientPayment(paymentId) // DELETE THE PAYMENT WITH SERVICE
        res.status(204).json({ok: true})
    } catch(e) {
        next(e)
    }
}

// FIND CLIENT PAYMENT BY ID
const findClientPaymentById = async (req: Request, res: Response, next: NextFunction) => {
    const paymentId = req.params.paymentId
    try {
        const paymentsFound = await getClientPaymentsById(paymentId) // FIND ALL PAYMENTS WITH THE SERVICE
        res.status(200).json({ok: true, data: paymentsFound})
    } catch(e) {
        next(e)
    }
}

//  FIND CLIENT PAYMENT FOR DETAIL BY ID 
const findClientPaymentDetailById = async (req: Request, res: Response, next: NextFunction) => {
    const paymentId = req.params.paymentId
    try {
        const paymentsFound = await getClientPaymentsByIdForDetail(paymentId) // FIND ALL PAYMENTS WITH THE SERVICE
        res.status(200).json({ok: true, data: paymentsFound})
    } catch(e) {
        next(e)
    }
}

// FIND ALL CLIENTS PAYMENTS
const findAllClientsPayments = async (req: RequestExtended, res: Response, next: NextFunction) => {
    const inDelivery = !!req.filterDelivery
    try {
        const paymentsFound = await getAllClientsPayments(inDelivery) // FIND ALL PAYMENTS WITH THE SERVICE
        res.status(200).json({ok: true, data: paymentsFound})
    } catch(e) {
        next(e)
    }
}

// FIND ALL PAYMENTS OF THE CLIENT
const findClientPaymentsByClientId = async (req: Request, res: Response, next: NextFunction) => {
    const clientId = req.params.clientId // GET THE CLIENT ID FROM PARAMS REQUEST
    try {
        const paymentsOfClient = await getPaymentsByClientId(clientId) //  FIND ALL PAYMENTS OF THE CLIENT BY HIS ID
        res.status(200).json({ok: true, data: paymentsOfClient})
    } catch(e) {
        next(e)
    }
}

// FIND PAYMENTS BY PAYMENTS METHOD
const findClientPaymentsByPaymentMethod = async (req: Request, res: Response, next: NextFunction) => {
    const method = req.params.paymentMethod as PaymentMethodType //  FIND THE PAYMENT METHOD FROM PARAMS REQUEST
    try {
        const paymentsFound = await getPaymentsPaymentMethod(method)
        res.status(200).json({ok: true, data: paymentsFound})
    } catch(e) {
        next(e)
    }
}

// FIND PAYMENTS BY DATE
const findClientPaymentsByDate = async (req: Request, res: Response, next: NextFunction) => {
    const {date} = req.query // GET THE PAYMENT DATE FROM QUERY REQUEST
    try {
        const paymentsFound = await getClientsPaymentsByDate(date as string)
        res.status(200).json({ok: true, data: paymentsFound})
    } catch(e) {
        next(e)
    }
}

export { registerClientPayment, deleteClientPaymentById, findClientPaymentDetailById, findAllClientsPayments, findClientPaymentById, findClientPaymentsByClientId, findClientPaymentsByDate, findClientPaymentsByPaymentMethod }
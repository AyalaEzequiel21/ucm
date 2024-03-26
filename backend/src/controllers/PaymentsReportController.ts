import { NextFunction, Request, Response } from "express";
import { PaymentsReportType } from "../schemas/PaymentsReportSchema";
import { createPaymentsReport, getAllPaymentsReports, getAllPendingPaymentsReports, getPaymentsReportById, removePaymentsReportById } from "../services/PaymentsReportService";

/////////////////////////
// PAYMENTS REPORT CONTROLLER
///////////////////////

// NEW PAYMENTS REPORT 
const registerPaymentsReport = async (req:Request, res: Response, next: NextFunction) => {
    try {
        const paymentsReport: PaymentsReportType = req.body // GET THE DATA OF REPORT FROM REQUEST
        const newPaymentsReport = await createPaymentsReport(paymentsReport) // REGISTER THE NEW PAYMENT WITH THE SERVICE
        res.status(201).json({ok: true, data: newPaymentsReport}) 
    } catch(e) {
        next(e)
    }
}

// DELETE PAYMENTS REPORT
const deletePaymentsReportById = async (req: Request, res: Response, next: NextFunction) => {
    const paymentId = req.params.paymentsReportId  // GET THE REPORT ID FROM THE PARAMAS REQUEST
    try {
        await removePaymentsReportById(paymentId) // DELETE THE PAYMENTS REPORT WITH SERVICE
        res.status(204).json({ok: true})
    } catch(e) {
        next(e)
    }
}

// FIND PAYMENTS REPORT BY ID
const findPaymentsReportById = async (req: Request, res: Response, next: NextFunction) => {
    const paymentId = req.params.PaymentId // GET THE REPORT ID FROM THE PARAMAS REQUEST
    try {
        const paymentsReport = await getPaymentsReportById(paymentId) // FIND THE PAYMENTS REPORT WITH THE SERVICE
        res.status(200).json({ok: true, data: paymentsReport})
    } catch(e) {
        next(e)
    }
}

// FIND ALL REPORTS 
const findAllPaymentsReport = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const paymentsReports = await getAllPaymentsReports() //  FIND ALL PAYMENTS REPORT WITH THE SERVICE
        res.status(200).json({ok: true, data: paymentsReports})
    } catch(e) {
        next(e)
    }
}
// FIND ALL PENDING REPORTS
const findPendingReports = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const pendingReports = await getAllPendingPaymentsReports()
        res.status(200).json({ok: true, data: pendingReports})
    } catch(e) {
        next(e)
    }
} 
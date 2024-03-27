import { NextFunction, Request, Response } from "express";
import { PaymentsReportMongoType, PaymentsReportType } from "../schemas/PaymentsReportSchema";
import { createPaymentsReport, getAllPaymentsReports, getAllPendingPaymentsReports, getAllValidatedPaymentsReports, getPaymentsReportById, getPaymentsReportsByDate, modifyPaymentsreport, removePaymentsReportById, validatePaymentsReport } from "../services/PaymentsReportService";

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
    const reportId = req.params.paymentsReportId  // GET THE REPORT ID FROM THE PARAMAS REQUEST
    try {
        await removePaymentsReportById(reportId) // DELETE THE PAYMENTS REPORT WITH SERVICE
        res.status(204).json({ok: true})
    } catch(e) {
        next(e)
    }
}

// FIND PAYMENTS REPORT BY ID
const findPaymentsReportById = async (req: Request, res: Response, next: NextFunction) => {
    const reportId = req.params.reportId // GET THE REPORT ID FROM THE PARAMAS REQUEST
    try {
        const paymentsReport = await getPaymentsReportById(reportId) // FIND THE PAYMENTS REPORT WITH THE SERVICE
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

// FIND ALL VALIDATED REPORTS
const findValidatedReports = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const validatedReports = await getAllValidatedPaymentsReports()
        res.status(200).json({ok: true, data: validatedReports})
    } catch(e) {
        next(e)
    }
} 

// FIND PAYMENTS REPORT BY DATE
const findPaymentsReportByDate = async (req: Request, res: Response, next: NextFunction) => {
    const {date} = req.query // GET THE PAYMENTS REPORT DATE FROM QUERY REQUEST
    try {
        const paymentsFound = await getPaymentsReportsByDate(date as string) // FIND REPORTS BY DATE WITH THE SERVICE
        res.status(200).json({ok: true, data: paymentsFound})
    } catch(e) {
        next(e)
    }
}

// VALIDATE REPORT AND PROCESS THE PAYMENTS
const processAllPaymentsReport = async (req: Request, res: Response, next: NextFunction) => {
    const reportId = req.params.reportId // GET THE REPORT ID FROM THE REQUEST
    try {
        const reportValidated = await validatePaymentsReport(reportId) // VALIDATE THE REPORT AND PROCESS ALL PAYMENTS WITH THE SERVICE
        res.status(200).json({ok: true, data: reportValidated})
    } catch(e) {
        next(e)
    }
}

// UPDATE PAYMENTS REPORT ONLY IF IS NOT VALIDATED
const updatePaymentsReport = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const reportUpdated: PaymentsReportMongoType = req.body // GET THE DATA UPDATED OF REPORT FROM THE REQUEST
        const newReport = await modifyPaymentsreport(reportUpdated) // UPDATE TO THE REPORT WITH THE SERVICE
        res.status(200).json({ok: true, data: newReport})
    } catch(e) {
        next(e)
    }
}

export { registerPaymentsReport, deletePaymentsReportById, updatePaymentsReport, findAllPaymentsReport, findPaymentsReportByDate, findPaymentsReportById, findPendingReports, findValidatedReports, processAllPaymentsReport }
import express from 'express'
import { validateUser, validateUserRole } from '../middleware/AuthMidd'
import { deletePaymentsReportById, findAllPaymentsReport, findPaymentsReportByDate, findPaymentsReportById, findPendingReports, findValidatedReports, processAllPaymentsReport, registerPaymentsReport, updatePaymentsReport } from '../controllers/PaymentsReportController'
import { validateSchemaRequest } from '../middleware/RequestMidd'
import { newPaymentsReportSchema, paymentsReportMongoSchema } from '../schemas/PaymentsReportSchema'

// PAYMENTS REPORT ROUTES
const router = express.Router()

// MIDDLEWARE FOR VALIDATE IF USER IS AUTHENTICATED
router.use(validateUser())

//  GET ALL PAYMENTS REPORTS
router.get("/", findAllPaymentsReport)
// PAYMENTS REPORT REGISTER 
router.post("/register", validateSchemaRequest(newPaymentsReportSchema), registerPaymentsReport)
// GET  ALL PAYMENTS REPORT VALIDATED  
router.get("/allValidated", findValidatedReports)
// GET ALL PENDING PAYMENTS REPORT 
router.get("/allPending", findPendingReports)
// GET PAYMENTS REPORT BY REPORT ID
router.get("/report/:reportId", findPaymentsReportById) //
// GET PAYMENTS REPORT BY REPORT DATE
router.get("/payment-date", findPaymentsReportByDate)

// MIDDLEWARE FOR CHECK IF USER ROLE IS VALID
router.use(validateUserRole(['admin', 'biller']))

// UPDATE PAYMENTS REPORT
router.put("/update", validateSchemaRequest(paymentsReportMongoSchema), updatePaymentsReport)
// VALIDATE PAYMENTS REPORT AND PROCESS THE PAYMENTS
router.put("/validate/:reportId", processAllPaymentsReport)
// PAYMENTS REPORT DELETE
router.delete("/delete/:paymentsReportId", deletePaymentsReportById)

export default router
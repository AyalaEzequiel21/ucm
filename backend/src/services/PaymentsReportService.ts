import { ObjectId } from "mongoose";
import { BadRequestError, InternalServerError, ResourceNotFoundError } from "../errors/CustomErros";
import { ErrorsPitcher } from "../errors/ErrorsPitcher";
import { PaymentsReportModel } from "../models";
import { PaymentsReportMongoType, PaymentsReportType } from "../schemas/PaymentsReportSchema";
import { convertDateString, validateDate } from "../utilities/datesUtils";
import { checkIsValidPayments, processPaymentsOfReport } from "../utilities/modelUtils/PaymentsReportUtils";
import { checkId } from "../utilities/validateObjectId";
import { startSession } from "../config/startSession";
import { IdType } from "../utilities/types/IdType";

/////////////////////////
// PAYMENTS REPORT SERVICE
///////////////////////

//  CREATE
 const createPaymentsReport = async (newReport: PaymentsReportType) => {
    const { payments_dto } = newReport
    if(payments_dto.length === 0){ // IF THE PAYMENTS ARE EMPTY THEN RUN AN EXCEPTION
        throw new BadRequestError('Lista de pagos vacia.')
    }
    checkIsValidPayments(payments_dto) // CHECK IF ALL PAYMENTS ARE VALID
    try {
        const paymentsReport = PaymentsReportModel.create({ // CREATE THE REPORT WITH THE PAYMENTS VALIDATED, THIS REPORT HAVE TH STATUS = 'PENDIENTE'
            payments_dto: payments_dto
        })
        return paymentsReport
    } catch(e) {
        ErrorsPitcher(e)
    }
 }

 // FIND ALL
 const getAllPaymentsReports = async () => {
    try {
        const reports = await PaymentsReportModel.find() //  FIND ALL PAYMENTS REPORT
        return reports
    } catch(e) {
        ErrorsPitcher(e)
    }
 }

 // FIND BY ID
 const getPaymentsReportById = async (reportId: IdType) => {
    checkId(reportId) // CHECK IF REPORT ID IS VALID
    try {
        const reportSaved = await PaymentsReportModel.findById(reportId) //  FIND THE REPORT BY HIS ID
        if(!reportSaved){
            throw new ResourceNotFoundError('Reporte de pagos')
        }
        return reportSaved
    } catch(e) {
        ErrorsPitcher(e)
    }
 }

 // FIND ALL VALIDATED REPORTS
 const getAllValidatedPaymentsReports = async () => {
    try {
        const reports = await PaymentsReportModel.find({report_status: "aprobado"}) //  FIND ALL VALIDATED PAYMENTS REPORT
        return reports
    } catch(e) {
        ErrorsPitcher(e)
    }
 }

  // FIND ALL PENDING REPORTS
  const getAllPendingPaymentsReports = async () => {
    try {
        const reports = await PaymentsReportModel.find({report_status: "pendiente"}) //  FIND ALL PENDING PAYMENTS REPORT
        return reports
    } catch(e) {
        ErrorsPitcher(e)
    }
 }

 // FIND BY DATE
 const getPaymentsReportsByDate = async (date: string) => {
    if(!validateDate(date)) {  // CHECK THAT DATE IS VALID FORMAT OR RUN AN EXCEPTION
        throw new BadRequestError('Datos ingresados no son validos')
    }
    const newFormatDate = convertDateString(date) // CONVERT THE DATE TO FORMAT FOR SEARCH
    try {
        const reportsFound = await PaymentsReportModel.find({createdAt: newFormatDate})  //  FIND ALL REPORTS WITH SAME DATE
        return reportsFound
    } catch(e) {
        ErrorsPitcher(e)
    }
 }

 // UPDATE
 const modifyPaymentsreport = async (reportUpdated: PaymentsReportMongoType) => {
    const { _id, payments_dto} = reportUpdated // GET THE ID AND PAYMENTS_DTO FROM PARAMS
    if(payments_dto.length === 0) {
        throw new BadRequestError('Lista de pagos vacia') // IF PAYMENTS_STO IS EMPTY LIST RUN AN EXCEPTION
    }
    checkIsValidPayments(payments_dto) // CHECK IF ALL PAYMENTS ARE VALID
    try {
        const report = await PaymentsReportModel.findById(_id) // FIND THE OLD VERSION OF REPORT
        if(!report || report.report_status === 'aprobado' ){ // IF REPORT HAS BEEN VALIDATE, CAN'T TO UPDATE
            throw new ResourceNotFoundError('Reporte de pagos')
        }
        report.payments_dto = payments_dto // IF ARE VALID PAYMENTS THEN UPDATE REPORT AND SAVE
        await report.save()
    } catch (e) {
        ErrorsPitcher(e)
    }
 }

 // VALIDATE REPORT
 const validatePaymentsReport = async (paymentsReportId: IdType) => {
    checkId(paymentsReportId) // CHECK IF ID IS VALID
    const session = await startSession() // INIT THE SESSION
    try {
        session.startTransaction() // INIT TRANSACTIONS
        const reportSaved = await PaymentsReportModel.findById(paymentsReportId) // FIND THE REPORT BY HIS ID
        if(!reportSaved || reportSaved.report_status === 'aprobado') { // IF NOT EXISTS OR HIS STATUS IS APROBADO RUN AN EXCEPTIONS
            throw new ResourceNotFoundError('Reporte de pagos')
        }
        const paymentProcess = await processPaymentsOfReport(reportSaved.payments_dto, reportSaved._id, session) // PROCESS ALL PAYMENTS WITH UTILS FUNCTION
        if(paymentProcess.length === 0){
            throw new InternalServerError("No se procesaron los datos")
        }
        reportSaved.payments = paymentProcess //  SET THE PROCESS PAYMENTS 
        reportSaved.payments_dto = [] //  SET THE PAYMENTS DTO AS EMPTY LIST
        reportSaved.report_status = "aprobado" //  SET THE NEW REPORT STATUS
        const reportValidated = await reportSaved.save({session}) // SAVE THE CHANGES
        await session.commitTransaction() //  CONFIRM TRANSACTION
        return reportValidated
    } catch(e) {        
        await session.abortTransaction()
        ErrorsPitcher(e)
    }
    await session.endSession()
 }

 // DELETE BY ID
 const removePaymentsReportById = async (reportId: IdType) => {
    checkId(reportId) // CHECK IF REPORT ID IS VALID
    try {
        const reportSaved = await PaymentsReportModel.findById(reportId) //  FIND THE REPORT BY HIS ID
        if(!reportSaved || reportSaved.report_status === 'aprobado') { // IF HIS STATUS IS APROBADO OR REPORT NOT EXISTS RUN AN EXCEPTION
            throw new ResourceNotFoundError('Reporte de pagos')
        }
        await PaymentsReportModel.findByIdAndDelete(reportId) // DELETE THE REPORT
    } catch(e) {
        ErrorsPitcher(e)
    }
 }

 export { createPaymentsReport, removePaymentsReportById, getAllPaymentsReports, getPaymentsReportById, getAllPendingPaymentsReports, getAllValidatedPaymentsReports, getPaymentsReportsByDate, modifyPaymentsreport, validatePaymentsReport }
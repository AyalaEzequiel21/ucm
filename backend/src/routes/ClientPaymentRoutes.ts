import express from 'express'
import { validateUser, validateUserRole } from '../middleware/AuthMidd'
import { validateSchemaRequest } from '../middleware/RequestMidd'
import { newClientPaymentSchema } from '../schemas/ClientPaymentSchema'
import { deleteClientPaymentById, findAllClientsPayments, findClientPaymentById, findClientPaymentDetailById, findClientPaymentsByClientId, findClientPaymentsByDate, findClientPaymentsByPaymentMethod, registerClientPayment } from '../controllers/ClientPaymentController'
import { filterGetAll } from '../middleware/GetAllMidd'

// CLIENT PAYMENT ROUTES
const router = express.Router()

// MIDDLEWARE FOR VALIDATE IF USER IS AUTHENTICATED
router.use(validateUser())

//  GET ALL CLIENT PAYMENTS 
router.get("/", filterGetAll(), findAllClientsPayments)

// MIDDLEWARE FOR CHECK IF USER ROLE IS VALID
router.use(validateUserRole(['admin', 'biller']))

// CLIENT PAYMENT REGISTER 
router.post("/register", validateSchemaRequest(newClientPaymentSchema), registerClientPayment)
// GET CLIENT PAYMENTS BY PAYMENT METHOD
router.get("/method/:paymentMethod", findClientPaymentsByPaymentMethod)
// GET CLIENT PAYMENTS BY PAYMENT ID
router.get("/payment/:paymentId", findClientPaymentById) 
// GET CLIENT PAYMENT FOR DETAIL BY PAYMENT ID
router.get("/paymentDetail/:paymentId", findClientPaymentDetailById)
// GET CLIENT PAYMENTS BY PAYMENT DATE
router.get("/payment-date", findClientPaymentsByDate)
// GET ALL CLIENT PAYMENTS BY CLIENT ID    
router.get("/client/:clientId", findClientPaymentsByClientId)
// CLIENT PAYMENT DELETE
router.delete("/delete/:clientPaymentId", deleteClientPaymentById)

export default router
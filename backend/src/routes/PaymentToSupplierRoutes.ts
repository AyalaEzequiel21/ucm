import express from 'express'
import { validateUser, validateUserRole } from '../middleware/AuthMidd'
import { validateSchemaRequest } from '../middleware/RequestMidd'
import { newPaymentToSupplierSchema } from '../schemas/PaymentToSupplierSchema'
import { deletePaymentSupplierById, registerPaymentToSupplier } from '../controllers/PaymentToSupplierController'


// PAYMENT TO SUPPLIER ROUTES
const router = express.Router()

// MIDDLEWARE FOR VALIDATE IF USER IS AUTHENTICATED
router.use(validateUser())

// MIDDLEWARE FOR CHECK IF USER ROLE IS VALID
router.use(validateUserRole(['admin', 'biller']))

//  GET ALL  PAYMENTS TO SUPPLIER
router.get("/", )
// PAYMENT TO SUPPLIER REGISTER 
router.post("/register", validateSchemaRequest(newPaymentToSupplierSchema), registerPaymentToSupplier)
// GET PAYMENTS TO SUPPLIER BY PAYMENT METHOD
router.get("/method/:paymentMethod", )
// GET PAYMENTS TO SUPPLIER BY PAYMENT ID
router.get("/paymentToSupplier/:paymentId", )
// GET PAYMENTS TO SUPPLIER BY PAYMENT DATE
router.get("/payment-date", )
// GET ALL PAYMENTS TO SUPPLIER BY SUPPLIER ID    
router.get("/supplier/:supplierId", )
//  PAYMENT TO SUPPLIER DELETE
router.delete("/delete/:paymentToSupplierId", deletePaymentSupplierById)

export default router
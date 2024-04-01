import express from 'express'
import { validateUser, validateUserRole } from '../middleware/AuthMidd'
import { validateSchemaRequest } from '../middleware/RequestMidd'
import { newSaleSchema, saleMongoSchema } from '../schemas/SaleSchema'
import { registerSale } from '../controllers/SaleController'

// SALE ROUTES
const router = express.Router()

// MIDDLEWARE FOR VALIDATE IF USER IS AUTHENTICATED
router.use(validateUser())

// GET ALL SALES
router.get("/")
// GET SALE BY ID
router.get("/sale/:saleId")
// GET SALES BY NAME CLIENT
router.get("/client/:clientName", )
// GET SALES BY DATE
router.get("/saleDate", )

// MIDDLEWARE FOR CHECK IF USER ROLE IS VALID
router.use(validateUserRole(['admin', 'biller']))

// SALE REGISTER 
router.post("/register", validateSchemaRequest(newSaleSchema), registerSale)
// SALE UPDATE
router.put("/update", validateSchemaRequest(saleMongoSchema))
// SALE DELETE
router.delete("/delete/:saleId",)


export default router
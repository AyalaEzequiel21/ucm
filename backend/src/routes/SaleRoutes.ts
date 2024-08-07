import express from 'express'
import { validateUser, validateUserRole } from '../middleware/AuthMidd'
import { validateSchemaRequest } from '../middleware/RequestMidd'
import { newSaleSchema, saleMongoSchema } from '../schemas/SaleSchema'
import { deleteSaleById, findAllSales, findSaleById, findSalesByClientName, findSalesByDate, registerSale, updateSale } from '../controllers/SaleController'
import { filterGetAll } from '../middleware/GetAllMidd'

// SALE ROUTES
const router = express.Router()

// MIDDLEWARE FOR VALIDATE IF USER IS AUTHENTICATED
router.use(validateUser())

// GET ALL SALES
router.get("/", filterGetAll(), findAllSales)
// GET SALE BY ID
router.get("/sale/:saleId", findSaleById)
// GET SALES BY NAME CLIENT
router.get("/client/:clientName", filterGetAll(), findSalesByClientName)
// GET SALES BY DATE
router.get("/saleDate", filterGetAll(), findSalesByDate)

// MIDDLEWARE FOR CHECK IF USER ROLE IS VALID
router.use(validateUserRole(['admin', 'biller']))

// SALE REGISTER 
router.post("/register", validateSchemaRequest(newSaleSchema), registerSale)
// SALE UPDATE
router.put("/update", validateSchemaRequest(saleMongoSchema), updateSale)
// SALE DELETE
router.delete("/delete/:saleId", deleteSaleById)


export default router
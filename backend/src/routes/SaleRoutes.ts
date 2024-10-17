import express from 'express'
import { validateUser, validateUserRole } from '../middleware/AuthMidd'
import { validateSchemaRequest } from '../middleware/RequestMidd'
import { newSaleSchema, saleMongoSchema } from '../schemas/SaleSchema'
import { deleteSaleById, findAllSales, findSaleById, findSalesByClientId, findSalesByClientName, findSalesByDate, findSalesForDetailsById, registerSale, updateSale } from '../controllers/SaleController'
import { filterGetAll } from '../middleware/GetAllMidd'

// SALE ROUTES
const router = express.Router()

// MIDDLEWARE FOR VALIDATE IF USER IS AUTHENTICATED
router.use(validateUser())

// GET ALL SALES
router.get("/", filterGetAll(), findAllSales)
// GET SALE BY ID
router.get("/sale/:saleId", findSaleById)
// GET SALE FOR DETAILS BY ID
router.get("/saleDetails/:saleId", findSalesForDetailsById)

// MIDDLEWARE FOR CHECK IF USER ROLE IS VALID
router.use(validateUserRole(['admin', 'biller']))

// GET ALL SALES BY ID CLIENT
router.get("/client/id/:clientId", filterGetAll(), findSalesByClientId)
// GET SALES BY NAME CLIENT
router.get("/client/:clientName", filterGetAll(), findSalesByClientName)
// GET SALES BY DATE
router.get("/saleDate", filterGetAll(), findSalesByDate)
// SALE REGISTER 
router.post("/register", validateSchemaRequest(newSaleSchema), registerSale)
// SALE UPDATE
router.put("/update", validateSchemaRequest(saleMongoSchema), updateSale)
// SALE DELETE
router.delete("/delete/:saleId", deleteSaleById)


export default router
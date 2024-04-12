import express from "express"
import { validateUser, validateUserRole } from "../middleware/AuthMidd"
import { validateSchemaRequest } from "../middleware/RequestMidd"
import { newPurchaseSchema, purchaseMongoSchema } from "../schemas/PurchaseSchema"

// PURCHASE ROUTES
const router = express.Router()

// MIDDLEWARE FOR VALIDATE IF USER IS AUTHENTICATED
router.use(validateUser())

// MIDDLEWARE FOR CHECK IF USER ROLE IS VALID
router.use(validateUserRole(['admin', 'biller']))

// GET ALL PURCHASE
router.get("/", )
// GET PURCHASE BY ID
router.get("/sale/:saleId", )
// GET PURCHASE BY NAME SUPPLIER
router.get("/client/:clientName", )
// GET PURCHASE BY DATE
router.get("/saleDate", )

// PURCHASE REGISTER 
router.post("/register", validateSchemaRequest(newPurchaseSchema))
// PURCHASE UPDATE
router.put("/update", validateSchemaRequest(purchaseMongoSchema), )
// PURCHASE DELETE
router.delete("/delete/:purchaseId", )


export default router
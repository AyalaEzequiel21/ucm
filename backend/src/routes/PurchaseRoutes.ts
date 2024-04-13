import express from "express"
import { validateUser, validateUserRole } from "../middleware/AuthMidd"
import { validateSchemaRequest } from "../middleware/RequestMidd"
import { newPurchaseSchema, purchaseMongoSchema } from "../schemas/PurchaseSchema"
import { findAllPurchases, findPurchaseById, registerPurchase } from "../controllers/PurchaseController"

// PURCHASE ROUTES
const router = express.Router()

// MIDDLEWARE FOR VALIDATE IF USER IS AUTHENTICATED
router.use(validateUser())

// MIDDLEWARE FOR CHECK IF USER ROLE IS VALID
router.use(validateUserRole(['admin', 'biller']))

// GET ALL PURCHASE
router.get("/", findAllPurchases)
// GET PURCHASE BY ID
router.get("/purchase/:purchaseId", findPurchaseById)
// GET PURCHASE BY NAME SUPPLIER
router.get("/supplier/:supplierName", )
// GET PURCHASE BY DATE
router.get("/purchaseDate", )

// PURCHASE REGISTER 
router.post("/register", validateSchemaRequest(newPurchaseSchema), registerPurchase)
// PURCHASE UPDATE
router.put("/update", validateSchemaRequest(purchaseMongoSchema), )
// PURCHASE DELETE
router.delete("/delete/:purchaseId", )


export default router
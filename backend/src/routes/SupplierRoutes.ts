import express from 'express'
import { validateUser, validateUserRole } from '../middleware/AuthMidd'
import { validateSchemaRequest } from '../middleware/RequestMidd'
import { newSupplierSchema, supplierMongoSchema } from '../schemas/SupplierSchema'
import { findAllSuppliers, registerSupplier } from '../controllers/SupplierController'

// SUPPLIER ROUTES
const router = express.Router()

// MIDDLEWARE FOR VALIDATE IF USER IS AUTHENTICATED
router.use(validateUser())

// MIDDLEWARE FOR VALIDATE IF USER ROLE IS VALID
router.use(validateUserRole(["admin", "biller"]))

// GET ALL SUPPLIER
router.get("/", findAllSuppliers)
// SUPPLIER REGISTER
router.post("/register", validateSchemaRequest(newSupplierSchema), registerSupplier)
// SUPPLIER UPDATE
router.put("/update", validateSchemaRequest(supplierMongoSchema), )
// GET SUPPLIER BY NAME
router.get("/supplierName/:supplierName", )
// GERT SUPPLIER BY ID
router.get('/supplier/:supplierId', )
// DELETE SUPPLIER BY ID 
router.delete("/delete/:supplierId", )


export default router
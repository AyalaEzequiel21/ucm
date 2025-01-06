import express from 'express'
import { validateUser, validateUserRole } from '../middleware/AuthMidd'
import { validateSchemaRequest } from '../middleware/RequestMidd'
import { newSupplierSchema, supplierMongoSchema } from '../schemas/SupplierSchema'
import { deleteSupplierById, findAllInactiveSuppliers, findAllSuppliers, findSupplierById, findSupplierDetailsById, findSuppliersByName, registerSupplier, updateSupplier } from '../controllers/SupplierController'

// SUPPLIER ROUTES
const router = express.Router()

// MIDDLEWARE FOR VALIDATE IF USER IS AUTHENTICATED
router.use(validateUser())

// MIDDLEWARE FOR VALIDATE IF USER ROLE IS VALID
router.use(validateUserRole(["admin", "biller"]))

// GET ALL SUPPLIER
router.get("/", findAllSuppliers)
// GET ALL INACTIVE SUPPLIER
router.get("/inactives", findAllInactiveSuppliers)
// SUPPLIER REGISTER
router.post("/register", validateSchemaRequest(newSupplierSchema), registerSupplier)
// SUPPLIER UPDATE
router.put("/update", validateSchemaRequest(supplierMongoSchema), updateSupplier)
// GET SUPPLIER BY NAME
router.get("/supplierName/:supplierName", findSuppliersByName)
// GERT SUPPLIER BY ID
router.get('/supplier/:supplierId', findSupplierById)
// GET SUPPLIER DETAILS BY ID 
router.get("/supplierDetails/:supplierId", findSupplierDetailsById)
// DELETE SUPPLIER BY ID 
router.delete("/delete/:supplierId", deleteSupplierById)


export default router
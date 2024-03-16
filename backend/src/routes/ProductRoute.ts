import express from 'express'
import { validateUser, validateUserRole } from '../middleware/AuthMidd'
import { filterGetAll } from '../middleware/GetAllMidd'
import { createProduct, deleteProduct, findAllInactivesProducts, findAllProducts, findProductById, findProductByName, updateProduct } from '../controllers/ProductController'
import { validateSchemaRequest } from '../middleware/RequestMidd'
import { newProductSchema, productMongoSchema } from '../schemas/ProductsSchema'

//  PRODUCT ROUTES
const router = express.Router()

// MIDDLEWARE FOR VALIDATE IF USER IS AUTHENTICATED
router.use(validateUser())

// GET ALL PRODUCT
router.get("/", filterGetAll, findAllProducts)

// MIDDLEWARE FOR CHECK IF USER ROLE IS VALID
router.use(validateUserRole(['admin', 'biller']))

// GET PRODUCTS BY NAME
router.get("/name/:productName", findProductByName)
// GET PRODUCTS BY ID
router.get("/product/:productId", findProductById)
//GET ALL INACTIVE PRODUCTS
router.get("/inactives", findAllInactivesProducts)
// PRODUCT REGISTER
router.post("/register", validateSchemaRequest(newProductSchema), createProduct)
// PRODUCT UPDATE
router.put("/update", validateSchemaRequest(productMongoSchema), updateProduct)
//  PRODUCT DELETE
router.delete("/delete/:productId", deleteProduct)

export default router
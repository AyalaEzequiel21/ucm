import express from 'express'
import { validateUser, validateUserRole } from '../middleware/AuthMidd'
import { filterGetAll } from '../middleware/GetAllMidd'
import { deleteClientById, findActivesClients, findClientById, findClientsByCategory, findClientsByName, findInactivesClients, registerClient, updateClient } from '../controllers/ClientController'
import { validateSchemaRequest } from '../middleware/RequestMidd'
import { clientMongoSchema, newClientSchema } from '../schemas/ClientSchema'

// CLIENT ROUTES
const router = express.Router()

// MIDDLEWARE FOR VALIDATE IF USER IS AUTHENTICATED
router.use(validateUser())

// router.post("/testRegister", registerClient)
// GET ALL CLIENTS
router.get("/", filterGetAll(), findActivesClients)

// MIDDLEWARE FOR VALIDATE IF USER ROLE IS VALID
router.use(validateUserRole(["admin", "biller"]))

// CLIENT REGISTER
router.post("/register", validateSchemaRequest(newClientSchema), registerClient)
// CLIENT UPDATE
router.put("/update", validateSchemaRequest(clientMongoSchema), updateClient)
// GET CLIENTS BY NAME
router.get("/clientName/:clientName", findClientsByName)
// GERT CLIENT BY ID
router.get('/client/:clientId', findClientById)
// GET CLIENTS BY CATEGORY
router.get("/category/:clientCategory", findClientsByCategory)
// GET ALL INACTIVE CLIENTS
router.get("/inactives", findInactivesClients)
// DELETE CLIENT BY ID 
router.delete("/delete/:clientId", deleteClientById)


export default router
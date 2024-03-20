import express from "express"
import { validateSchemaRequest } from "../middleware/RequestMidd"
import { loginDataSchema, newUserSchema, userMongoSchema } from "../schemas/AuthSchema"
import { deleteUserById, findAllUsers, findUserById, login, logout, registerUser, updateUser } from "../controllers/AuthController"
import { validateUser, validateUserRole } from "../middleware/AuthMidd"

// AUTH ROUTES
const router = express.Router()

// LOGIN
router.post("/login", validateSchemaRequest(loginDataSchema), login)

// USER LOGOUT 
router.post("/logout", logout)

// MIDD FOR VALIDATE THE USER AUTHENTICATION
router.use(validateUser())   

// MIDD FOR VALIDATE THE USER ROLE
router.use(validateUserRole(['admin']))

// USER REGISTER
router.post("/user/register", validateSchemaRequest(newUserSchema), registerUser)

// USER UPDATE
router.put("/user/update", validateSchemaRequest(userMongoSchema), updateUser)

// GET ALL USER 
router.get("/users", findAllUsers)

// GET USER BY ID
router.get("/user/:userId", findUserById)

// USER DELETE
router.delete("/user/delete/:userId", deleteUserById)

export default router
import { z } from "zod"
import { UserRole } from "../utilities/types/UserRole"
import { validateObjectId } from "../utilities/validateObjectId"

// USER SCHEMA 
const newUserSchema = z.object({
    username: z.string().min(5),
    password: z.string().min(8),
    role: UserRole
})

// USER TYPE
type UserType = z.infer<typeof newUserSchema>


// USER MONGO
const userMongoSchema = newUserSchema.extend({
    _id: validateObjectId(),
    password: newUserSchema.shape.password.optional(),
})

type UserMongoType = z.infer<typeof userMongoSchema>

// USER COOKIE
const userCookieSchema = z.object({
    _id: validateObjectId(),
    username: z.string().min(5),
    role: UserRole
})

type UserCookieType = z.infer<typeof userCookieSchema>

// LOGIN DATA
const loginDataSchema = z.object({
    username: z.string().min(5),
    password: z.string().min(8)
})
type UserLoginType = z.infer<typeof loginDataSchema>

export { newUserSchema, UserType, userMongoSchema, UserMongoType, userCookieSchema, UserCookieType, loginDataSchema, UserLoginType }
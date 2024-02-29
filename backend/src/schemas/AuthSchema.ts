import { z } from "zod"
import { UserRole } from "./UserRole"

// USER SCHEMA 
export const newUserSchema = z.object({
    username: z.string().min(5),
    password: z.string().min(8),
    role: UserRole
})

// USER TYPE
export type UserType = z.infer<typeof newUserSchema>
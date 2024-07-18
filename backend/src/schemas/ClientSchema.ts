import { z } from "zod";
import { ClientCategory } from "../utilities/types/ClientCategory";
import { validateObjectId } from "../utilities/validateObjectId";


// CLIENT
const newClientSchema = z.object({
    fullname: z.string().min(4).max(15),
    phone: z.string().min(8).max(15),
    category: ClientCategory,
    in_delivery: z.boolean()
})

type ClientType = z.infer<typeof newClientSchema>

// CLIENT MONGO
const clientMongoSchema = newClientSchema.extend({
    _id: validateObjectId().optional(),
    balance: z.number(),
    sales: z.array(validateObjectId()).optional(),
    payments: z.array(validateObjectId()).optional(),
    is_active: z.boolean().optional()
})

type ClientMongoType = z.infer<typeof clientMongoSchema>

export {newClientSchema, ClientType, clientMongoSchema, ClientMongoType}
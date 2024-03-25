import { z } from "zod";
import { ClientCategory } from "../utilities/types/ClientCategory";
import { validateObjectId } from "../utilities/validateObjectId";
import { saleMongoSchema } from "./SaleSchema";
import { clientPaymentMongoSchema } from "./ClientPaymentSchema";

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
    balance: z.number().optional(),
    sales: z.array(saleMongoSchema).optional(),
    client_payments: z.array(clientPaymentMongoSchema).optional(),
    is_active: z.boolean().optional()
})

type ClientMongoType = z.infer<typeof clientMongoSchema>

export {newClientSchema, ClientType, clientMongoSchema, ClientMongoType}
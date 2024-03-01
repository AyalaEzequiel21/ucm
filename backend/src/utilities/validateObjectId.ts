import { z } from "zod"

export const validateObjectId = () => {
    return z.string().regex(/^[0-9a-fA-F]{24}$/)
}
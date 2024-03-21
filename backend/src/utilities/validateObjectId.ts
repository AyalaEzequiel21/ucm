import { ObjectId, isValidObjectId } from "mongoose"
import { z } from "zod"
import { BadRequestError } from "../errors/CustomErros"

const validateObjectId = () => {
    return z.string().regex(/^[0-9a-fA-F]{24}$/)
}

const checkId = (id: string|ObjectId) => {
    if(!isValidObjectId(id)) {
        throw new BadRequestError('Object Id invalido')
    }}

export { validateObjectId, checkId }
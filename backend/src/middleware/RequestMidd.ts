import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { BadRequestError, InternalServerError } from "../errors/CustomErros";

const validateSchemaRequest = <T>(schema: z.ZodSchema<T>) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = schema.safeParse(req.body)

            if(result.success) {
                req.body = result.data
                next()
            } else {
                throw new BadRequestError("ZOD_ERROR: Verificar datos ingresados y sus requerimientos")
            }
        } catch (error){       
            throw error
        }
    }
}

export { validateSchemaRequest }
import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { BadRequestError } from "../errors/CustomErros";

const validateSchemaRequest = <T>(schema: z.ZodSchema<T>) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = schema.safeParse(req.body)                        
            if(result.success) {
                req.body = result.data
                next()
            } else {                
                console.log('Errores de validación:', result.error.errors)
                throw new BadRequestError("Error de valores ingresados: Verifica los datos ingresados y sus requerimientos")
            }
        } catch (error){  
            console.log('Error en el middleware:', error)               
            throw error
        }
    }
}

export { validateSchemaRequest }
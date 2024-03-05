import { NextFunction, Request, Response } from "express";

const internalError = new InternalServerError('Error inesperado')


// if the error is a instance of Custom error then return this way
const ErrorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
    if(error instanceof CustomError) {
        res.status(error.status).json({
            ok: false, 
            error: error.name,
            code: error.code,
            message: error.message
        })
    } else {  // if the error is other instance return an Internal Server Error
        res.status(internalError.status).json({
            ok: false, 
            error: internalError.name,
            message: internalError.message
        })
    }
}

export {ErrorHandler}
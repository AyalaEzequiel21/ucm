import mongoose, { MongooseError } from "mongoose"
import { BadRequestError, CustomError, InternalServerError } from "./CustomErros"

const ErrorsPitcher = (error: Error | unknown) => {
    console.error(error)

    if(error instanceof CustomError){
        throw error
    } else if( error instanceof mongoose.Error.ValidationError){
        const validationErrors = Object.values(error.errors)
        .map((err) => err.message)
        .join(', ')
        console.log(validationErrors);
        
        throw new BadRequestError(validationErrors)
    } else if(error instanceof MongooseError && error.name === 'MongoServerError') {
        throw new InternalServerError('Ha ocurrido un error durante el procedimiento. Transactions');
    }else if (error instanceof Error) {
        throw new InternalServerError(error.message);
    } else {
        throw new InternalServerError('Ocurrió un error desconocido');
    }
}

export { ErrorsPitcher }
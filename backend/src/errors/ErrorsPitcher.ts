import mongoose, { MongooseError } from "mongoose"
import { BadRequestError, CustomError, InternalServerError } from "./CustomErros"

// interface MongoDuplicateKeyError extends MongooseError {
//     code: number
//     keyValue: Record<string, string>
// }

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
    } 
    // else if (
    //     error instanceof MongooseError &&
    //     error.name === 'MongoServerError' &&
    //     (error as MongoDuplicateKeyError).code === 11000
    // ) {
    //     // Tipar el error como MongoDuplicateKeyError para acceder a keyValue
    //     const duplicateError = error as MongoDuplicateKeyError;
    //     const keyValue = duplicateError.keyValue;
    //     const duplicatedField = Object.keys(keyValue)[0];
    //     const duplicatedValue = keyValue[duplicatedField];

    //     throw new BadRequestError(
    //         `Ya existe un registro con el mismo ${duplicatedField}: "${duplicatedValue}".`
    //     );
    // } 
    else {        
        throw new InternalServerError('Ocurrió un error desconocido');
    }
}

export { ErrorsPitcher }
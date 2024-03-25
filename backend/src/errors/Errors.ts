//////////////////////////////
// ERRORS 
//////////////////////////////

interface IError {
    code: string;
    message: string;
    status: number;
}  

const ResourceNotFound = {
    code: 'RESOURCE_NOT_FOUND',
    message: 'Recurso no encontrado:',
    status: 404
}

const UserAlreadyExists = {
    code: 'USER_ALREADY_EXISTS',
    message: 'Usuario ya existente',
    status: 400
}

export { IError, ResourceNotFound }
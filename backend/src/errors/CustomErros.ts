
interface ICustomError {
    code: string,
    message: string, 
    status: number,
    name: string
}

// GENERIC ERROR CLASS IMPLEMENTS THE INTERFaCE
class CustomError extends Error implements ICustomError {
    code: string
    status: number

    constructor(code: string, message: string, status: number){
        super(message)
        this.name = this.constructor.name
        this.code = code
        this.status = status
    }
}

// RESOURCE NOT FOUND
class ResourceNotFoundError extends CustomError {
    constructor(resourceName: string) {
        const message = `${resourceName} no encontrada/o`
        super("RESOURCE_NOT_FOUND", message, 404)
    }
}

// NOT AUTHENTICATED
class AuthenticationError extends CustomError {
    constructor() {
        const message = `Verifica tus credenciales`
        super("NOT_AUTHENTICATED", message, 401)
    }
}

// BAD REQUEST
class BadRequestError extends CustomError {
    constructor(details: string) {
        const message = `Solicitud incorrecta: ${details}`
        super("BAD_REQUEST", message, 400)
    }
}

// RESOURCE ALREADY EXISTS
class ResourceAlreadyExistsError extends CustomError {
    constructor(resourceName: string) {
        const message = `${resourceName} ya se encuentra registrado`
        super("RESOURCE_ALREADY_EXISTS", message, 400)
    }
}

// NOT AUTHORIZED
class NotAuthorizedError extends CustomError {
    constructor() {
        const message = "No autorizado";
        super("NOT_AUTHORIZED", message, 403);
    }
}

// INTERNAL ERROR SERVICE
class InternalServerError extends CustomError {
    constructor(details: string) {
        const message = `Error del servidor: ${details}`
        super("INTERNAL_SERVER_ERROR", message, 500)
    }
}

export {ICustomError, CustomError, AuthenticationError, BadRequestError, NotAuthorizedError, ResourceAlreadyExistsError, ResourceNotFoundError, InternalServerError }
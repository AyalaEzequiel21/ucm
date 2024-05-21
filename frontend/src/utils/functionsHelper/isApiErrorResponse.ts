import { ApiErrorResponseType } from "../types/ApiErrorResponeType"

const isApiErrorResponse = (objeto: ApiErrorResponseType)=> {
    return (
        objeto &&
        typeof objeto.code === 'number' &&
        objeto.data &&
        typeof objeto.data.ok === 'boolean' &&
        typeof objeto.data.error === 'string' &&
        typeof objeto.data.code === 'string' &&
        typeof objeto.data.message === 'string'
      )
}

export {isApiErrorResponse}
import { ApiErrorResponseType } from "../types/ApiErrorResponeType"
// Verifica si un objeto dado es de tipo `ApiErrorResponseType`
//* La verificación se realiza comprobando:
 //* - Que el objeto no sea `null` o `undefined`.
 //* - Que la propiedad `code` sea un número.
 //* - Que el objeto tenga una propiedad `data` que contenga:
 //*   - Una propiedad `ok` de tipo booleano.
 //*   - Una propiedad `error` de tipo string.
 //*   - Una propiedad `code` de tipo string.
 //*   - Una propiedad `message` de tipo string. 
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
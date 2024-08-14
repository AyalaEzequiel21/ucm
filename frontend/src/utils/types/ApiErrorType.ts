// Estructura de un error de la API
export type ApiErrorType = {
    ok: boolean,
    error: string,
    code: string, 
    message: string
}
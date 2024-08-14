import { ApiErrorType } from "./ApiErrorType";

// Estructura para las respuestas de la API con error 
export type ApiErrorResponseType = {
    data: ApiErrorType,
    code: number
}
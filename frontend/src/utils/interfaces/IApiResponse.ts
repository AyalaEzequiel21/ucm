// Estructura para las respuestas de la API
export interface IApiResponse<T> {
    data: T[],
    ok: boolean
}
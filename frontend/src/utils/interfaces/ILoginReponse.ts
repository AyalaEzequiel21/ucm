// Estructura para las respuestas de la API en un login
export interface ILoginResponse {
    ok: boolean,
    message: string,
    token: string
}
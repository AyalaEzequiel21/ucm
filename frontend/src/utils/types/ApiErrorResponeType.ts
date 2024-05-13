import { ApiErrorType } from "./ApiErrorType";

export type ApiErrorResponseType = {
    data: ApiErrorType,
    code: number
}
import { IClientPayment } from "./IClientPayment";

export interface IPaymentsReport {
    _id: string,
    payments?: string[],
    payments_dto: Partial<IClientPayment>[],
    report_status: 'pendiente' | 'aprobado',
    createdAt: string
}
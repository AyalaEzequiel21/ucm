import { PaymentMethodType } from "../types/PaymentMethodType";

export interface IClientPayment {
    _id: string, 
    client_name: string,
    amount: number,
    payment_method: PaymentMethodType,
    sale_id: string|undefined,
    report_id: string|undefined,
    createdAt: string
}
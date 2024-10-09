import { PaymentMethodType } from "../types/PaymentMethodType";

export interface IClientPayment {
    _id?: string, 
    client_name: string,
    client_id?: string,
    amount: number,
    payment_method: PaymentMethodType,
    sale_id?: string
    report_id?: string
    createdAt?: string,
    client_balance?: number
}

export interface IClientPaymentForSale{
    client_name?: string,
    client_id?: string,
    amount?: number,
    payment_method: PaymentMethodType,
    sale_id?: string
}
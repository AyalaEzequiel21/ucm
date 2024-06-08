import { PaymentMethodType } from "@/utils/types/PaymentMethodType";

export interface INewClientPaymentValues {
    client_id: string, 
    client_name: string,
    amount: number,
    payment_method: PaymentMethodType,
    sale_id?: string,
    report_id?: string
}
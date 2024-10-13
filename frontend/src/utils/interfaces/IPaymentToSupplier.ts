import { PaymentMethodType } from "../types/PaymentMethodType"

export interface IPaymentToSupplier {
    _id: string,
    supplier_id: string,
    supplier_name: string,
    payment_method: PaymentMethodType,
    total_payment: number
    createdAt: string
}

export interface IPaymentToSupplierDetails extends IPaymentToSupplier {
    supplier_balance: number
}
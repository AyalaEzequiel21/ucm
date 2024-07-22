import { PaymentMethodType } from "@/utils/types/PaymentMethodType";


export interface INewPaymentToSupplierValues {
    supplier_id: string,
    supplier_name: string,
    payment_method: PaymentMethodType,
    total_payment: number
}
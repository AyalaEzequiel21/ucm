import { PaymentMethodType } from "../types/PaymentMethodType"
import { IClientPayment } from "./IClientPayment"

export interface ISaleDetails {
    product_id: string,
    product_name: string,
    price: number,
    quantity: number,
    partial_total?: number
}

export interface ISale {
    _id: string,
    client_id: string,
    client_name: string,
    details: ISaleDetails[],
    total_sale: number,
    createdAt: string,
    payment?: IClientPayment

}


export interface IPaymentOfSale {
    _id: string,
    amount: number,
    payment_method: PaymentMethodType
}

export interface ISaleDetails {
    _id: string,
    client_id: string,
    client_name: string,
    details: ISaleDetails[],
    total_sale: number,
    createdAt: string,
    payment: IPaymentOfSale,
    totalQuantity: number
}

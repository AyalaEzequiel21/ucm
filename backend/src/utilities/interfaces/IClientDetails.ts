import { ClientCategoryType } from "../types/ClientCategory";
import { IdType } from "../types/IdType";
import { PaymentMethodType } from "../types/PaymentMethod";


export interface ISalesOfClientDetails {
    _id: IdType
    total_sale: number
    createdAt: Date|string
}

export interface IPaymentsOfClientDetails {
    _id: IdType
    amount: number
    payment_method: PaymentMethodType
    createdAt: Date|string
}

export interface IClientDetails {
    _id: IdType
    fullname: string
    phone: string 
    category: ClientCategoryType
    in_delivery: boolean
    balance: number
    createdAt: Date|string
    sales: ISalesOfClientDetails[]
    lastSale: Date|null
    totalAmountOfSales: number
    payments: IPaymentsOfClientDetails[]
    lastPayment: Date|null
    totalAmountOfPayments: number
}
import { ClientCategoryType } from "../types/ClientCategory";
import { IdType } from "../types/IdType";
import { PaymentMethodType } from "../types/PaymentMethod";

export interface IClientDetails {
    _id: IdType
    fullname: string
    phone: string 
    category: ClientCategoryType
    in_delivery: boolean
    balance: number
    created_at: Date|string
    sales: {
        _id: IdType
        total_sale: number
        created_at: Date|string
    }[]
    lastSale: Date|null
    totalAmountOfSales: number
    payments: {
        _id: IdType
        amount: number
        payment_method: PaymentMethodType
        created_at: Date|string
    }[]
    lastPayment: Date|null
    totalAmountOfPayments: number
}
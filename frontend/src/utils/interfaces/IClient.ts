import { CategoryType } from "../types/CategoryType"
import { PaymentMethodType } from "../types/PaymentMethodType"

export interface IClient {
    _id: string,
    fullname: string,
    phone: string,
    category: CategoryType,
    in_delivery: boolean,
    balance: number,
    sales: string[],
    payments: string[]
    is_active: boolean,
    createdAt: string
}

export interface IClientMongo {
    _id: string,
    fullname: string,
    phone: string,
    balance: number,
    category: CategoryType,
    in_delivery: boolean,
    is_active?: boolean
}


export interface ISalesOfClientDetails {
    _id: string
    total_sale: number
    createdAt: string
}

export interface IPaymentsOfClientDetails {
    _id: string
    amount: number
    payment_method: PaymentMethodType
    createdAt: string
}

export interface IClientDetails {
    _id: string
    fullname: string
    phone: string 
    category: CategoryType
    in_delivery: boolean
    balance: number
    is_active: boolean
    createdAt: string
    sales: ISalesOfClientDetails[]
    lastSale: string|null
    totalAmountOfSales: number
    payments: IPaymentsOfClientDetails[]
    lastPayment: string|null
    totalAmountOfPayments: number
}
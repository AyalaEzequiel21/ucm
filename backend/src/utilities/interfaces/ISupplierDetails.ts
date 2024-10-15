import { IdType } from "../types/IdType"

export interface IPurchasesOfSupplierDetails {
    _id: IdType,
    total_purchase: number,
    createdAt: Date|string
}

export interface IPaymentsOfSupplierDetails {
    _id: IdType,
    total_payment: number,
    payment_method: string,
    createdAt: Date|string
}

export interface ISupplierDetails {
    _id: IdType
    supplier_name: string
    phone: string
    primeProduct: string
    createdAt: Date,
    balance: number,
    purchases: IPurchasesOfSupplierDetails[],
    lastPurchase: Date|null,
    totalAmountOfPurchases: number,
    payments: IPaymentsOfSupplierDetails[],
    lastPayment: Date|null,
    totalAmountOfPayments: number
}
export interface ISupplier {
    _id: string,
    supplier_name: string, 
    phone: string,
    primeProduct: string,
    balance: number,
    purchases?: string[],
    payments?: string[],
    createdAt?: string
}

export interface IPurchasesOfSupplierDetails {
    _id: string,
    total_purchase: number,
    createdAt: Date|string
}

export interface IPaymentsOfSupplierDetails {
    _id: string,
    total_payment: number,
    payment_method: string,
    createdAt: Date|string
}

export interface ISupplierDetails {
    _id: string
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
    totalAmountOfPayments: number,
}
export interface ISupplier {
    _id: string,
    supplier_name: string, 
    phone: string,
    primeProduct: string,
    balance: number,
    purchases: string[],
    payments: string[],
    createdAt: string
}
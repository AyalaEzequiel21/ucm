export interface ISaleDetails {
    product_id: string,
    product_name: string,
    price: number,
    quantity: number,
}

export interface ISale {
    _id: string,
    client_id: string,
    client_name: string,
    details: ISaleDetails[],
    total_sale: number,
    createdAt: string
}

export interface IDetailsOfSale {
    product_id: string,
    product_name: string,
    price: number,
    quantity: number,
}

export interface IPaymentOfSale {
    _id: string,
    amount: number,
    payment_method: string
}

export interface ISaleDetails {
    _id: string,
    client_id: string,
    client_name: string,
    details: IDetailsOfSale[],
    total_sale: number,
    createdAt: string,
    payment: IPaymentOfSale,
    totalQuantity: number
}

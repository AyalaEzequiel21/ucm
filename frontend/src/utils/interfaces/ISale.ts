export interface ISaleDetails {
    product_id: string,
    product_name: string,
    price: number,
    quantity: number,
}

export interface ISale {
    client_id: string,
    client_name: string,
    details: ISaleDetails[],
    total_sale: number,
    createdAt: string
}

export interface IPurchaseDetails {
    product_name: string,
    quantity: number,
    unity_price: number,
}

export interface IPurchase {
    _id: string,
    supplier_id: string,
    supplier_name: string,
    purchaseDetail: IPurchaseDetails[],
    total_purchase: number,
    createdAt: string
}

export interface IPurchaseForDetails extends IPurchase {
    supplierBalance: number,
    paymentsQuantity: number
}
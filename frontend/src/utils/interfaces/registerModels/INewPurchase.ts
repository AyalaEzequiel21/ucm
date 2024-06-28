import { IPurchaseDetails } from "../IPurchase";

export interface IOnlyPurchase {
    supplier_id: string,
    supplier_name: string,
}

export interface INewPurchaseValues {
    supplier_id: string,
    supplier_name: string,
    purchaseDetails: IPurchaseDetails[],
    total_purchase?: number
}
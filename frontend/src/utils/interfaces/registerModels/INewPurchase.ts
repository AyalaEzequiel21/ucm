import { IPurchaseDetails } from "../IPurchase";

export interface IOnlyPurchase {
    supplier_id: string,
    supplier_name: string,
}

export interface INewPurchaseValues {
    supplier_id: string,
    supplier_name: string,
    purchaseDetail: IPurchaseDetails[],
    total_purchase?: number
}
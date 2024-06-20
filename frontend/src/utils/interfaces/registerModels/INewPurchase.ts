import { IPurchaseDetails } from "../IPurchase";


export interface INewPurchaseValues {
    supplier_id: string,
    supplier_name: string,
    purchaseDetails: IPurchaseDetails[],
    total_purchase?: number
}
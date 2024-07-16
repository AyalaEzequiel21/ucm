import { ISaleDetails } from "../ISale"

export interface IOnlySale {
    client_id: string,
    client_name: string
}

export interface INewSaleValues {
    client_id: string,
    client_name: string,
    saleDetails: ISaleDetails[],
    total_sale?: number
}
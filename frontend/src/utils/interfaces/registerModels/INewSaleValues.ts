import { IClientPayment, IClientPaymentForSale } from "../IClientPayment"
import { ISaleDetails } from "../ISale"

export interface IOnlySale {
    client_id: string,
    client_name: string,
    payment?: IClientPaymentForSale|null
}

export interface INewSaleValues {
    client_id: string,
    client_name: string,
    details: ISaleDetails[],
    total_sale?: number,
    payment: IClientPayment|null
}

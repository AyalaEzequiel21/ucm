import { CategoryType } from "../types/CategoryType"
import { PaymentMethodType } from "../types/PaymentMethodType"
import { IClientPayment } from "./IClientPayment"

export interface ISaleDetails {
    product_id: string,
    product_name: string,
    price: number,
    quantity: number,
    partial_total?: number
}

export interface ISale {
    _id: string,
    client_id: string,
    client_name: string,
    details: ISaleDetails[],
    total_sale: number,
    createdAt: string,
    payment: IClientPayment|null

}


export interface IPaymentOfSale {
    _id: string,
    amount: number,
    payment_method: PaymentMethodType
}

export interface IDetailsSale {
    _id: string,
    client_id: string,
    client_name: string,
    details: ISaleDetails[],
    total_sale: number,
    createdAt: string,
    payment?: IPaymentOfSale,
    totalQuantity: number,
    client_category: CategoryType
}

export type SaleMongoType = Omit<IDetailsSale, 'createdAt'> & {
    createdAt?: string; 
}


// AGREGUE UN SALE_ID A LOS PAYMENT, MODIFICAR METODO DE API PARA QUE BUSQUE X ESTE
// ASI EVITAMOS QUE ENCUENTRE MAS DE UN RESULTADO. 
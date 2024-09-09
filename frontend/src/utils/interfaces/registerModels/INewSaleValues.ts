import { IClientPayment } from "../IClientPayment"
import { ISaleDetails } from "../ISale"

export interface IOnlySale {
    client_id: string,
    client_name: string,
    payment?: IClientPayment
}

export interface INewSaleValues {
    client_id: string,
    client_name: string,
    details: ISaleDetails[],
    total_sale?: number,
    payment?: IClientPayment
}



//  VERIFICAR BIEN EL TEMA DE LAS INTERFACES, PORQUE NO COINCIDEN Y TAMBIEN CONTROLAR EL FORMULARIO , 
// PARA QUE FUNCIONE SIN COMPLETAR EL PAGO. Y TAMBEIN LO VISUAL
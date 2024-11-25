import { IRadioOptions } from "../interfaces/IRadioOption";
import { ISelectOptions } from "../interfaces/ISelectOptions";

// LISTA CON LOS TIPOS DE METODO DE PAGO
export const paymentMethodOptions: ISelectOptions[] = [
    { label: 'Efectivo', value: 'efectivo'},
    { label: 'Transf. Bancaria', value: 'banco'},
    { label: 'Mercadopago', value: 'mercadopago'},
    { label: 'Cheque', value: 'cheque'},
]

export const categoriesOptions: ISelectOptions[] = [
    {
        label: 'Cargador',
        value: 'cat_1'
    },
    {
        label: 'Carnicero',
        value: 'cat_2'
    }
]

export const inDeliveryOptions: IRadioOptions[] = [
    {
        label: 'No',
        value: false
    },
    {
        label: 'Si',
        value: true
    }
    
]
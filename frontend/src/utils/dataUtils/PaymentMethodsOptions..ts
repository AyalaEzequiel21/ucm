import { ISelectOptions } from "../interfaces/ISelectOptions";

// LISTA CON LOS TIPOS DE METODO DE PAGO
export const paymentMethodOptions: ISelectOptions[] = [
    { label: 'Efectivo', value: 'efectivo'},
    { label: 'Transf. Bancaria', value: 'banco'},
    { label: 'Mercadopago', value: 'mercadopago'},
    { label: 'Cheque', value: 'cheque'},
]
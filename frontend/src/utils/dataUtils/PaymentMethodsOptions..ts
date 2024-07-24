import { ISelectOptions } from "../interfaces/ISelectOptions";

export const paymentMethodOptions: ISelectOptions[] = [
    { label: 'Efectivo', value: 'efectivo'},
    { label: 'Transf. Bancaria', value: 'banco'},
    { label: 'Mercadopago', value: 'mercadopago'},
    { label: 'Cheque', value: 'cheque'},
]
import { IPaymentToSupplier } from "@/utils/interfaces/IPaymentToSupplier"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

// ESTRUCTURA DEL ESTADO PARA ALMACENAR LOS PAGOS A PROVEEDORES
export interface IAllPaymentsToSupplier {
    paymentsToSupplier: IPaymentToSupplier[],
    paymentsToSupplierLoading: boolean
}
// ESTRUCTURA COMPLETA DEL ESTADO PARA EL SLICE
interface IPaymentToSupplierState {
    allPaymentsToSupplier: IAllPaymentsToSupplier
}
// ESTADO INICIAL DEL SLICE DE PAGOS A PROVEEDORES
const initialState: IPaymentToSupplierState = {
    allPaymentsToSupplier: {
        paymentsToSupplier: [],
        paymentsToSupplierLoading: false
    }
}
// SLICE DE REDUX PARA EL MANEJO DEL ESTADO DE PAGOS A PROVEEDORES
export const PaymentToSupplierSlice = createSlice({
    name: 'paymentsToSupplier',
    initialState,
    reducers: {
        // FUNCION QUE ACTUALIZA EL ESTADO DE PAGOS A PROVEEDORES
        setPaymentsToSupplier: (state, action: PayloadAction<IAllPaymentsToSupplier>) => {
            state.allPaymentsToSupplier = action.payload
        }
    }
})

export const {setPaymentsToSupplier} = PaymentToSupplierSlice.actions
export default PaymentToSupplierSlice.reducer
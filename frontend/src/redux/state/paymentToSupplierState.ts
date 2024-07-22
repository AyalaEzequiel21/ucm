import { IPaymentToSupplier } from "@/utils/interfaces/IPaymentToSupplier"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface IAllPaymentsToSupplier {
    paymentsToSupplier: IPaymentToSupplier[],
    paymentsToSupplierLoading: boolean
}

interface IPaymentToSupplierState {
    allPaymentsToSupplier: IAllPaymentsToSupplier
}

const initialState: IPaymentToSupplierState = {
    allPaymentsToSupplier: {
        paymentsToSupplier: [],
        paymentsToSupplierLoading: false
    }
}

export const PaymentToSupplierSlice = createSlice({
    name: 'paymentsToSupplier',
    initialState,
    reducers: {
        setPaymentsToSupplier: (state, action: PayloadAction<IAllPaymentsToSupplier>) => {
            state.allPaymentsToSupplier = action.payload
        }
    }
})

export const {setPaymentsToSupplier} = PaymentToSupplierSlice.actions
export default PaymentToSupplierSlice.reducer
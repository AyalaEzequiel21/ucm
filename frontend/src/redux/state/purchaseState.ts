import { IPurchase } from "@/utils/interfaces/IPurchase";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

// ESTRUCTURA DEL ESTADO PARA ALMACENAR LAS COMPRAS A PROVEEDORES
export interface IAllPurchases {
    purchases: IPurchase[],
    purchaseLoading: boolean
}
// ESTRUCTURA COMPLETA DEL ESTADO PARA EL SLICE
interface IPurchaseState {
    allPurchases: IAllPurchases
}
// ESTADO INICIAL DEL SLICE DE COMPRAS A PROVEEDORES
const initialState: IPurchaseState = {
    allPurchases: {
        purchases: [],
        purchaseLoading: false
    }
}
// SLICE DE REDUX PARA EL MANEJO DEL ESTADO DE COMPRAS A PROVEEDORES
export const PurchaseSlice = createSlice({
    name: 'purchase',
    initialState,
    reducers: {
        // FUNCION QUE ACTUALIZA EL ESTADO DE COMPRAS A PROVEEDORES
        setPurchases: (state, action: PayloadAction<IAllPurchases>) => {
            state.allPurchases = action.payload
        }
    }
})

export const {setPurchases} = PurchaseSlice.actions
export default PurchaseSlice.reducer
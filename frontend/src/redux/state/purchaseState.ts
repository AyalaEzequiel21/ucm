import { IPurchase } from "@/utils/interfaces/IPurchase";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface IAllPurchases {
    purchases: IPurchase[],
    purchaseLoading: boolean
}

interface IPurchaseState {
    allPurchases: IAllPurchases
}

const initialState: IPurchaseState = {
    allPurchases: {
        purchases: [],
        purchaseLoading: false
    }
}

export const PurchaseSlice = createSlice({
    name: 'purchase',
    initialState,
    reducers: {
        setPurchases: (state, action: PayloadAction<IAllPurchases>) => {
            state.allPurchases = action.payload
        }
    }
})

export const {setPurchases} = PurchaseSlice.actions
export default PurchaseSlice.reducer
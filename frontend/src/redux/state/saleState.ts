import { ISale } from "@/utils/interfaces/ISale";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IAllSales {
    sales: ISale[],
    saleLoading: boolean
}

interface ISaleState {
    allSales: IAllSales
}

const initialState: ISaleState = {
    allSales: {
        sales: [],
        saleLoading: false
    }
}

export const SaleSlice = createSlice({
    name: 'sale',
    initialState,
    reducers: {
        setSales: (state, action: PayloadAction<IAllSales>) => {
            state.allSales = action.payload
        }
    }
})

export const {setSales} = SaleSlice.actions
export default SaleSlice.reducer
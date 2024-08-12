import { ISale } from "@/utils/interfaces/ISale";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// ESTRUCTURA DEL ESTADO PARA ALMACENAR LAS VENTAS
export interface IAllSales {
    sales: ISale[],
    saleLoading: boolean
}
// ESTRUCTURA COMPLETA DEL ESTADO PARA EL SLICE
interface ISaleState {
    allSales: IAllSales
}
// ESTADO INICIAL DEL SLICE DE VENTAS
const initialState: ISaleState = {
    allSales: {
        sales: [],
        saleLoading: false
    }
}
// SLICE DE REDUX PARA EL MANEJO DEL ESTADO DE VENTAS
export const SaleSlice = createSlice({
    name: 'sale',
    initialState,
    reducers: {
        // FUNCION QUE ACTUALIZA EL ESTADO DE VENTAS
        setSales: (state, action: PayloadAction<IAllSales>) => {
            state.allSales = action.payload
        }
    }
})

export const {setSales} = SaleSlice.actions
export default SaleSlice.reducer
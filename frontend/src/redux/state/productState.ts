import { IProduct } from "@/utils/interfaces/IProduct";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

// ESTRUCTURA DEL ESTADO PARA ALMACENAR LOS PRODUCTOS
export interface IAllProducts {
    products: IProduct[],
    productsLoading: boolean
}
// ESTRUCTURA COMPLETA DEL ESTADO PARA EL SLICE
interface IProductState {
    allProducts: IAllProducts
}
// ESTADO INICIAL DEL SLICE DE PRODUCTOS
const initialState: IProductState = {
    allProducts: {
        products: [],
        productsLoading: false
    }
}
// SLICE DE REDUX PARA EL MANEJO DEL ESTADO DE PRODUCTOS
export const ProductSlice = createSlice({
    name: 'product', 
    initialState,
    reducers: {
        // FUNCION QUE ACTUALIZA EL ESTADO DE PRODUCTOS
        setProducts: (state, action: PayloadAction<IAllProducts>) => {
            state.allProducts = action.payload
        }
    }
})

export const {setProducts} = ProductSlice.actions
export default ProductSlice.reducer
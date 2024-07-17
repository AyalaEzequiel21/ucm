import { IProduct } from "@/utils/interfaces/IProduct";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface IAllProducts {
    products: IProduct[],
    productsLoading: boolean
}

interface IProductState {
    allProducts: IAllProducts
}

const initialState: IProductState = {
    allProducts: {
        products: [],
        productsLoading: false
    }
}

export const ProductSlice = createSlice({
    name: 'product', 
    initialState,
    reducers: {
        setProducts: (state, action: PayloadAction<IAllProducts>) => {
            state.allProducts = action.payload
        }
    }
})

export const {setProducts} = ProductSlice.actions
export default ProductSlice.reducer
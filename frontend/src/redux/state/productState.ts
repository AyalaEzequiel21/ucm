import { IProduct } from "@/utils/interfaces/IProduct";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface IAllProducts {
    products: IProduct[],
    productsLoading: boolean
}

interface IProductState {
    allProdcuts: IAllProducts
}

const initialState: IProductState = {
    allProdcuts: {
        products: [],
        productsLoading: false
    }
}

export const ProductSlice = createSlice({
    name: 'product', 
    initialState,
    reducers: {
        setProducts: (state, action: PayloadAction<IAllProducts>) => {
            state.allProdcuts = action.payload
        }
    }
})

export const {setProducts} = ProductSlice.actions
export default ProductSlice.reducer
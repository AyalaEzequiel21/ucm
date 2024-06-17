import { ISupplier } from "@/utils/interfaces/ISupplier"
import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export interface IAllSuppliers {
    suppliers: ISupplier[],
    suppliersLoading: boolean
}

interface ISupplierState {
    allSuppliers: IAllSuppliers
}

const initialState: ISupplierState = {
    allSuppliers: {
        suppliers: [],
        suppliersLoading: false
    }
}

export const SupplierSlice = createSlice({
    name: 'client',
    initialState,
    reducers: {
        setSuppliers: (state, action: PayloadAction<IAllSuppliers>) => {
            state.allSuppliers = action.payload
        }
    }
})

export const {setSuppliers} = SupplierSlice.actions
export default SupplierSlice.reducer
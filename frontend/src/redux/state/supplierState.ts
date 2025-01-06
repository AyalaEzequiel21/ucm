import { ISupplier } from "@/utils/interfaces/ISupplier"
import { PayloadAction, createSlice } from "@reduxjs/toolkit"

// ESTRUCTURA DEL ESTADO PARA ALMACENAR LOS PROVEEDORES
export interface IAllSuppliers {
    suppliers: ISupplier[],
    inactiveSuppliers: ISupplier[],
    suppliersLoading: boolean
}
// ESTRUCTURA COMPLETA DEL ESTADO PARA EL SLICE
interface ISupplierState {
    allSuppliers: IAllSuppliers
}
// ESTADO INICIAL DEL SLICE DE PROVEEDORES
const initialState: ISupplierState = {
    allSuppliers: {
        suppliers: [],
        inactiveSuppliers: [],
        suppliersLoading: false
    }
}
// SLICE DE REDUX PARA EL MANEJO DEL ESTADO DE PROVEEDORES
export const SupplierSlice = createSlice({
    name: 'client',
    initialState,
    reducers: {
        // FUNCION QUE ACTUALIZA EL ESTADO DE PROVEEDORES
        setSuppliers: (state, action: PayloadAction<IAllSuppliers>) => {
            state.allSuppliers = action.payload
        }
    }
})

export const {setSuppliers} = SupplierSlice.actions
export default SupplierSlice.reducer
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

// VISTAS
export type ViewStateType = 'clients' | 'clientsPayments' | 'products' | 'sales' | 'users' | 'suppliers' | 'purchases' | 'paymentsReport' | 'paymentsToSuppliers' | 'home'

// ESTRUCTURA DEL ESTADO PARA ALMACENAR LA VISTA ACTUAL
interface IViewState {
    currentView: ViewStateType
}
// ESTADO INICIAL DEL SLICE DE VISTAS
const initialState: IViewState = {
    currentView: window.location.pathname.slice(1) as ViewStateType
}
// SLICE DE REDUX PARA EL MANEJO DEL ESTADO DE VISTAS
export const ViewSlice = createSlice({
    name: 'viewState',
    initialState,
    reducers: {
        // FUNCION QUE ACTUALIZA EL ESTADO DE VISTA
        setViewState: (state, action: PayloadAction<ViewStateType>) => {
            state.currentView = action.payload
        }
    }
})

export const { setViewState } = ViewSlice.actions;

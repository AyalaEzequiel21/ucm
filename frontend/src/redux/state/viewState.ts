import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export type ViewStateType = 'clients' | 'clientsPayments' | 'products' | 'sales' | 'users' | 'suppliers' | 'purchases' | 'paymentsReport' | 'paymentsToSuppliers' | 'home'

interface IViewState {
    currentView: ViewStateType
}

const initialState: IViewState = {
    currentView: window.location.pathname.slice(1) as ViewStateType
}

export const ViewSlice = createSlice({
    name: 'viewState',
    initialState,
    reducers: {
        setViewState: (state, action: PayloadAction<ViewStateType>) => {
            state.currentView = action.payload
        }
    }
})

export const { setViewState } = ViewSlice.actions;

import { IClientPayment } from "@/utils/interfaces/IClientPayment";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface IAllClientsPayments {
    clientsPayments : IClientPayment[],
    clientsPaymentsLoading: boolean
}

interface IClientPaymentState {
    allClientsPayments: IAllClientsPayments
}

const initialState: IClientPaymentState = {
    allClientsPayments: {
        clientsPayments: [],
        clientsPaymentsLoading: false
    }
}

export const ClientsPaymentsSlice = createSlice({
    name: 'clientsPayments',
    initialState,
    reducers: {
        setClientsPayments: (state, action: PayloadAction<IAllClientsPayments>) => {
            state.allClientsPayments = action.payload
        }
    }
})

export const {setClientsPayments} = ClientsPaymentsSlice.actions
export default ClientsPaymentsSlice.reducer
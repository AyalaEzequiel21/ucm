import { IClientPayment } from "@/utils/interfaces/IClientPayment";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

// ESTRUCTURA DEL ESTADO PARA ALMACENAR LOS PAGOS DE CLIENTES
export interface IAllClientsPayments {
    clientsPayments : IClientPayment[],
    clientsPaymentsLoading: boolean
}
// ESTRUCTURA COMPLETA DEL ESTADO PARA EL SLICE
interface IClientPaymentState {
    allClientsPayments: IAllClientsPayments
}
// ESTADO INICIAL DEL SLICE DE PAGOS DE CLIENTES
const initialState: IClientPaymentState = {
    allClientsPayments: {
        clientsPayments: [],
        clientsPaymentsLoading: false
    }
}
// SLICE DE REDUX PARA EL MANEJO DEL ESTADO DE PAGOS DE CLIENTES
export const ClientsPaymentsSlice = createSlice({
    name: 'clientsPayments', // NOMBRE DEL SLICE
    initialState,
    reducers: {
        // FUNCION QUE ACTUALIZA EL ESTADO DE PAGOS DE CLIENTES
        setClientsPayments: (state, action: PayloadAction<IAllClientsPayments>) => {
            state.allClientsPayments = action.payload
        }
    }
})

export const {setClientsPayments} = ClientsPaymentsSlice.actions
export default ClientsPaymentsSlice.reducer
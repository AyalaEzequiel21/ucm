import { IClient } from "@/utils/interfaces/IClient";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

// ESTRUCTURA DEL ESTADO PARA ALMACENAR LOS CLIENTES
export interface IAllClients {
    clients: IClient[],
    clientsLoading: boolean
}
// ESTRUCTURA COMPLETA DEL ESTADO PARA EL SLICE
interface IClientState {
    allClients: IAllClients
}
// ESTADO INICIAL DEL SLICE DE CLIENTES
const initialState: IClientState = {
    allClients: {
        clients: [],
        clientsLoading: false
    }
}
// SLICE DE REDUX PARA EL MANEJO DEL ESTADO DE CLIENTES
export const ClientSlice = createSlice({
    name: 'client',
    initialState,
    reducers: {
        // FUNCION QUE ACTUALIZA EL ESTADO DE CLIENTES
        setClients: (state, action: PayloadAction<IAllClients>) => {
            state.allClients = action.payload
        }
    }
})

export const {setClients} = ClientSlice.actions
export default ClientSlice.reducer
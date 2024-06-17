import { IClient } from "@/utils/interfaces/IClient";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface IAllClients {
    clients: IClient[],
    clientsLoading: boolean
}

interface IClientState {
    allClients: IAllClients
}

const initialState: IClientState = {
    allClients: {
        clients: [],
        clientsLoading: false
    }
}

export const ClientSlice = createSlice({
    name: 'client',
    initialState,
    reducers: {
        setClients: (state, action: PayloadAction<IAllClients>) => {
            state.allClients = action.payload
        }
    }
})

export const {setClients} = ClientSlice.actions
export default ClientSlice.reducer
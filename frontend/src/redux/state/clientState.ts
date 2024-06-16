import { IClient } from "@/utils/interfaces/IClient";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface IClientState {
    clients: IClient[]
}

const initialState: IClientState = {
    clients: []
}

export const ClientSlice = createSlice({
    name: 'client',
    initialState,
    reducers: {
        setClients: (state, action: PayloadAction<IClient[]>) => {
            state.clients = action.payload
        }
    }
})

export const {setClients} = ClientSlice.actions
export default ClientSlice.reducer
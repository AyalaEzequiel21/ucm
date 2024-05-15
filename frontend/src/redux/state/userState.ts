import { IUser } from "@/utils/interfaces/IUser"
import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export interface IUserState {
    user: IUser|null
}

const initialState: IUserState = {
    user: null
}

export const UserSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login: (state, action: PayloadAction<IUserState>) => {
            return {...state, ...action.payload.user}  // REEMPLAZA TODO EL CONTENIDO DEL GLOBAL STATE
        }, 
        logout: ()=> {
            return {user: null}
        }

    }
})

export const { login, logout } = UserSlice.actions
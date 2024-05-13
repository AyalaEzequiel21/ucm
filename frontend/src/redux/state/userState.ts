import { IUser } from "@/utils/interfaces/IUser"
import { createSlice } from "@reduxjs/toolkit"

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
        login: (state, action) => {
            return {...state, ...action.payload}  // REEMPLAZA TODO EL CONTENIDO DEL GLOBAL STATE
        }, 
        logout: ()=> {
            return {user: null}
        }

    }
})

export const { login, logout } = UserSlice.actions
import { IUser } from "@/utils/interfaces/IUser"
import { createSlice } from "@reduxjs/toolkit"

export interface IUserState {
    user: IUser|null
}

const initialState: IUserState = {
    // user: null
    user: {
        _id: '65fb59d664eccd2e931be3a9',
        username: 'checho',
        role: 'admin'
    }
}

export const UserSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login: (state, action) => {
            return {...state, ...action.payload}  // REEMPLAZA TODO EL CONTENIDO DEL GLOBAL STATE
        }
    }
})

export const { login } = UserSlice.actions
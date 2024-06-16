import { IUser } from "@/utils/interfaces/IUser"
import { UserType } from "@/utils/types/UserType"
import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export interface IUserState {
    user: IUser|null,
    users: UserType[]
}

const initialState: IUserState = {
    user: null,
    users: []
}

export const UserSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login: (state, action: PayloadAction<IUser>) => {
            state.user = action.payload  // REEMPLAZA TODO EL CONTENIDO DEL GLOBAL STATE
        }, 
        logout: (state)=> {
            state.user = null
        },
        setUsers: (state, action: PayloadAction<UserType[]>) => {
            state.users = action.payload
        }
    }
})

export const { login, logout, setUsers } = UserSlice.actions
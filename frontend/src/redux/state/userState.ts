import { IUser } from "@/utils/interfaces/IUser"
import { UserType } from "@/utils/types/UserType"
import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export interface IAllUsers {
    users: UserType[],
    usersLoading: boolean
}

export interface IUserState {
    userLogin: IUser|null,
    allUsers: IAllUsers
}

const initialState: IUserState = {
    userLogin: null,
    allUsers: {
        users: [],
        usersLoading: false
    }
}

export const UserSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login: (state, action: PayloadAction<IUser>) => {
            state.userLogin = action.payload  // REEMPLAZA TODO EL CONTENIDO DEL GLOBAL STATE
        }, 
        logout: (state)=> {
            state.userLogin = null
        },
        setAllUsers: (state, action: PayloadAction<IAllUsers>) => {
            state.allUsers = action.payload
        }
    }
})

export const { login, logout, setAllUsers } = UserSlice.actions
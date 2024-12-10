import { IUser } from "@/utils/interfaces/IUser"
import { PayloadAction, createSlice } from "@reduxjs/toolkit"

// ESTRUCTURA DEL ESTADO PARA ALMACENAR LOS USUARIOS
export interface IAllUsers {
    users: IUser[],
    usersLoading: boolean
}
// ESTRUCTURA COMPLETA DEL ESTADO PARA EL SLICE
export interface IUserState {
    userLogin: IUser|null,
    allUsers: IAllUsers
}
// ESTADO INICIAL DEL SLICE DE USUARIOS
const initialState: IUserState = {
    userLogin: null,
    allUsers: {
        users: [],
        usersLoading: false
    }
}
// SLICE DE REDUX PARA EL MANEJO DEL ESTADO DE USUARIOS
export const UserSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        // FUNCION PARA LOGEAR A UN USUARIO
        login: (state, action: PayloadAction<IUser>) => {
            state.userLogin = action.payload  // REEMPLAZA TODO EL CONTENIDO DEL GLOBAL STATE
        }, 
        // FUNCION PARA DESLOGEAR A UN USUARIO
        logout: (state)=> {
            state.userLogin = null
        },
        // FUNCION QUE ACTUALIZA EL ESTADO DE USUARIOS
        setAllUsers: (state, action: PayloadAction<IAllUsers>) => {
            state.allUsers = action.payload
        }
    }
})

export const { login, logout, setAllUsers } = UserSlice.actions
import { configureStore, createSlice } from "@reduxjs/toolkit"

export interface ThemeState {
    mode: 'dark' | 'light'
}

const initialState: ThemeState = {
    mode: 'dark'
}

export const globalSlice = createSlice({
    name: "global",
    initialState,
    reducers: {
        setMode: (state) => {
            state.mode === 'light' ? 'dark' : 'light'
        }
    }
})

export const { setMode } = globalSlice.actions

export const store = configureStore({
    reducer: {
        global: globalSlice.reducer
    }
})
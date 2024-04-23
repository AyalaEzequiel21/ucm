import { configureStore } from "@reduxjs/toolkit";
import { UserSlice } from "./state/userState";

export const store = configureStore({
    reducer: {
        user: UserSlice.reducer
    }
})
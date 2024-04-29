import { configureStore } from "@reduxjs/toolkit";
import { UserSlice } from "./state/userState";
import { userApi } from "./api/userApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import { clientApi } from "./api/clientApi";

export const store = configureStore({
    reducer: {
        user: UserSlice.reducer,
        [userApi.reducerPath]: userApi.reducer,
        [clientApi.reducerPath]: clientApi.reducer,

    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userApi.middleware, clientApi.middleware),        
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch


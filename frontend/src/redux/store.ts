import { configureStore } from "@reduxjs/toolkit";
import { UserSlice } from "./state/userState";
import { userApi } from "./api/userApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import { clientApi } from "./api/clientApi";
import { productApi } from "./api/productApi";
import { supplierApi } from "./api/supplierApi";
import { clientPaymentApi } from "./api/clientPaymentApi";
import { ViewSlice } from "./state/viewState";
import { ClientSlice } from "./state/clientState";

export const store = configureStore({
    reducer: {
        user: UserSlice.reducer,
        client: ClientSlice.reducer,
        viewState: ViewSlice.reducer,
        [userApi.reducerPath]: userApi.reducer,
        [clientApi.reducerPath]: clientApi.reducer,
        [productApi.reducerPath]: productApi.reducer,
        [supplierApi.reducerPath]: supplierApi.reducer,
        [clientPaymentApi.reducerPath]: clientPaymentApi.reducer,

    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
        userApi.middleware, 
        clientApi.middleware, 
        supplierApi.middleware, 
        productApi.middleware,
        clientPaymentApi.middleware
    ),        
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch


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
import { ProductSlice } from "./state/productState";
import { SupplierSlice } from "./state/supplierState";
import { ClientsPaymentsSlice } from "./state/clientsPaymentsState";
import { PurchaseSlice } from "./state/purchaseState";
import { purchaseApi } from "./api/purchaseApi";
import { SaleSlice } from "./state/saleState";
import { saleApi } from "./api/saleApi";
import { PaymentToSupplierSlice } from "./state/paymentToSupplierState";
import { paymentToSupplierApi } from "./api/paymentToSupplierApi";
import { PaymentsReportsSlice } from "./state/paymentsReportState";
import { paymentsReportApi } from "./api/paymentsReportApi";

//  CONFIGURACION DEL STORE CENTRAL DE REDUX , QUE MANEJARA EL ESTADO DE LA APLICACION.
export const store = configureStore({
    // Reducers para cada slice del estado, que manejan diferentes partes de la aplicación.
    reducer: {
        user: UserSlice.reducer,
        client: ClientSlice.reducer,
        clientPayment: ClientsPaymentsSlice.reducer,
        product: ProductSlice.reducer,
        purchase: PurchaseSlice.reducer,
        sale: SaleSlice.reducer,
        supplier: SupplierSlice.reducer,
        paymentToSupplier: PaymentToSupplierSlice.reducer,
        paymentsReport: PaymentsReportsSlice.reducer,
        viewState: ViewSlice.reducer,
        [userApi.reducerPath]: userApi.reducer,
        [clientApi.reducerPath]: clientApi.reducer,
        [productApi.reducerPath]: productApi.reducer,
        [purchaseApi.reducerPath]: purchaseApi.reducer,
        [saleApi.reducerPath]: saleApi.reducer,
        [supplierApi.reducerPath]: supplierApi.reducer,
        [paymentToSupplierApi.reducerPath]: paymentToSupplierApi.reducer,
        [paymentsReportApi.reducerPath]: paymentsReportApi.reducer,
        [clientPaymentApi.reducerPath]: clientPaymentApi.reducer,
    },
    // Reducers para manejar las integraciones de APIs creadas con RTK Query.
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
        userApi.middleware, 
        clientApi.middleware, 
        supplierApi.middleware, 
        productApi.middleware,
        saleApi.middleware,
        purchaseApi.middleware,
        paymentToSupplierApi.middleware,
        paymentsReportApi.middleware,
        clientPaymentApi.middleware
    ),        
})
// Configura listeners para el store, lo que permite manejar actualizaciones en tiempo real.
setupListeners(store.dispatch)

// Tipos de TypeScript para facilitar el uso de 'RootState' y 'AppDispatch' en toda la app.
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch


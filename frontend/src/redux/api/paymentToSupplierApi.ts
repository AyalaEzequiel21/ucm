import { setHeaders } from "@/utils/functionsHelper/setHeaders"
import { IApiResponse } from "@/utils/interfaces/IApiResponse"
import { IPaymentToSupplier } from "@/utils/interfaces/IPaymentToSupplier"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

// URL BASE DE LA API
const baseURL = import.meta.env.VITE_API_BASE_URL as string

// DEFINICION DE LAS PETICIONES A LA API
export const paymentToSupplierApi = createApi({
    reducerPath: 'paymentToSupplierApi', // NOMBRE DEL PATH
    baseQuery: fetchBaseQuery({ // CONFIGURACION DE URL Y HEADERS PARA LAS PETICIONES
        baseUrl: baseURL,
        prepareHeaders: setHeaders
    }),
    tagTypes: ['Payment To Supplier'],
    // DEFINICION DE LOS ENDPOINTS
    endpoints: (builder) => ({
        // METODO BUSCAR POR ID
        getPaymentToSupplierById: builder.query<IApiResponse<IPaymentToSupplier>, string>({
            query: (id) => `/paymentToSupplier/${id}`,
            providesTags: ['Payment To Supplier']
        }),
        // METODO LISTAR TODOS
        getAllPaymentsToSuppliers: builder.query<IApiResponse<IPaymentToSupplier>, void>({
            query: () => '/paymentsToSupplier',
            providesTags: ['Payment To Supplier']
        }),
        // METODO AGREGAR
        addPaymentToSupplier: builder.mutation<IApiResponse<IPaymentToSupplier>, Partial<IPaymentToSupplier>>({
            query: (newPayment) => ({
                url: '/paymentsToSupplier/register',
                method: 'POST',
                body: newPayment
            }),
            invalidatesTags: ['Payment To Supplier']
        })
    })
})

export const { useGetPaymentToSupplierByIdQuery, useGetAllPaymentsToSuppliersQuery, useAddPaymentToSupplierMutation } = paymentToSupplierApi
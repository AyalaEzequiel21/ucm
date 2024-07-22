import { setHeaders } from "@/utils/functionsHelper/setHeaders"
import { IApiResponse } from "@/utils/interfaces/IApiResponse"
import { IPaymentToSupplier } from "@/utils/interfaces/IPaymentToSupplier"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

const baseURL = import.meta.env.VITE_API_BASE_URL as string

export const paymentToSupplierApi = createApi({
    reducerPath: 'paymentToSupplierApi',
    baseQuery: fetchBaseQuery({
        baseUrl: baseURL,
        prepareHeaders: setHeaders
    }),
    tagTypes: ['Payment To Supplier'],
    endpoints: (builder) => ({
        getPaymentToSupplierById: builder.query<IApiResponse<IPaymentToSupplier>, string>({
            query: (id) => `/paymentToSupplier/${id}`,
            providesTags: ['Payment To Supplier']
        }),
        getAllPaymentsToSuppliers: builder.query<IApiResponse<IPaymentToSupplier>, void>({
            query: () => '/paymentsToSupplier',
            providesTags: ['Payment To Supplier']
        }),
        addPaymentToSupplier: builder.mutation<IApiResponse<IPaymentToSupplier>, Partial<IPaymentToSupplier>>({
            query: (newPayment) => ({
                url: '/paymentsToSupplier',
                method: 'POST',
                body: newPayment
            }),
            invalidatesTags: ['Payment To Supplier']
        })
    })
})

export const { useGetPaymentToSupplierByIdQuery, useGetAllPaymentsToSuppliersQuery, useAddPaymentToSupplierMutation } = paymentToSupplierApi
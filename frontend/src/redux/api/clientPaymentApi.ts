import { setHeaders } from "@/utils/functionsHelper/setHeaders";
import { IApiResponse } from "@/utils/interfaces/IApiResponse";
import { IClientPayment } from "@/utils/interfaces/IClientPayment";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseURL = import.meta.env.VITE_API_BASE_URL as string

export const clientPaymentApi = createApi({
    reducerPath: 'clientPaymentApi',
    baseQuery: fetchBaseQuery({
        baseUrl: baseURL,
        prepareHeaders: setHeaders
    }),
    tagTypes: ['Client Payment'],
    endpoints: (builder) => ({
        addClientPayment: builder.mutation<IApiResponse<IClientPayment>, Partial<IClientPayment>>({
            query: (newPayment) => ({
                url: '/clientPayments/register',
                method: 'POST',
                body: newPayment,
            }),
            invalidatesTags: ['Client Payment']
        }),
        getClientpaymentById: builder.query<IApiResponse<IClientPayment>, string>({
            query: (id) => `/clientPayments/clientPayment/${id}`,
            providesTags: ['Client Payment']
        }),

        getAllClientPayments: builder.query<IApiResponse<IClientPayment>, void>({
            query: () => '/clientPayments',
            providesTags: ['Client Payment']
          }),
    })
})

export const { useGetClientpaymentByIdQuery, useGetAllClientPaymentsQuery, useAddClientPaymentMutation } = clientPaymentApi
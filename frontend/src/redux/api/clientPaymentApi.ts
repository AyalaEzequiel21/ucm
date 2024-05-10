import { IApiResponse } from "@/utils/interfaces/IApiResponse";
import { IClientPayment } from "@/utils/interfaces/IClientPayment";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseURL = import.meta.env.VITE_API_BASE_URL as string;

export const clientPaymentApi = createApi({
    reducerPath: 'clientPaymentApi',
    baseQuery: fetchBaseQuery({baseUrl: baseURL}),
    tagTypes: ['Client Payment'],
    endpoints: (builder) => ({
        getClientpaymentById: builder.query<IApiResponse<IClientPayment>, string>({
            query: (id) => `clientPayments/clientPayment/${id}`,
            providesTags: ['Client Payment']
        }),

        getAllClientPayments: builder.query<IApiResponse<IClientPayment>, void>({
            query: () => 'endpointTest/getPayments',
            providesTags: ['Client Payment']
          }),
    })
})

export const { useGetClientpaymentByIdQuery, useGetAllClientPaymentsQuery } = clientPaymentApi
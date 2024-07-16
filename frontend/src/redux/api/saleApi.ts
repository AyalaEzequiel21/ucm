import { setHeaders } from "@/utils/functionsHelper/setHeaders"
import { IApiResponse } from "@/utils/interfaces/IApiResponse"
import { ISale } from "@/utils/interfaces/ISale"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"


const baseURL = import.meta.env.VITE_API_BASE_URL as string

export const saleApi = createApi({
    reducerPath: 'saleApi',
    baseQuery: fetchBaseQuery({
        baseUrl: baseURL,
        prepareHeaders: setHeaders
    }),
    tagTypes: ['Sale'],
    endpoints: (builder) => ({
        addSale: builder.mutation<IApiResponse<ISale>, Partial<ISale>>({
            query: (newSale) => ({
                url: '/sales/register',
                method: 'POST',
                body: newSale
            }),
            invalidatesTags: ['Sale']
        }),
        getSaleById: builder.query<IApiResponse<ISale>, string>({
            query: (id)=> `/sales/sale/${id}`,
            providesTags: ['Sale']
        }),
        getAllSales: builder.query<IApiResponse<ISale>, void>({
            query: () => '/sales',
            providesTags: ['Sale']
        }),
    })
})

export const { useAddSaleMutation, useGetSaleByIdQuery, useGetAllSalesQuery } = saleApi
import { setHeaders } from "@/utils/functionsHelper/setHeaders"
import { IApiResponse } from "@/utils/interfaces/IApiResponse"
import { IPurchase } from "@/utils/interfaces/IPurchase"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

const baseURL = import.meta.env.VITE_API_BASE_URL as string

export const purchaseApi = createApi({
    reducerPath: 'purchaseApi',
    baseQuery: fetchBaseQuery({
        baseUrl: baseURL,
        prepareHeaders: setHeaders
    }),
    tagTypes: ['Purchase'],
    endpoints: (builder) => ({
        addPurchase: builder.mutation<IApiResponse<IPurchase>, Partial<IPurchase>>({
            query: (newPurchase) => ({
                url: '/purchases/register',
                method: 'POST',
                body: newPurchase
            }),
            invalidatesTags: ['Purchase']
        }),
        getPurchaseById: builder.query<IApiResponse<IPurchase>, string>({
            query: (id)=> `/purchases/purchase/${id}`,
            providesTags: ['Purchase']
        }),
        getAllPurchases: builder.query<IApiResponse<IPurchase>, void>({
            query: () => '/purchases',
            providesTags: ['Purchase']
        }),
    })
})

export const { useAddPurchaseMutation, useGetAllPurchasesQuery, useGetPurchaseByIdQuery } = purchaseApi
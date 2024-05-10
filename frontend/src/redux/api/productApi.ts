import { IApiResponse } from "@/utils/interfaces/IApiResponse";
import { IProduct } from "@/utils/interfaces/IProduct";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseURL = import.meta.env.VITE_API_BASE_URL as string;

export const productApi = createApi({
    reducerPath: 'productsApi',
    baseQuery: fetchBaseQuery({baseUrl: baseURL}),
    tagTypes: ['Product'],
    endpoints: (builder) => ({
        getProductById: builder.query<IApiResponse<IProduct>, string>({
            query: (id) => `clients/client/${id}`,
            providesTags: ['Product']
        }),

        getAllProducts: builder.query<IApiResponse<IProduct>, void>({
            query: () => 'endpointTest/getClients',
            providesTags: ['Product']
          }),
    })
})

export const { useGetProductByIdQuery, useGetAllProductsQuery } = productApi
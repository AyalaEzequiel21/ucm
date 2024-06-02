import { setHeaders } from "@/utils/functionsHelper/setHeaders";
import { IApiResponse } from "@/utils/interfaces/IApiResponse";
import { IProduct } from "@/utils/interfaces/IProduct";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseURL = import.meta.env.VITE_API_BASE_URL as string;

export const productApi = createApi({
    reducerPath: 'productsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: baseURL,
        prepareHeaders: setHeaders
    }),
    tagTypes: ['Product'],
    endpoints: (builder) => ({
        addProduct: builder.mutation<IApiResponse<IProduct>, Partial<IProduct>>({
            query: (newProduct) => ({
                url: '/products/register',
                method: 'POST',
                body: newProduct
            }),
            invalidatesTags: ['Product']
        }),
        getProductById: builder.query<IApiResponse<IProduct>, string>({
            query: (id) => `/products/product/${id}`,
            providesTags: ['Product']
        }),
        getAllProducts: builder.query<IApiResponse<IProduct>, void>({
            query: () => '/products',
            providesTags: ['Product']
          }),
    })
})

export const { useGetProductByIdQuery, useGetAllProductsQuery, useAddProductMutation } = productApi
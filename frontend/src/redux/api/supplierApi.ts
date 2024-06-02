import { setHeaders } from "@/utils/functionsHelper/setHeaders";
import { IApiResponse } from "@/utils/interfaces/IApiResponse";
import { ISupplier } from "@/utils/interfaces/ISupplier";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseURL = import.meta.env.VITE_API_BASE_URL as string;

export const supplierApi = createApi({
    reducerPath: 'suppliersApi',
    baseQuery: fetchBaseQuery({
        baseUrl: baseURL,
        prepareHeaders: setHeaders
    }),
    tagTypes: ['Supplier'],
    endpoints: (builder) => ({
        getSupplierById: builder.query<IApiResponse<ISupplier>, string>({
            query: (id) => `/suppliers/supplier/${id}`,
            providesTags: ['Supplier']
        }),

        getAllSuppliers: builder.query<IApiResponse<ISupplier>, void>({
            query: () => '/suppliers',
            providesTags: ['Supplier']
          }),
    })
})

export const { useGetSupplierByIdQuery, useGetAllSuppliersQuery } = supplierApi
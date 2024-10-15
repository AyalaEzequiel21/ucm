import { setHeaders } from "@/utils/functionsHelper/setHeaders";
import { IApiResponse, ISingularApiResponse } from "@/utils/interfaces/IApiResponse";
import { ISupplier, ISupplierDetails } from "@/utils/interfaces/ISupplier";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// URL BASE DE LA API
const baseURL = import.meta.env.VITE_API_BASE_URL as string;

// DEFINICION DE LAS PETICIONES A LA API
export const supplierApi = createApi({
    reducerPath: 'suppliersApi', // NOMBRE DEL PATH
    baseQuery: fetchBaseQuery({ // CONFIGURACION DE URL Y HEADERS PARA LAS PETICIONES
        baseUrl: baseURL,
        prepareHeaders: setHeaders
    }),
    tagTypes: ['Supplier'],
    // DEFINICION DE LOS ENDPOINTS
    endpoints: (builder) => ({
        // METODO AGREGAR
        addSupplier: builder.mutation<IApiResponse<ISupplier>, Partial<ISupplier>>({
            query: (newSupplier) => ({
                url: './suppliers/register',
                method: 'POST',
                body: newSupplier
            }),
            invalidatesTags: ['Supplier']
        }),
        // METODO BUSCAR POR ID
        getSupplierById: builder.query<ISingularApiResponse<ISupplier>, string>({
            query: (id) => `/suppliers/supplier/${id}`,
            providesTags: ['Supplier']
        }),
        // METODO BUSCAR POR ID PARA DETALLES
        getSupplierDetailsById: builder.query<ISingularApiResponse<ISupplierDetails>, string>({
            query: (id) => `/suppliers/supplierDetails/${id}`,
            providesTags: ['Supplier']
        }),
        // METODO LISTAR TODOS
        getAllSuppliers: builder.query<IApiResponse<ISupplier>, void>({
            query: () => '/suppliers',
            providesTags: ['Supplier']
          }),
    })
})

export const { useGetSupplierByIdQuery, useGetSupplierDetailsByIdQuery, useGetAllSuppliersQuery, useAddSupplierMutation } = supplierApi
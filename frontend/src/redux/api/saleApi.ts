import { setHeaders } from "@/utils/functionsHelper/setHeaders"
import { IApiResponse } from "@/utils/interfaces/IApiResponse"
import { ISale } from "@/utils/interfaces/ISale"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

// URL BASE DE LA API
const baseURL = import.meta.env.VITE_API_BASE_URL as string

// DEFINICION DE LAS PETICIONES A LA API
export const saleApi = createApi({
    reducerPath: 'saleApi', // NOMBRE DEL PATH
    baseQuery: fetchBaseQuery({ // CONFIGURACION DE URL Y HEADERS PARA LAS PETICIONES
        baseUrl: baseURL,
        prepareHeaders: setHeaders
    }),
    tagTypes: ['Sale'],
    // DEFINICION DE LOS ENDPOINTS
    endpoints: (builder) => ({
        // METODO AGREGAR
        addSale: builder.mutation<IApiResponse<ISale>, Partial<ISale>>({
            query: (newSale) => ({
                url: '/sales/register',
                method: 'POST',
                body: newSale
            }),
            invalidatesTags: ['Sale']
        }),
        // METODO BUSCAR POR ID
        getSaleById: builder.query<IApiResponse<ISale>, string>({
            query: (id)=> `/sales/sale/${id}`,
            providesTags: ['Sale']
        }),
        // METODO LISTAR TODAS LAS VENTAS DE CLIENTE
        getAllSalesByClientId: builder.query<IApiResponse<ISale>, string>({
            query: (id) => `/sales/client/id/${id}`,
            providesTags: ['Sale']
        }),
        // METODO LISTAR TODOS
        getAllSales: builder.query<IApiResponse<ISale>, void>({
            query: () => '/sales',
            providesTags: ['Sale']
        }),
    })
})

export const { useAddSaleMutation, useGetSaleByIdQuery, useGetAllSalesQuery, useGetAllSalesByClientIdQuery } = saleApi
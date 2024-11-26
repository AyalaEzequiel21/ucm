import { setHeaders } from "@/utils/functionsHelper/setHeaders"
import { IApiResponse, ISingularApiResponse } from "@/utils/interfaces/IApiResponse"
import { IPurchase, IPurchaseForDetails } from "@/utils/interfaces/IPurchase"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

// URL BASE DE LA API
const baseURL = import.meta.env.VITE_API_BASE_URL as string

// DEFINICION DE LAS PETICIONES A LA API
export const purchaseApi = createApi({
    reducerPath: 'purchaseApi', // NOMBRE DEL PATH
    baseQuery: fetchBaseQuery({ // CONFIGURACION DE URL Y HEADERS PARA LAS PETICIONES
        baseUrl: baseURL,
        prepareHeaders: setHeaders
    }),
    tagTypes: ['Purchase'],
    // DEFINICION DE LOS ENDPOINTS
    endpoints: (builder) => ({
        // METODO AGREGAR
        addPurchase: builder.mutation<IApiResponse<IPurchase>, Partial<IPurchase>>({
            query: (newPurchase) => ({
                url: '/purchases/register',
                method: 'POST',
                body: newPurchase
            }),
            invalidatesTags: ['Purchase']
        }),
        // METODO BUSCAR POR ID
        getPurchaseById: builder.query<ISingularApiResponse<IPurchase>, string>({
            query: (id)=> `/purchases/purchase/${id}`,
            providesTags: ['Purchase']
        }),
        // METODO BUSCAR POR ID PARA DETALLES
        getPurchaseDetailsById: builder.query<ISingularApiResponse<IPurchaseForDetails>, string>({
            query: (id) => `/purchases/purchaseDetails/${id}`,
            providesTags: ['Purchase']
        }),
        // METODO LISTAR TODOS
        getAllPurchases: builder.query<IApiResponse<IPurchase>, void>({
            query: () => '/purchases',
            providesTags: ['Purchase']
        }),
        // METODO MODIFICAR
        modifyPurchase: builder.mutation<IApiResponse<IPurchase>, IPurchase>({
            query: (purchase) => ({
                url: '/purchases/update',
                method: 'PUT',
                body: purchase
            }),
            invalidatesTags: ['Purchase']
        })
    })
})

export const { useAddPurchaseMutation, useGetAllPurchasesQuery, useGetPurchaseDetailsByIdQuery, useGetPurchaseByIdQuery, useModifyPurchaseMutation } = purchaseApi
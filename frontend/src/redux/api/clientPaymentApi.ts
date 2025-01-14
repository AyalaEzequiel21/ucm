import { setHeaders } from "@/utils/functionsHelper/setHeaders";
import { IApiResponse, ISingularApiResponse } from "@/utils/interfaces/IApiResponse";
import { IClientPayment } from "@/utils/interfaces/IClientPayment";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// URL BASE DE LA API
const baseURL = import.meta.env.VITE_API_BASE_URL as string

// DEFINICION DE LAS PETICIONES A LA API
export const clientPaymentApi = createApi({
    reducerPath: 'clientPaymentApi', // NOMBRE DEL PATH
    baseQuery: fetchBaseQuery({ // CONFIGURACION DE URL Y HEADERS PARA LAS PETICIONES
        baseUrl: baseURL,
        prepareHeaders: setHeaders
    }),
    tagTypes: ['Client Payment'],
    // DEFINICION DE LOS ENDPOINTS
    endpoints: (builder) => ({
        // METODO AGREGAR
        addClientPayment: builder.mutation<IApiResponse<IClientPayment>, Partial<IClientPayment>>({
            query: (newPayment) => ({
                url: '/clientPayments/register',
                method: 'POST',
                body: newPayment,
            }),
            invalidatesTags: ['Client Payment']
        }),
        // METODO BUSCAR POR ID PARA DETALLE
        getClientPaymentDetailsById: builder.query<ISingularApiResponse<IClientPayment>, string>({
            query: (id) => `/clientPayments/paymentDetail/${id}`,  
            providesTags: ['Client Payment']  
        }),
        // METODO BUSCAR POR ID
        getClientpaymentById: builder.query<ISingularApiResponse<IClientPayment>, string>({
            query: (id) => `/clientPayments/payment/${id}`,
            providesTags: ['Client Payment']
        }),
        //METODO PARA LISTAR TODOS LOS APGOS DE UN CLIENTE
        getAllClientPaymentsByClientId: builder.query<IApiResponse<IClientPayment>, string>({
            query: (id) => `/clientPayments/client/${id}`,
            providesTags: ['Client Payment']
        }),
        // METODO LISTAR TODOS
        getAllClientPayments: builder.query<IApiResponse<IClientPayment>, void>({
            query: () => '/clientPayments',
            providesTags: ['Client Payment']
        }),
        // METODO ELIMINAR
        deleteClientPayment: builder.mutation<IApiResponse<{message: string}>, string>({
            query: (id) => ({
                url: `/clientPayments/delete/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Client Payment']
        }),
    })

})

export const { useGetClientpaymentByIdQuery, useGetAllClientPaymentsQuery, useGetClientPaymentDetailsByIdQuery, useAddClientPaymentMutation, useGetAllClientPaymentsByClientIdQuery, useDeleteClientPaymentMutation } = clientPaymentApi
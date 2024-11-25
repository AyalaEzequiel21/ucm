import { setHeaders } from "@/utils/functionsHelper/setHeaders";
import { IApiResponse, ISingularApiResponse } from "@/utils/interfaces/IApiResponse";
import { IClient, IClientDetails, IClientMongo } from "@/utils/interfaces/IClient";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// URL BASE DE LA API
const baseURL = import.meta.env.VITE_API_BASE_URL as string;

// DEFINICION DE LAS PETICIONES A LA API
export const clientApi = createApi({
    reducerPath: 'clientsApi', // NOMBRE DEL PATH
    baseQuery: fetchBaseQuery({ // CONFIGURACION DE URL Y HEADERS PARA LAS PETICIONES
        baseUrl: baseURL, 
        prepareHeaders: setHeaders
    }),
    tagTypes: ['Client'],
    // DEFINICION DE LOS ENDPOINTS
    endpoints: (builder) => ({
        // METODO AGREGAR
        addClient: builder.mutation<IApiResponse<IClient>, Partial<IClient>>({
            query: (newClient) => ({
                url: '/clients/register',
                method: 'POST',
                body: newClient,
            }),
            invalidatesTags: ['Client']
        }),
        // METODO BUSCAR POR ID
        getClientDetailsById: builder.query<ISingularApiResponse<IClientDetails>, string>({
            query: (id) => `/clients/clientDetails/${id}`,
            providesTags: ['Client']
        }),
        // METODO LISTAR TODOS
        getAllClients: builder.query<IApiResponse<IClient>, void>({
            query: () => '/clients',
            providesTags: ['Client']
        }),
          // METODO MODIFICAR
        modifyClient: builder.mutation<IApiResponse<IClient>, IClientMongo>({
            query: (client) => ({
                url: '/clients/update',
                method: 'PUT',
                body: client
            }),
            invalidatesTags: ['Client']
        }),
    })
})

export const { useGetClientDetailsByIdQuery, useGetAllClientsQuery, useAddClientMutation, useModifyClientMutation } = clientApi
import { setHeaders } from "@/utils/functionsHelper/setHeaders";
import { IApiResponse } from "@/utils/interfaces/IApiResponse";
import { IClient } from "@/utils/interfaces/IClient";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseURL = import.meta.env.VITE_API_BASE_URL as string;

export const clientApi = createApi({
    reducerPath: 'clientsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: baseURL, 
        prepareHeaders: setHeaders
    }),
    tagTypes: ['Client'],
    endpoints: (builder) => ({
        addClient: builder.mutation<IApiResponse<IClient>, Partial<IClient>>({
            query: (newClient) => ({
                url: '/clients/register',
                method: 'POST',
                body: newClient,
            }),
            invalidatesTags: ['Client']
        }),
        getClientById: builder.query<IApiResponse<IClient>, string>({
            query: (id) => `/clients/client/${id}`,
            providesTags: ['Client']
        }),
        getAllClients: builder.query<IApiResponse<IClient>, void>({
            query: () => '/clients',
            providesTags: ['Client']
          }),
    })
})

export const { useGetClientByIdQuery, useGetAllClientsQuery, useAddClientMutation } = clientApi
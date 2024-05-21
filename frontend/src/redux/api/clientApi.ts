import { IApiResponse } from "@/utils/interfaces/IApiResponse";
import { IClient } from "@/utils/interfaces/IClient";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseURL = import.meta.env.VITE_API_BASE_URL as string;

export const clientApi = createApi({
    reducerPath: 'clientsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: baseURL, 
        // credentials: 'include'
    }),
    tagTypes: ['Client'],
    endpoints: (builder) => ({
        getClientById: builder.query<IApiResponse<IClient>, string>({
            query: (id) => `clients/client/${id}`,
            providesTags: ['Client']
        }),

        addClient: builder.mutation<IApiResponse<IClient>, Partial<IClient>>({
            query: (newClient) => ({
                url: 'clients/register',
                method: 'POST',
                body: newClient
            }),
            invalidatesTags: ['Client']
        }),

        getAllClients: builder.query<IApiResponse<IClient>, void>({
            query: () => 'endpointTest/getClients',
            providesTags: ['Client']
          }),
    })
})

export const { useGetClientByIdQuery, useGetAllClientsQuery, useAddClientMutation } = clientApi
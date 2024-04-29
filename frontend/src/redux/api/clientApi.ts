import { IClient } from "@/utils/interfaces/IClient";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const baseURL = import.meta.env.VITE_API_BASE_URL as string;


export const clientApi = createApi({
    reducerPath: 'clientsApi',
    baseQuery: fetchBaseQuery({baseUrl: baseURL}),
    tagTypes: ['Client'],
    endpoints: (builder) => ({
        getClientById: builder.query<IClient, string>({
            query: (id) => `clients/client/${id}`,
            providesTags: ['Client']
        })
    })
})

export const { useGetClientByIdQuery } = clientApi
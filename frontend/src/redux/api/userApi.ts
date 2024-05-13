import { IApiResponse } from "@/utils/interfaces/IApiResponse";
import { ILoginFormValues } from "@/utils/interfaces/ILoginFormValues";
import { ILoginResponse } from "@/utils/interfaces/ILoginReponse";
import { UserType } from "@/utils/types/UserType";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseURL = import.meta.env.VITE_API_BASE_URL as string;

export const userApi = createApi({
    reducerPath: 'usersApi',
    baseQuery: fetchBaseQuery({baseUrl: baseURL}),
    tagTypes: ['User'],
    endpoints: (builder) => ({
        login: builder.mutation<ILoginResponse, ILoginFormValues>({
            query: (credentials) => ({
              url: '/auth/login',
              method: 'POST',
              body: credentials,
            }),
            invalidatesTags: ['User'],
          }),
        
        getUserById: builder.query<IApiResponse<UserType>, string>({
            query: (id) => `/users/user/${id}`,
            providesTags: ['User']
        }),

        getAllUsers: builder.query<IApiResponse<UserType>, void>({
            query: () => '/endpointTest/getUsers',
            providesTags: ['User']
          }),
    })
})

export const { useGetUserByIdQuery, useGetAllUsersQuery, useLoginMutation} = userApi
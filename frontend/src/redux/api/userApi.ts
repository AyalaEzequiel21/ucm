import { setHeaders } from "@/utils/functionsHelper/setHeaders";
import { IApiResponse } from "@/utils/interfaces/IApiResponse";
import { ILoginFormValues } from "@/utils/interfaces/ILoginFormValues";
import { ILoginResponse } from "@/utils/interfaces/ILoginReponse";
import { IUser } from "@/utils/interfaces/IUser";
import { UserType } from "@/utils/types/UserType";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseURL = import.meta.env.VITE_API_BASE_URL as string;

export const userApi = createApi({
    reducerPath: 'usersApi',
    baseQuery: fetchBaseQuery({
      baseUrl: baseURL,
      prepareHeaders: setHeaders
    }),
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
        addUser: builder.mutation<IApiResponse<IUser>, Partial<IUser>>({
          query: (newUser) => ({
            url: '/auth/user/register',
            method: 'POST',
            body: newUser
          }),
          invalidatesTags: ['User']
        }),
        getUserById: builder.query<IApiResponse<UserType>, string>({
            query: (id) => `/users/user/${id}`,
            providesTags: ['User']
        }),

        getAllUsers: builder.query<IApiResponse<UserType>, void>({
            query: () => '/auth/users',
            providesTags: ['User']
          }),
    })
})

export const { useGetUserByIdQuery, useGetAllUsersQuery, useLoginMutation , useAddUserMutation} = userApi
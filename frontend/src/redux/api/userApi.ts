import { setHeaders } from "@/utils/functionsHelper/setHeaders";
import { IApiResponse } from "@/utils/interfaces/IApiResponse";
import { ILoginFormValues } from "@/utils/interfaces/ILoginFormValues";
import { ILoginResponse } from "@/utils/interfaces/ILoginReponse";
import { IUser } from "@/utils/interfaces/IUser";
import { UserType } from "@/utils/types/UserType";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// URL BASE DE LA API
const baseURL = import.meta.env.VITE_API_BASE_URL as string;

// DEFINICION DE LAS PETICIONES A LA API
export const userApi = createApi({
    reducerPath: 'usersApi', // NOMBRE DEL PATH
    baseQuery: fetchBaseQuery({ // CONFIGURACION DE URL Y HEADERS PARA LAS PETICIONES
      baseUrl: baseURL,
      prepareHeaders: setHeaders
    }),
    tagTypes: ['User'],
    // DEFINICION DE LOS ENDPOINTS
    endpoints: (builder) => ({
        // METODO LOGIN
        login: builder.mutation<ILoginResponse, ILoginFormValues>({
            query: (credentials) => ({
              url: '/auth/login',
              method: 'POST',
              body: credentials,
            }),
            invalidatesTags: ['User'],
          }),
        // METODO AGREGAR
        addUser: builder.mutation<IApiResponse<IUser>, Partial<IUser>>({
          query: (newUser) => ({
            url: '/auth/user/register',
            method: 'POST',
            body: newUser
          }),
          invalidatesTags: ['User']
        }),
        // METODO BUSCAR POR ID
        getUserById: builder.query<IApiResponse<UserType>, string>({
            query: (id) => `/users/user/${id}`,
            providesTags: ['User']
        }),
        // METODO LISTAR TODOS
        getAllUsers: builder.query<IApiResponse<UserType>, void>({
            query: () => '/auth/users',
            providesTags: ['User']
          }),
    })
})

export const { useGetUserByIdQuery, useGetAllUsersQuery, useLoginMutation , useAddUserMutation} = userApi
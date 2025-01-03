import { setHeaders } from "@/utils/functionsHelper/setHeaders";
import { IApiResponse, ISingularApiResponse } from "@/utils/interfaces/IApiResponse";
import { ILoginFormValues } from "@/utils/interfaces/ILoginFormValues";
import { ILoginResponse } from "@/utils/interfaces/ILoginReponse";
import { IUser, IUserMongo } from "@/utils/interfaces/IUser";
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
        getUserById: builder.query<ISingularApiResponse<IUserMongo>, string>({
            query: (id) => `/auth/users/user/${id}`,
            providesTags: ['User']
        }),
        // METODO LISTAR TODOS
        getAllUsers: builder.query<IApiResponse<IUser>, void>({
            query: () => '/auth/users',
            providesTags: ['User']
        }),
        // METODO MODIFICAR
        modifyUser: builder.mutation<IApiResponse<IUserMongo>, IUser>({
          query: (user) => ({
            url: '/auth/user/update',
            method: 'PUT',
            body: user
          }),
          invalidatesTags: ['User']
        }),
        //  METODO ELIMINAR
        deleteUser: builder.mutation<IApiResponse<{ message: string }>, string>({
          query: (id) => ({
            url: `/auth/user/delete/${id}`,
            method: 'DELETE',
          }),
          invalidatesTags: ['User']
        }),
    })
})

export const { useGetUserByIdQuery, useGetAllUsersQuery, useLoginMutation , useAddUserMutation, useModifyUserMutation, useDeleteUserMutation } = userApi
import { IApiResponse } from "@/utils/interfaces/IApiResponse";
import { UserType } from "@/utils/types/UserType";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseURL = import.meta.env.VITE_API_BASE_URL as string;

export const userApi = createApi({
    reducerPath: 'usersApi',
    baseQuery: fetchBaseQuery({baseUrl: baseURL}),
    tagTypes: ['User'],
    endpoints: (builder) => ({
        getUserById: builder.query<IApiResponse<UserType>, string>({
            query: (id) => `users/user/${id}`,
            providesTags: ['User']
        }),

        getAllUsers: builder.query<IApiResponse<UserType>, void>({
            query: () => 'endpointTest/getUsers',
            providesTags: ['User']
          }),
    })
})

export const { useGetUserByIdQuery, useGetAllUsersQuery } = userApi
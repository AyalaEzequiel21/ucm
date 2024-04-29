import { UserType } from "@/utils/types/UserType";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const baseURL = import.meta.env.VITE_API_BASE_URL as string;

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({baseUrl: baseURL}),
    tagTypes: ['User'],
    endpoints: (builder) => ({
        getUserById: builder.query<UserType, string>({
            query: (id) => `users/user/${id}`,
            providesTags: ['User']
        })
    })
})

export const { useGetUserByIdQuery } = userApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query"


const baseUrl = process.env.API_BASE_URL

const api = createApi({
    baseQuery: fetchBaseQuery({baseUrl: baseUrl})
})
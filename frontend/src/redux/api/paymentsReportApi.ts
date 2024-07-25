import { setHeaders } from "@/utils/functionsHelper/setHeaders"
import { IApiResponse } from "@/utils/interfaces/IApiResponse"
import { IPaymentsReport } from "@/utils/interfaces/IPaymentsReport"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"


const baseURL = import.meta.env.VITE_API_BASE_URL as string

export const paymentsReportApi = createApi({
    reducerPath: 'paymentsReportApi',
    baseQuery: fetchBaseQuery({
        baseUrl: baseURL,
        prepareHeaders: setHeaders
    }),
    tagTypes: ['Payments Report'],
    endpoints: (builder) => ({
        addPaymentsReport: builder.mutation<IApiResponse<IPaymentsReport>, Partial<IPaymentsReport>>({
            query: (newReport) => ({
                url: '/paymentsReport/register',
                method: 'POST',
                body: newReport,
            }),
            invalidatesTags: ['Payments Report']
        }),

        getPaymentsReportById: builder.query<IApiResponse<IPaymentsReport>, string>({
            query: (id) => `/paymentsReport/report/${id}`,
            providesTags: ['Payments Report']
        }),

        getAllPaymentsReports: builder.query<IApiResponse<IPaymentsReport>, void>({
            query: () => '/paymentsReport',
            providesTags: ['Payments Report']
        }),
    })
})

export const { useGetPaymentsReportByIdQuery, useGetAllPaymentsReportsQuery, useAddPaymentsReportMutation } = paymentsReportApi
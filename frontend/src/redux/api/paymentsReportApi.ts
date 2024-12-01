import { setHeaders } from "@/utils/functionsHelper/setHeaders"
import { IApiResponse, ISingularApiResponse } from "@/utils/interfaces/IApiResponse"
import { IPaymentsReport } from "@/utils/interfaces/IPaymentsReport"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

// URL BASE DE LA API
const baseURL = import.meta.env.VITE_API_BASE_URL as string

// DEFINICION DE LAS PETICIONES A LA API
export const paymentsReportApi = createApi({
    reducerPath: 'paymentsReportApi', // NOMBRE DEL PATH
    baseQuery: fetchBaseQuery({ // CONFIGURACION DE URL Y HEADERS PARA LAS PETICIONES
        baseUrl: baseURL,
        prepareHeaders: setHeaders
    }),
    tagTypes: ['Payments Report'],
    // DEFINICION DE LOS ENDPOINTS
    endpoints: (builder) => ({
        // METODO AGREGAR
        addPaymentsReport: builder.mutation<IApiResponse<IPaymentsReport>, Partial<IPaymentsReport>>({
            query: (newReport) => ({
                url: '/paymentsReport/register',
                method: 'POST',
                body: newReport,
            }),
            invalidatesTags: ['Payments Report']
        }),
        // METODO BUSCAR POR ID
        getPaymentsReportById: builder.query<ISingularApiResponse<IPaymentsReport>, string>({
            query: (id) => `/paymentsReport/report/${id}`,
            providesTags: ['Payments Report']
        }),
        // METODO LISTAR TODOS
        getAllPaymentsReports: builder.query<IApiResponse<IPaymentsReport>, void>({
            query: () => '/paymentsReport',
            providesTags: ['Payments Report']
        }),
        // METODO MODIFICAR
        modifyPaymentsReport: builder.mutation<IApiResponse<IPaymentsReport>, IPaymentsReport>({
            query: (report) => ({
                url: '/paymentsReport/update',
                method: 'PUT',
                body: report
            }),
            invalidatesTags: ['Payments Report']
        })
    })
})

export const { useGetPaymentsReportByIdQuery, useGetAllPaymentsReportsQuery, useAddPaymentsReportMutation, useModifyPaymentsReportMutation } = paymentsReportApi
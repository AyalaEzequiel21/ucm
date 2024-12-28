import { setHeaders } from "@/utils/functionsHelper/setHeaders";
import { IApiResponse } from "@/utils/interfaces/IApiResponse";
import { IProduct } from "@/utils/interfaces/IProduct";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// URL BASE DE LA API
const baseURL = import.meta.env.VITE_API_BASE_URL as string;

// DEFINICION DE LAS PETICIONES A LA API
export const productApi = createApi({
    reducerPath: 'productsApi', // NOMBRE DEL PATH
    baseQuery: fetchBaseQuery({ // CONFIGURACION DE URL Y HEADERS PARA LAS PETICIONES
        baseUrl: baseURL,
        prepareHeaders: setHeaders
    }),
    tagTypes: ['Product'],
    // DEFINICION DE LOS ENDPOINTS
    endpoints: (builder) => ({
        // METODO AGREGAR
        addProduct: builder.mutation<IApiResponse<IProduct>, Partial<IProduct>>({
            query: (newProduct) => ({
                url: '/products/register',
                method: 'POST',
                body: newProduct
            }),
            invalidatesTags: ['Product']
        }),
        // METODO BUSCAR POR ID
        getProductById: builder.query<IApiResponse<IProduct>, string>({
            query: (id) => `/products/product/${id}`,
            providesTags: ['Product']
        }),
        // METODO LISTAR TODOS
        getAllProducts: builder.query<IApiResponse<IProduct>, void>({
            query: () => '/products',
            providesTags: ['Product']
        }),
        // METODO MODIFICAR
        modifyProduct: builder.mutation<IApiResponse<IProduct>, IProduct>({
            query: (product) => ({
                url: '/products/update',
                method: 'PUT',
                body: product
            }),
            invalidatesTags: ['Product']
        }), 
        deleteProduct: builder.mutation<IApiResponse<{ message: string }>, string>({
            query: (id) => ({
                url: `/products/delete/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Product']
        })
    })
})

export const { useGetProductByIdQuery, useGetAllProductsQuery, useAddProductMutation, useModifyProductMutation, useDeleteProductMutation } = productApi
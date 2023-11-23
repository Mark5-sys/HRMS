import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { API } from '../../config'

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: API }),
    tagTypes: ['Employee', 'Department', 'Position'],
    // endpoints: builder => ({})
    endpoints: builder => ({
        getDepartments: builder.query({
            query: () => '/department'
        }),
        getPositions: builder.query({
            query: () => '/position'
        })
        
    })
})

export const { useGetDepartmentsQuery, useGetPositionsQuery } = apiSlice
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://seal-app-sq4gf.ondigitalocean.app/api' }),
    tagTypes: ['Employee'],
    endpoints: builder => ({
        getDepartments: builder.query({
            query: () => '/department'
        })
    })
})

export const { useGetDepartmentsQuery } = apiSlice
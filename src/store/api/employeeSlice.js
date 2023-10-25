import { apiSlice } from "./apiSlice";

export const employeeSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getEmployees: builder.query({
            query: () => '/employee',
            providesTags: ['Employee']
        }),
        getEmployee: builder.query({
            query: employeeId => `/employee/detail/${employeeId}`
        }),
        addNewEmployee: builder.mutation({
            query: initialEmployee => ({
                url: '/employee',
                method: 'POST',
                body: initialEmployee
            }),
            invalidatesTags: ['Employee']
        })
    })
})

export const { useGetEmployeesQuery, useGetEmployeeQuery, useAddNewEmployeeMutation } = employeeSlice
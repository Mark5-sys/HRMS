import { apiSlice } from "./apiSlice";

export const employeeSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getEmployees: builder.query({
            query: () => '/employee'
        }),
        getEmployee: builder.query({
            query: employeeId => `/employee/detail/${employeeId}`
        }),
        addNewEmployee: builder.mutation({
            query: initialEmployee => ({
                url: '/employee',
                method: 'POST',
                body: initialEmployee
            })
        })
    })
})

export const { useGetEmployeesQuery, useGetEmployeeQuery } = employeeSlice
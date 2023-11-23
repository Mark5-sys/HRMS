import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";

const employeeAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.created_at.localeCompare(a.created_at),
});

const initialState = employeeAdapter.getInitialState();

export const employeeSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getEmployees: builder.query({
      query: () => "/employee",
      transformResponse: (responseData) => {
        const loadedEmployees = responseData.data;
        return employeeAdapter.setAll(initialState, loadedEmployees);
      },
      providesTags: (result, error, arg) => [
        { type: "Employee", id: "LIST" },
        ...result.ids.map((id) => ({ type: "Employee", id: id })),
      ],
    }),

    getEmployee: builder.query({
      query: (employeeId) => `/employee/detail/${employeeId}`,
      invalidatesTags: ["Employee"],
    }),

    addNewEmployee: builder.mutation({
      query: (initialEmployee) => ({
        url: "/employee",
        method: "POST",
        body: initialEmployee,
      }),
      invalidatesTags: ["Employee"],
    }),

    updateEmployee: builder.mutation({
      query: ({ employeeId, updatedEmployee }) => ({
        url: `/employee/${employeeId}`,
        method: "PATCH",
        body: updatedEmployee,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Employee", id: arg.employeeId },
      ],
    }),
  }),
});

export const {
  useGetEmployeesQuery,
  useGetEmployeeQuery,
  useAddNewEmployeeMutation,
  useUpdateEmployeeMutation,
} = employeeSlice;

// export const employeeSlice = apiSlice.injectEndpoints({
//   endpoints: (builder) => ({

// getEmployees: builder.query({
//   query: () => "/employee",
//   providesTags: ['Employee']
// }),

// getEmployee: builder.query({
//   query: (employeeId) => `/employee/detail/${employeeId}`,
//   invalidatesTags: (result, error, arg) => [
//     { type: "Employee", id: arg.employeeId },
//   ],
// }),
// addNewEmployee: builder.mutation({
//   query: (initialEmployee) => ({
//     url: "/employee",
//     method: "POST",
//     body: initialEmployee,
//   }),
//   invalidatesTags: ["Employee"],
// }),

// updateEmployee: builder.mutation({
//   query: ({ employeeId, updatedEmployee }) => ({
//     url: `/employee/${employeeId}`,
//     method: "PATCH",
//     body: updatedEmployee,
//   }),
//   invalidatesTags: (result, error, arg) => [
//     { type: "Employee", id: arg.employeeId },
//   ],
// }),
//   }),
// });

// export const {
//   useGetEmployeesQuery,
//   useGetEmployeeQuery,
// useAddNewEmployeeMutation,
// useUpdateEmployeeMutation,
// } = employeeSlice;

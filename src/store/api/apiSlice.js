import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { id } from "date-fns/locale";
import { API } from "../../config";

// const departmentsAdapter = createEntityAdapter()

// const initialState = departmentsAdapter.getInitialState()

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: API,
  }),
  tagTypes: ["Employee", "Position", "Department", "Trainee", "Role"],
  endpoints: (builder) => ({
    getDepartments: builder.query({
      query: () => "/department",
      providesTags: (result, error, arg) => [
        "Department",
        ...result.data.map(({ id }) => ({ type: "Department", id })),
      ],
    }),
    getDepartmentById: builder.query({
      query: (id) => `/department/${id}`,
      providesTags: (result, error, arg) => {
        console.log(result);
        return [...result.data.map((id) => ({ type: "Department", id }))];
      },
    }),
    addNewDepartment: builder.mutation({
      query: (initialDepartment) => ({
        url: "/department",
        method: "POST",
        body: initialDepartment,
      }),
      invalidatesTags: ["Department"],
    }),
    updateDepartment: builder.mutation({
      query: (initialDepartment) => ({
        url: `/department/${initialDepartment.id}`,
        method: "PATCH",
        body: initialDepartment,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Department", id: arg.id },
      ],
    }),
    deleteDepartment: builder.mutation({
      query: ({ id }) => ({
        url: `/department/${id}`,
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Department", id: arg.id },
      ],
    }),
    getPositions: builder.query({
      query: () => "/position",
      providesTags: ["Position"],
    }),
    getPosition: builder.query({
      query: (positionId) => `/position/${positionId}`,
    }),
    editPosition: builder.mutation({
      query: (position) => ({
        url: `/position/${position.id}`,
        method: "PATCH",
        body: position,
      }),
      invalidatesTags: ["Position"],
    }),
  }),
});

export const {
  useGetDepartmentsQuery,
  useGetDepartmentByIdQuery,
  useAddNewDepartmentMutation,
  useDeleteDepartmentMutation,
  useUpdateDepartmentMutation,
  useGetPositionsQuery,
  useGetPositionQuery,
  useEditPositionMutation,
} = apiSlice;

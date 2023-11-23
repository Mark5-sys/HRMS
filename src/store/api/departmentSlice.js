// import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
// import { apiSlice } from "./apiSlice";

// const departmentAdapter = createEntityAdapter({
//   sortComparer: (a, b) => b.created_at.localeCompare(a.created_at),
// });

// const initialState = departmentAdapter.getInitialState();

// export const departmentSlice = apiSlice.injectEndpoints({
//   endpoints: (builder) => ({
//     getDepartments: builder.query({
//       query: () => "/department",
//       transformResponse: (resonseData) => {
//         const loadedDepartments = resonseData.data;
//         return departmentAdapter.setAll(initialState, loadedDepartments);
//       },
//       prividesTags: (result, error, arg) => [
//         { type: "Department", id: "LIST" },
//         ...result.ids.map((id) => ({ type: "Department", id: id })),
//       ],
//     }),
//   }),
// });

// export const { useGetDepartmentsQuery } = departmentSlice;

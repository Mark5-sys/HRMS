import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";

const traineeAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.created_at.localeCompare(a.created_at),
});

const initialState = traineeAdapter.getInitialState();

export const traineeSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTrainees: builder.query({
      query: () => "/orientation",
      transformResponse: (responseData) => {
        const loadedTrainees = responseData.data;
        return traineeAdapter.setAll(initialState, loadedTrainees);
      },
      providesTags: (result, error, arg) => [
        { type: "Trainee", id: "LIST" },
        ...result.ids.map((id) => ({ type: "Trainee", id: id })),
      ],
    }),

    getTrainee: builder.query({
      query: (traineeId) => ``,
    }),
  }),
});

export const { useGetTraineesQuery, useGetTraineeQuery } = traineeSlice;

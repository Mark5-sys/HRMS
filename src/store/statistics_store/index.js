import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  employeesCount: 0,
};

const statisticsSlice = createSlice({
  name: "statistics",
  initialState,
  reducers: {
    setEmployeesCount: (state, action) => {
      state.employeesCount = action.payload.employeesCount;
    },
  },
});


export const statisticsActions = statisticsSlice.actions;

export default statisticsSlice

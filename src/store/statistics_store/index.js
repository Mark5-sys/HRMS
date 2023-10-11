import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  employeesCount: 0,
  genderStatistics: [],
  maritalStatusStatistics: [],
  employeeByDepartmentStatistics: [],
  ageStatistics: [],
};

const statisticsSlice = createSlice({
  name: "statistics",
  initialState,
  reducers: {
    setEmployeesCount: (state, action) => {
      state.employeesCount = action.payload.employeesCount;
    },

    setGenderStatistics: (state, action) => {
      state.genderStatistics = action.payload.genderStatistics;
    },

    setMaritalStatusStatistics: (state, action) => {
      state.maritalStatusStatistics = action.payload.maritalStatusStatistics;
    },

    setEmployeeDepartmentStatistics: (state, action) => {
      state.employeeByDepartmentStatistics =
        action.payload.employeeByDepartmentStatistics;
    },

    setAgeStatistics: (state, action) => {
      state.ageStatistics = action.payload.ageStatistics;
    },
  },
});

export const statisticsActions = statisticsSlice.actions;

export default statisticsSlice;

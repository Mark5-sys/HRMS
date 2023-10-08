import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  departments: [],
  error: "",
  isLoading: false,
  departmentEdit: {},
};

const departmentSlice = createSlice({
  name: "department",
  initialState,
  reducers: {
    setDepartments: (state, action) => {
      state.departments = action.payload.departments;
      state.isLoading = false;
      state.error = "";
    },

    setDepartmentEdit: (state, action) => {
      state.departmentEdit = action.payload.departmentEdit;
    },
  },
});

export const departmentsActions = departmentSlice.actions;

export default departmentSlice;

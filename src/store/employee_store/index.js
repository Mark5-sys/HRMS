import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeEmployees: [],
  pendingEmployees: [],
  waitingEmployees: [],
  singleEmployee: {},
  isToggled: false,
  employeRoles: [],
};

const employeeSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {
    setActiveEmployees: (state, action) => {
      state.activeEmployees = action.payload.activeEmployees;
    },

    setPendingEmployees: (state, action) => {
      state.pendingEmployees = action.payload.pendingEmployees;
    },

    setWaitingEmployees: (state, action) => {
      state.waitingEmployees = action.payload.waitingEmployees;
    },

    setSingleEmployee: (state, action) => {
      state.singleEmployee = action.payload.singleEmployee;
    },

    toggleBoolean: (state) => {
      state.isToggled = !state.isToggled; // Toggle the boolean field
    },

    setEmployeeRoles: (state, action) => {
      state.employeRoles = action.payload.employeRoles;
    },

    clearState: (state) => {
      state.activeEmployees = [];
      state.pendingEmployees = [];
      state.waitingEmployees = [];
      state.singleEmployee = {};
    },
  },
});

export const employeesActions = employeeSlice.actions;

export default employeeSlice;

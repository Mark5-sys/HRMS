import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  leaveTypes: [],
  appliedLeaves: [],
};

const leaveSlice = createSlice({
  name: "leave",
  initialState,

  reducers: {
    setLeaveTypes: (state, action) => {
      state.leaveTypes = action.payload.leaveTypes;
    },

    setAppliedLeaves: (state, action) => {
      state.appliedLeaves = action.payload.appliedLeaves;
    },
  },
});

export const leavesActions = leaveSlice.actions;

export default leaveSlice;

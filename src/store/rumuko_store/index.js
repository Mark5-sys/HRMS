import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  rumukoSchedule: [],
};

const rumukoScheduleSlice = createSlice({
  name: "rumuko",
  initialState,
  reducers: {
    setRumukoSchedule: (state, action) => {
      state.rumukoSchedule = action.payload.rumukoSchedule;
    },

    clearState: (state) => {
      state.rumukoSchedule = [];
    },
  },
});


export const rumukoScheduleActions = rumukoScheduleSlice.actions;

export default rumukoScheduleSlice;

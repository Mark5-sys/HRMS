import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  positions: [],
};

const positionSlice = createSlice({
  name: "position",
  initialState,
  reducers: {
    setPositions: (state, action) => {
      state.positions = action.payload.positions;
    },
  },
});

export const positionsActions = positionSlice.actions;

export default positionSlice;

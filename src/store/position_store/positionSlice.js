import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  positions: [],
  position: {},
};

const positionSlice = createSlice({
  name: "position",
  initialState,
  reducers: {
    setPositions: (state, action) => {
      state.positions = action.payload.positions;
    },

    editPosition: (state, action) => {
      state.position = action.payload.position;
    },
  },
});

export const positionsActions = positionSlice.actions;
export const { setPositions, editPosition } = positionSlice.actions

export default positionSlice.reducer;

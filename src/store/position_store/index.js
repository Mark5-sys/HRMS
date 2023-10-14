import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  positions: [],
  positionEdit: {},
};

const positionSlice = createSlice({
  name: "position",
  initialState,
  reducers: {
    setPositions: (state, action) => {
      state.positions = action.payload.positions;
    },

    setPositionEdit: (state, action) => {
      state.positionEdit = action.payload.positionEdit;
    },
  },
});

export const positionsActions = positionSlice.actions;

export default positionSlice;

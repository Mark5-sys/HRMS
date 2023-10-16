import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orients: [],
  singleOrient: {},
  toBeDeployedOrientee: {},
};

const orientSlice = createSlice({
  name: "orientation",
  initialState,
  reducers: {
    setOrients: (state, action) => {
      state.orients = action.payload.orients;
    },

    setSingleSingleOrient: (state, action) => {
      state.singleOrient = action.payload.singleOrient;
    },

    setOrienteeToBeDeployed: (state, action) => {
      state.toBeDeployedOrientee = action.payload.toBeDeployedOrientee;
    },

    clearOrientState: (state) => {
      state.orients = [];
      state.singleOrient = {};
    },
  },
});

export const orientActions = orientSlice.actions;

export default orientSlice;

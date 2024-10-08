import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  error: "",
  isAuthenticated: false,
  role: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      (state.isAuthenticated = action.payload.isAuthenticated),
        (state.role = action.payload.user.role);
    },

    setLogout: (state, action) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.role = null;
    },

    
  },
});

export const authActions = authSlice.actions;

export default authSlice;

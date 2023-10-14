import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  companies: [],
  singleCompany: {},
  companyEdit: {},
};

const companySlice = createSlice({
  name: "company",
  initialState,

  reducers: {
    setCompanies: (state, action) => {
      state.companies = action.payload.companies;
    },

    setSingleCompany: (state, action) => {
      state.singleCompany = action.payload.singleCompany;
    },

    setEditCompany: (state, action) => {
      state.companyEdit = action.payload.companyEdit;
    },

    clearCompanyState: (state) => {
      (state.companies = []), (state.singleCompany = {});
    },
  },
});

export const companyActions = companySlice.actions;

export default companySlice;

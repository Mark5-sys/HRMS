import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import storage from "redux-persist/lib/storage";

import { PersistGate } from "redux-persist/integration/react";
import employeeSlice from "./employee_store";
import departmentSlice from "./department_store";
import positionSlice from "./position_store";
import authSlice from "./auth_store";
import statisticsSlice from "./statistics_store";
import orientSlice from "./orients_store";
import companySlice from "./companies_store";
import rumukoScheduleSlice from "./rumuko_store";
import leaveSlice from "./leave_store";
import { apiSlice } from "./api/apiSlice";

const persistConfig = {
  key: "root",
  storage,
  version: 1,
};

const rootReducer = combineReducers({
  employees: employeeSlice.reducer,
  department: departmentSlice.reducer,
  position: positionSlice.reducer,
  auth: authSlice.reducer,
  statistics: statisticsSlice.reducer,
  orientation: orientSlice.reducer,
  company: companySlice.reducer,
  rumuko: rumukoScheduleSlice.reducer,
  leave: leaveSlice.reducer,
  [apiSlice.reducerPath]: apiSlice.reducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(apiSlice.middleware),
});

export default store;

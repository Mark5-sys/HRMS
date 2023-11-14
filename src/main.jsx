import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import store from "./store";
import { apiSlice } from "./store/api/apiSlice.js";

// store.dispatch(apiSlice.endpoints.getDepartments.initiate())

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistStore(store)}></PersistGate>
    <App />
  </Provider>
);

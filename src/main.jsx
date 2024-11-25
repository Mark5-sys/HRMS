import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import store from "./store";
import { apiSlice } from "./store/api/apiSlice.js";
import { QueryClient, QueryClientProvider } from "react-query";

// store.dispatch(apiSlice.endpoints.getDepartments.initiate())
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistStore(store)}></PersistGate>
      <App />
    </Provider>
  </QueryClientProvider>
);

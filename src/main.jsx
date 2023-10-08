import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import store from './store';

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <React.StrictMode>
        <PersistGate
          loading={null}
          persistor={persistStore(store)}
        ></PersistGate>
        <App />
      </React.StrictMode>
    </Provider>
  </React.StrictMode>
);

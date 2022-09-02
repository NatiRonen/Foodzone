import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import reportWebVitals from "./reportWebVitals";
//redux packages
import { Provider } from "react-redux";
import store from "./redux/store";
import persistStore from "redux-persist/es/persistStore";
import { PersistGate } from "redux-persist/integration/react";

import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import { DarkModeContextProvider } from "./admin-dashboard/context/darkModeContext";
const persistedStore = persistStore(store);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistedStore}>
      <ToastContainer position={"top-center"} />
      <DarkModeContextProvider>
        <App />
      </DarkModeContextProvider>
    </PersistGate>
  </Provider>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

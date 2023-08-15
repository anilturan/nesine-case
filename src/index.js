import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BasketProvider } from "./context/BasketContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BasketProvider>
      <App />
    </BasketProvider>
  </React.StrictMode>
);

reportWebVitals();

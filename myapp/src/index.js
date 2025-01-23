import React from "react";
import ReactDOM from "react-dom/client"; // Updated import
import { BrowserRouter } from "react-router-dom"; // For routing
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root")); // Use createRoot
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

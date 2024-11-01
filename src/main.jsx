import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import React from "react";
import { AuthProvider } from "./context/AuthContext";

import { BrowserRouter as Router } from "react-router-dom";
const rootElement = document.getElementById("root");

if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <Router>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Router>
  );
}

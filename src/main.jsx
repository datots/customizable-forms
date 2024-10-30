import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import React from "react";
import { AuthProvider } from "./context/AuthContext";
const rootElement = document.getElementById("root");

if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}

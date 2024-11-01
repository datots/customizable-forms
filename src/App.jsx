import React from "react";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Login from "./components/Authentication/Login.jsx";
import Register from "./components/Authentication/Registration";
import CreatorDashboard from "./components/Template Creator/CreatorDashboard.jsx";
import AdminDashboard from "./components/Admin/AdminDashboard";
import NotFound from "./components/NotFound";
import PrivateRoute from "./components/routes/PrivateRoute.jsx";
import TemplateList from "./components/non-authenticated users/TemplateList.jsx";
function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/template" element={<TemplateList />} />
        <Route
          path="/creatordashboard"
          element={
            <PrivateRoute allowedRoles={["template_creator"]}>
              <CreatorDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <AdminDashboard />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;

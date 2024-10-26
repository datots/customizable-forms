import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./components/contexts/AuthContext.jsx";
import AdminDashboard from "./components/Admin/AdminDashboard.jsx";
import UserManagement from "./components/Admin/UserManagement.jsx";
import PrivateRoute from "./components/routes/PrivateRoute.jsx";
import Login from "./components/Auth/Login.jsx";
import Register from "./components/Auth/Register.jsx";
import UserDashboard from "./components/User/UserDashboard.jsx";
import React from "react";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/registration" element={<Register />} />
          <Route
            path="/admin/admindashboard"
            element={
              <PrivateRoute requiredRole="admin">
                <AdminDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/user-management"
            element={
              <PrivateRoute requiredRole="admin">
                <UserManagement />
              </PrivateRoute>
            }
          />
          <Route
            path="/user/dashboard"
            element={
              <PrivateRoute requiredRole="user">
                <UserDashboard />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;

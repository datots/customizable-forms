// AdminDashboard.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserManagement from "./UserManagement";
import Analytics from "./Analytics";
import TemplateManagement from "./TemplateManagement"; // Import TemplateManagement

const AdminDashboard = () => {
  const [showAnalytics, setShowAnalytics] = useState(false);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4 text-center">Admin Dashboard</h1>
      <button
        onClick={logout}
        className="mb-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
      >
        Logout
      </button>
      <TemplateManagement /> {/* Render the TemplateManagement component */}
      <button
        onClick={() => setShowAnalytics((prev) => !prev)}
        className="mb-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        {showAnalytics ? "Hide Analytics" : "Show Analytics"}
      </button>
      {showAnalytics && <Analytics />}
      <h2 className="text-2xl font-bold mt-8 mb-4">User Management</h2>
      <UserManagement />
    </div>
  );
};

export default AdminDashboard;

import { Link } from "react-router-dom";
import React from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await auth.signOut();
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <button
        onClick={logout}
        className="bg-red-500 text-white px-4 py-2 rounded"
      >
        Log Out
      </button>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold">Total Users</h2>
          <p>120</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold">Active Templates</h2>
          <p>45</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold">Forms Submitted</h2>
          <p>300</p>
        </div>
      </div>
      <div className="mt-5">
        <Link
          to="/admin/users"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Manage Users
        </Link>
        <Link
          to="/admin/templates"
          className="bg-green-500 text-white px-4 py-2 ml-2 rounded"
        >
          Manage Templates
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;

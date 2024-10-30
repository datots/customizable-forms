import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import Pagination from "../Pagination";
import { FixedSizeList as List } from "react-window";
import { ThreeDots } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [actionLoading, setActionLoading] = useState(false);
  const navigate = useNavigate();

  const API_URL =
    import.meta.env.VITE_API_URL || "http://localhost:5000/api/user";

  const fetchUsers = async () => {
    const token = localStorage.getItem("token"); // Adjust the key according to your implementation
    if (!token) {
      console.error("No token found. User must be logged in.");
      navigate("/"); // Redirect to login if token is missing
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include token in header
        },
      });
      setUsers(response.data); // Assuming your API returns the user list directly
    } catch (error) {
      const errMsg = error.response
        ? error.response.data.message
        : "Failed to fetch users.";
      setError(errMsg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [API_URL]);

  const toggleUserStatus = async (id, status) => {
    setActionLoading(true);
    const updatedStatus = !status;

    // Optimistically update the UI
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user._id === id ? { ...user, blocked: updatedStatus } : user
      )
    );

    try {
      await axios.put(`${API_URL}/${id}/block`, { blocked: updatedStatus });
      setSuccessMessage(
        `User ${updatedStatus ? "blocked" : "unblocked"} successfully!`
      );
    } catch (error) {
      const errMsg = error.response
        ? error.response.data.message
        : "Failed to change user status.";
      setErrorMessage(errMsg);
      // Revert optimistic update if the API call fails
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === id ? { ...user, blocked: status } : user
        )
      );
    } finally {
      setActionLoading(false);
      setTimeout(() => setSuccessMessage(""), 3000);
    }
  };

  const deleteUser = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setActionLoading(true);
      try {
        await axios.delete(`${API_URL}/${id}`);
        setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
        setSuccessMessage("User deleted successfully!");
      } catch (error) {
        const errMsg = error.response
          ? error.response.data.message
          : "Failed to delete user.";
        setErrorMessage(errMsg);
      } finally {
        setActionLoading(false);
        setTimeout(() => setSuccessMessage(""), 3000);
      }
    }
  };

  const changeUserRole = async (id, currentRole) => {
    setActionLoading(true);
    const newRole = currentRole === "admin" ? "user" : "admin";

    // Optimistically update the UI
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user._id === id ? { ...user, role: newRole } : user
      )
    );

    try {
      await axios.put(`${API_URL}/${id}/role`, { role: newRole });
      setSuccessMessage(`User role changed to ${newRole}!`);
    } catch (error) {
      const errMsg = error.response
        ? error.response.data.message
        : "Failed to change user role.";
      setErrorMessage(errMsg);
      // Revert optimistic update if the API call fails
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === id ? { ...user, role: currentRole } : user
        )
      );
    } finally {
      setActionLoading(false);
      setTimeout(() => setSuccessMessage(""), 3000);
    }
  };

  const logout = () => {
    // Clear user data from localStorage (or context)
    localStorage.removeItem("token"); // Adjust based on your storage strategy
    navigate("/"); // Redirect to the login page
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;

  const currentUsers = useMemo(
    () => users.slice(indexOfFirstUser, indexOfLastUser),
    [users, indexOfFirstUser, indexOfLastUser]
  );
  const totalPages = Math.ceil(users.length / usersPerPage);

  const Row = ({ index, style }) => {
    const user = currentUsers[index];
    return (
      <div
        style={style}
        className="border-b hover:bg-gray-100 transition-colors"
      >
        <div className="py-3 px-4 flex justify-between items-center">
          <div className="flex-1">
            {user.firstName} {user.lastName}
          </div>
          <div className="flex-1">{user.email}</div>
          <div className="flex-1">{user.role}</div>
          <div className="flex-1">{user.blocked ? "Blocked" : "Active"}</div>
          <div className="flex items-center">
            <button
              onClick={() => toggleUserStatus(user._id, user.blocked)}
              className="mr-2 text-blue-600 hover:underline"
            >
              {user.blocked ? "Unblock" : "Block"}
            </button>
            <button
              onClick={() => changeUserRole(user._id, user.role)}
              className="mr-2 text-green-600 hover:underline"
            >
              {user.role === "admin" ? "Demote to User" : "Promote to Admin"}
            </button>
            <button
              onClick={() => deleteUser(user._id)}
              className="text-red-600 hover:underline"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <ThreeDots
          height="100"
          width="100"
          color="#4fa94d"
          ariaLabel="loading"
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4 text-center">Admin Dashboard</h1>
      <button
        onClick={logout}
        className="mb-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
      >
        Logout
      </button>
      {successMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
          {successMessage}
        </div>
      )}
      {errorMessage && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
          {errorMessage}
        </div>
      )}
      <List height={400} itemCount={currentUsers.length} itemSize={50}>
        {Row}
      </List>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default AdminDashboard;

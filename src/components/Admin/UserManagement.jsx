// src/components/UserManagement.jsx
import React, { useEffect, useState } from "react";
import { FixedSizeList as List } from "react-window";
import { ThreeDots } from "react-loader-spinner";

import {
  fetchUsers,
  deleteUser,
  blockUser,
  changeUserRole,
} from "../api/api.js";
import Pagination from "../Pagination";
import PromotionOptions from "./PromotionOptions"; // Import the new component

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  const fetchAllUsers = async () => {
    try {
      setLoading(true);
      const userList = await fetchUsers();
      setUsers(userList);
    } catch (err) {
      setError(err.message || "Failed to fetch users.");
      console.error("Fetch Users Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const handleUserPermissionChange = async (userId, permission) => {
    try {
      if (permission === "block") {
        await blockUser(userId);
        setSuccessMessage("User blocked successfully!");
      } else {
        await changeUserRole(userId, permission);
        setSuccessMessage(
          `User ${permission === "admin" ? "promoted to admin" : "Promoted to Template Creator"} successfully!`
        );
      }
      fetchAllUsers(); // Refresh user list
    } catch (err) {
      setErrorMessage(err.message || "Failed to update user permissions.");
      console.error("Permission Change Error:", err);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteUser(userId);
        setSuccessMessage("User deleted successfully!");
        fetchAllUsers(); // Refresh user list
      } catch (err) {
        setErrorMessage(err.message || "Failed to delete user.");
        console.error("Delete User Error:", err);
      }
    }
  };

  const Row = ({ index, style }) => {
    const user = users[index];
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
          <div className="flex items-center">
            <PromotionOptions
              userId={user._id}
              onPromote={handleUserPermissionChange}
            />
            <button
              onClick={() =>
                handleUserPermissionChange(
                  user._id,
                  user.blocked ? "unblock" : "block"
                )
              }
              className="mr-2 text-blue-600 hover:underline"
            >
              {user.blocked ? "Unblock" : "Block"}
            </button>
            <button
              onClick={() =>
                handleUserPermissionChange(
                  user._id,
                  user.role === "admin" ? "user" : "admin"
                )
              }
              className="mr-2 text-green-600 hover:underline"
            >
              {user.role === "admin" ? "Demote to User" : "Promote to Admin"}
            </button>
            <button
              onClick={() => handleDeleteUser(user._id)}
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
    <div>
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
      <List height={400} itemCount={users.length} itemSize={50}>
        {Row}
      </List>
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(users.length / usersPerPage)}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default UserManagement;

// SpecifyUserAccess.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

const SpecifyUserAccess = () => {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/api/user"); // Replace with your API endpoint
        // Ensure response.data is an array
        if (Array.isArray(response.data)) {
          setUsers(response.data);
        } else {
          console.error("Expected an array but received:", response.data);
          setUsers([]); // Reset to an empty array if data is not as expected
        }
      } catch (error) {
        console.error("Error fetching users:", error);
        setUsers([]); // Reset to an empty array on error
      }
    };

    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/user/${selectedUserId}/role`, { role });
      alert("User role updated successfully!");
    } catch (error) {
      console.error("Error updating user role:", error);
      alert("Failed to update user role.");
    }
  };

  return (
    <div>
      <h2>Specify User Access</h2>
      <form onSubmit={handleSubmit}>
        <select
          value={selectedUserId}
          onChange={(e) => setSelectedUserId(e.target.value)}
        >
          <option value="">Select a user</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>

        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="">Select role</option>
          <option value="admin">Admin</option>
          <option value="user">User</option>
          <option value="template_creator">Template Creator</option>
        </select>

        <button type="submit" disabled={!selectedUserId || !role}>
          Update Role
        </button>
      </form>
    </div>
  );
};

export default SpecifyUserAccess;

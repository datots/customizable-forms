import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

const UserDashboard = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token"); // Assume you store JWT token in local storage
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("/api/user/dashboard", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Failed to fetch user data. Please try again later.");
      }
    };

    fetchUserData();
  }, [token]); // Keeping token here allows re-fetching if the token changes

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token from local storage
    navigate("/"); // Redirect to login page
  };

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="dashboard p-4">
      <h1 className="text-2xl font-bold">User Dashboard</h1>
      <button
        onClick={handleLogout}
        className="mb-4 px-4 py-2 bg-red-600 text-white font-bold rounded hover:bg-red-700"
      >
        Logout
      </button>
      {/* Display user data */}
      <div>
        <p>Name: {userData.name}</p>
        <p>Email: {userData.email}</p>
        {/* Add other user details as needed */}
      </div>
    </div>
  );
};

export default UserDashboard;

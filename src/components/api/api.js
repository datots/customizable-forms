// api.js
import axios from "axios";

// Create an Axios instance with a base URL
const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_BASE_URL ||
    "https://gforms-replica-backend-lr9b.vercel.app/api", // Fallback to local server if not defined
});

// Interceptor for request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Retrieve token from local storage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Attach token to headers
    }
    return config;
  },
  (error) => {
    console.error("Request error:", error); // Log the error for debugging
    return Promise.reject(error);
  }
);

// Interceptor for response
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Enhanced error handling
    if (error.response) {
      console.error(
        `API error (status ${error.response.status}):`,
        error.response.data
      );
      return Promise.reject(error.response.data);
    } else {
      console.error("Network/API error:", error.message || "Unknown error");
      return Promise.reject({ message: "An unexpected error occurred." });
    }
  }
);

// Utility function for error handling
const handleError = (error) => {
  if (error.response) {
    console.error(
      `Error Status: ${error.response.status}`,
      error.response.data
    );
    return error.response.data;
  } else {
    console.error("Error Message:", error.message);
    return { message: "An unexpected error occurred." };
  }
};

// API methods for authentication
export const registerUser = async (userData) => {
  try {
    const response = await api.post("/auth/register", userData);
    console.log("Registration successful:", response.data);
    return response.data; // Return the data from the response
  } catch (error) {
    throw handleError(error); // Centralized error handling
  }
};

export const loginUser = async (userData) => {
  try {
    const response = await api.post("/auth/login", userData);
    console.log("Login successful:", response.data);
    return response.data; // Return the data from the response
  } catch (error) {
    throw handleError(error); // Centralized error handling
  }
};

export const fetchUserDashboard = async () => {
  try {
    const response = await api.get("/userdashboard");
    console.log("Dashboard data:", response.data);
    return response.data; // Return the data from the response
  } catch (error) {
    throw handleError(error); // Centralized error handling
  }
};

// API methods for user management
export const fetchUsers = async () => {
  try {
    const response = await api.get("/user");
    return response.data; // Return the data from the response
  } catch (error) {
    throw handleError(error); // Centralized error handling
  }
};

export const blockUser = async (id) => {
  try {
    const response = await api.put(`/user/${id}/block`);
    return response.data; // Return the data from the response
  } catch (error) {
    throw handleError(error); // Centralized error handling
  }
};

export const deleteUser = async (id) => {
  try {
    const response = await api.delete(`/user/${id}`);
    return response.data; // Return the data from the response
  } catch (error) {
    throw handleError(error); // Centralized error handling
  }
};

// New function to change user role
export const changeUserRole = async (id, role) => {
  try {
    const response = await api.put(`/user/${id}/role`, { role });
    console.log("User role changed successfully:", response.data);
    return response.data; // Return the data from the response
  } catch (error) {
    throw handleError(error); // Centralized error handling
  }
};

// Debugging tip: Verify the base URL
console.log(
  "API Base URL:",
  import.meta.env.VITE_API_BASE_URL ||
    "https://gforms-replica-backend-lr9b.vercel.app/api"
);

// Export the Axios instance for use in other modules
export default api;

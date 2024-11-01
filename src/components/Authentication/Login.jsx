import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useAuth } from "../../context/AuthContext"; // Import useAuth for context
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Login = () => {
  const { setUser } = useAuth(); // Get setUser directly from context
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false); // Local loading state

  const handleLogin = async (values) => {
    setIsLoading(true); // Start loading state
    try {
      const response = await axios.post(
        "https://vercel.com/datotshotmailcoms-projects/gforms-replica-backend-lr9b/api/auth/login",
        values
      );

      // Log the response for debugging
      console.log("Server Response:", response);

      // Check if the response contains the token
      if (response.data && response.data.token) {
        alert("Login successful!");

        const token = response.data.token;
        localStorage.setItem("token", token); // Store token in local storage

        // Decode token to get user info
        const decoded = jwtDecode(token);
        console.log("Decoded Token:", decoded); // Log the decoded token for debugging

        setUser(decoded); // Update user state in context

        const userRole = decoded.role;

        // Redirect based on user role
        if (userRole === "admin") {
          console.log("Redirecting to admin dashboard");
          navigate("/admin");
        } else if (userRole === "template_creator") {
          console.log("Redirecting to creator dashboard");
          navigate("/creatordashboard");
        }
      } else {
        navigate("/");
        throw new Error("Invalid response from server: No token found");
      }
    } catch (error) {
      // Improved error handling
      const errorMessage =
        error.response?.data?.message ||
        error.message || // Include generic error message if none exists
        "Login failed. Please try again.";

      alert(errorMessage);
    } finally {
      setIsLoading(false); // End loading state
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-80">
        <h2 className="text-center text-2xl font-bold">Login</h2>
        {isLoading && (
          <div className="flex justify-center items-center mb-4">
            <div className="loader">Loading...</div>
          </div>
        )}
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={Yup.object({
            email: Yup.string()
              .email("Invalid email format")
              .required("Email is required"),
            password: Yup.string().required("Password is required"),
          })}
          onSubmit={handleLogin}
        >
          <Form>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <Field
                name="email"
                type="email"
                className="border rounded p-2 w-full"
                disabled={isLoading}
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <Field
                name="password"
                type="password"
                className="border rounded p-2 w-full"
                disabled={isLoading}
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded w-full"
              disabled={isLoading}
            >
              Login
            </button>
          </Form>
        </Formik>
        <p className="mt-4 text-center">
          Don't have an account?
          <a href="/register" className="text-blue-500">
            {" "}
            Register
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;

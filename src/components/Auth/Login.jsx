import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import firebaseService from "../../services/firebaseService";
import { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      setLoading(true);
      setError(null);
      try {
        const userCredential = await firebaseService.signIn(
          values.email,
          values.password
        );
        const user = userCredential.user;

        // Fetch user document to check the admin status
        const userData = await firebaseService.getUserData(user.uid);
        const isAdmin = userData?.isAdmin;

        if (isAdmin) {
          navigate("/admin/dashboard"); // Redirect to admin dashboard
        } else {
          navigate("/user/dashboard"); // Redirect to user dashboard
        }
      } catch (error) {
        console.error("Login failed:", error);
        setError("Login failed: " + error.message);
      } finally {
        setLoading(false);
      }
    },
  });

  const handleReset = () => {
    navigate("/reset");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#ff7e5f] to-[#feb47b]">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-semibold text-center text-gray-800">
          Welcome Back
        </h1>
        <form onSubmit={formik.handleSubmit} className="mt-6 space-y-4">
          {error && <div className="text-red-600 text-center">{error}</div>}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ff7e5f]"
              value={formik.values.email}
              onChange={formik.handleChange}
              required
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ff7e5f]"
              value={formik.values.password}
              onChange={formik.handleChange}
              required
              placeholder="Enter your password"
            />
          </div>

          <div className="flex justify-between mt-4">
            <button
              type="submit"
              className="w-full p-2 text-white bg-[#ff7e5f] rounded-md hover:bg-[#feb47b] transition disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="text-[#ff7e5f] hover:underline"
            >
              Forgot Password?
            </button>
          </div>
          <div className="mt-4 text-center">
            <Link to="/registration" className="text-[#ff7e5f] hover:underline">
              Create Account
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

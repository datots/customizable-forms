import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

const Register = () => {
  const handleRegister = async (values) => {
    try {
      const response = await axios.post(
        "https://vercel.com/datotshotmailcoms-projects/gforms-replica-backend-lr9b/api/auth/register",
        values
      );
      alert(response.data.message);
      window.close(); // Close the registration tab
      window.open("/", "_self"); // Redirect to login page
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-80">
        <h2 className="text-center text-2xl font-bold">Register</h2>
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={Yup.object({
            firstName: Yup.string().required("First name is required"),
            lastName: Yup.string().required("Last name is required"),
            email: Yup.string()
              .email("Invalid email format")
              .required("Email is required"),
            password: Yup.string()
              .required("Password is required")
              .min(8, "Password must be at least 8 characters long")
              .matches(
                /[a-z]/,
                "Password must contain at least one lowercase letter"
              )
              .matches(
                /[A-Z]/,
                "Password must contain at least one uppercase letter"
              )
              .matches(/\d/, "Password must contain at least one digit")
              .matches(
                /[!@#$%^&*]/,
                "Password must contain at least one special character"
              ),
            confirmPassword: Yup.string()
              .oneOf([Yup.ref("password"), null], "Passwords must match")
              .required("Confirm Password is required"),
          })}
          onSubmit={handleRegister}
        >
          <Form>
            {/* Form Fields */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <Field name="firstName" className="border rounded p-2 w-full" />
              <ErrorMessage
                name="firstName"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <Field name="lastName" className="border rounded p-2 w-full" />
              <ErrorMessage
                name="lastName"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <Field
                name="email"
                type="email"
                className="border rounded p-2 w-full"
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
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <Field
                name="confirmPassword"
                type="password"
                className="border rounded p-2 w-full"
              />
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded w-full"
            >
              Register
            </button>
          </Form>
        </Formik>
        <p className="mt-4 text-center">
          Already have an account?{" "}
          <a href="/login" className="text-blue-500">
            Login
          </a>
        </p>
        {/* Back to Login Button */}
        <div className="mt-2 text-center">
          <button
            onClick={() => (window.location.href = "/")}
            className="text-blue-500 underline"
          >
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;

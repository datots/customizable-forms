import React, { useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { auth, firestore, storage } from "../../services/Firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc, collection, getDocs } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import { useDropzone } from "react-dropzone";

const RegisterForm = () => {
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [photo, setPhoto] = useState(null);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
      firstName: Yup.string().required("First name is required"),
      lastName: Yup.string().required("Last name is required"),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      setSuccessMessage("");
      setErrorMessage("");

      try {
        // Create user in Firebase Auth
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          values.email,
          values.password
        );
        const user = userCredential.user;

        // Handle photo upload if there's one
        let photoUrl = "";
        if (photo) {
          const photoRef = ref(storage, `photos/${user.uid}/${photo.name}`);
          await uploadBytes(photoRef, photo);
          photoUrl = await getDownloadURL(photoRef);
        }

        // Check if this is the first user to determine role
        const isFirstUser = await checkIfFirstUser();

        // Set user data in Firestore
        const usersRef = doc(firestore, "users", user.uid);
        await setDoc(usersRef, {
          email: values.email,
          firstName: values.firstName,
          lastName: values.lastName,
          photoUrl: photoUrl,
          role: isFirstUser ? "admin" : "user", // Assign "admin" to the first user
        });

        setSuccessMessage("Registration successful!");
        alert("Registration complete");
        formik.resetForm();
        setPhoto(null);
        navigate("/login"); // Replace with your login route
      } catch (error) {
        console.error("Registration failed:", error);
        setErrorMessage("Registration failed: " + error.message);
      } finally {
        setLoading(false);
      }
    },
  });

  const onDrop = (acceptedFiles) => {
    setPhoto(acceptedFiles[0]);
  };

  const checkIfFirstUser = async () => {
    const usersCollection = await getDocs(collection(firestore, "users"));
    return usersCollection.empty;
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [], // Accept any image type
    },
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold text-center text-gray-700">
          Register
        </h1>
        {successMessage && (
          <div className="mb-4 text-green-600">{successMessage}</div>
        )}
        {errorMessage && (
          <div className="mb-4 text-red-500">{errorMessage}</div>
        )}
        <form onSubmit={formik.handleSubmit} className="mt-6 space-y-4">
          {/* Input Fields */}
          <div>
            <label className="block text-gray-700" htmlFor="firstName">
              First Name
            </label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.firstName}
              className={`mt-1 block w-full p-2 border rounded-md ${
                formik.errors.firstName && formik.touched.firstName
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />
            {formik.errors.firstName && formik.touched.firstName && (
              <div className="text-red-500">{formik.errors.firstName}</div>
            )}
          </div>

          <div>
            <label className="block text-gray-700" htmlFor="lastName">
              Last Name
            </label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.lastName}
              className={`mt-1 block w-full p-2 border rounded-md ${
                formik.errors.lastName && formik.touched.lastName
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />
            {formik.errors.lastName && formik.touched.lastName && (
              <div className="text-red-500">{formik.errors.lastName}</div>
            )}
          </div>

          <div>
            <label className="block text-gray-700" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              className={`mt-1 block w-full p-2 border rounded-md ${
                formik.errors.email && formik.touched.email
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />
            {formik.errors.email && formik.touched.email && (
              <div className="text-red-500">{formik.errors.email}</div>
            )}
          </div>

          <div>
            <label className="block text-gray-700" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              className={`mt-1 block w-full p-2 border rounded-md ${
                formik.errors.password && formik.touched.password
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />
            {formik.errors.password && formik.touched.password && (
              <div className="text-red-500">{formik.errors.password}</div>
            )}
          </div>

          {/* Dropzone for Image Upload */}
          <div className="mt-4">
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-md p-4 ${isDragActive ? "border-blue-500" : "border-gray-300"}`}
            >
              <input {...getInputProps()} />
              {isDragActive ? (
                <p className="text-gray-600">Drop the files here ...</p>
              ) : (
                <p className="text-gray-600">
                  Drag 'n' drop some files here, or click to select files
                </p>
              )}
              {photo && <p className="mt-2 text-gray-700">{photo.name}</p>}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full p-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;

import React, { useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { auth, firestore, storage } from "../../services/Firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc, collection, getDocs } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import ImageUploader from "react-images-upload";

const RegisterForm = () => {
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [photo, setPhoto] = useState([]);
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
        if (photo.length > 0) {
          const photoRef = ref(storage, `photos/${user.uid}/${photo[0].name}`);
          await uploadBytes(photoRef, photo[0]);
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
        setPhoto([]);
        navigate("/login"); // Replace with your login route
      } catch (error) {
        console.error("Registration failed:", error);
        setErrorMessage("Registration failed: " + error.message);
      } finally {
        setLoading(false);
      }
    },
  });

  const onDrop = (pictureFiles) => {
    setPhoto(pictureFiles);
  };

  const checkIfFirstUser = async () => {
    const usersCollection = await getDocs(collection(firestore, "users"));
    return usersCollection.empty;
  };

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
          {/* Form Fields */}
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

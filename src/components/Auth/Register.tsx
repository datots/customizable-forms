import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { auth, firestore, storage } from "../../firebase";
import { doc, setDoc, getDocs, collection } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";
// import admin from "firebase-admin";

const Register = () => {
  const [profilePictureFile, setProfilePictureFile] = useState<File | null>(
    null
  );
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Required"),
    firstname: Yup.string().required("First name is required"),
    lastname: Yup.string().required("Last name is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      firstname: "",
      lastname: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        // Create user
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          values.email,
          values.password
        );
        const user = userCredential.user;

        // Send email verification
        await sendEmailVerification(user);

        let profilePictureUrl = "";
        if (profilePictureFile) {
          const storageRef = ref(storage, `profilePictures/${user.uid}`);
          await uploadBytes(storageRef, profilePictureFile);
          profilePictureUrl = await getDownloadURL(storageRef);
        }

        // Check if it's the first user
        const userSnapshot = await getDocs(collection(firestore, "users"));
        const isFirstUser = userSnapshot.empty;
        const role = isFirstUser ? "admin" : "user";

        // Set user document in Firestore
        await setDoc(doc(firestore, "users", user.uid), {
          firstname: values.firstname,
          lastname: values.lastname,
          email: values.email,
          profilePictureUrl,
          role,
        });

        // Set custom claims in Firestore for the user's role
        await admin.auth().setCustomUserClaims(user.uid, { role });

        alert(
          "User registered successfully. Please check your email for verification."
        );
        navigate(role === "admin" ? "/admin/dashboard" : "/user/dashboard");
      } catch (error) {
        console.error("Error registering user:", error.message);
        alert(error.message);
      }
    },
  });

  const handleProfilePictureChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files) {
      setProfilePictureFile(event.target.files[0]);
    }
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <div>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          onChange={formik.handleChange}
          value={formik.values.email}
        />
        {formik.touched.email && formik.errors.email ? (
          <div style={{ color: "red" }}>{formik.errors.email}</div>
        ) : null}
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          onChange={formik.handleChange}
          value={formik.values.password}
        />
        {formik.touched.password && formik.errors.password ? (
          <div style={{ color: "red" }}>{formik.errors.password}</div>
        ) : null}
      </div>
      <div>
        <label htmlFor="firstname">First Name</label>
        <input
          type="text"
          name="firstname"
          onChange={formik.handleChange}
          value={formik.values.firstname}
        />
        {formik.touched.firstname && formik.errors.firstname ? (
          <div style={{ color: "red" }}>{formik.errors.firstname}</div>
        ) : null}
      </div>
      <div>
        <label htmlFor="lastname">Last Name</label>
        <input
          type="text"
          name="lastname"
          onChange={formik.handleChange}
          value={formik.values.lastname}
        />
        {formik.touched.lastname && formik.errors.lastname ? (
          <div style={{ color: "red" }}>{formik.errors.lastname}</div>
        ) : null}
      </div>
      <div>
        <label htmlFor="profilePicture">Profile Picture</label>
        <input
          type="file"
          name="profilePicture"
          accept="image/*"
          onChange={handleProfilePictureChange}
        />
      </div>
      <button type="submit" disabled={!formik.isValid || !formik.dirty}>
        Register
      </button>
    </form>
  );
};

export default Register;

// services/userService.js
import { auth } from "../services/Firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

// Register a new user
export const registerUser = async (email, password) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  return userCredential.user; // Returns the registered user
};

// Login a user
export const loginUser = async (email, password) => {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
  return userCredential.user; // Returns the logged-in user
};

// Logout the user
export const logoutUser = async () => {
  await signOut(auth);
};

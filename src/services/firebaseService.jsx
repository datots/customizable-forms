// src/services/firebaseService.js
import { auth, db } from "./Firebase";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

const firebaseService = {
  signIn: async (email, password) => {
    return await signInWithEmailAndPassword(auth, email, password);
  },

  signOut: async () => {
    return await signOut(auth);
  },

  getUserData: async (userId) => {
    const docRef = doc(db, "users", userId); // Adjust based on your Firestore structure
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? docSnap.data() : null;
  },
};

export default firebaseService;

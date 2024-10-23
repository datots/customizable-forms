import { getDocs, collection, doc, updateDoc } from "firebase/firestore";

import { db } from "../firebase";

export const getUsers = async () => {
  const userCollection = collection(db, "users");
  const userSnapshot = await getDocs(userCollection);
  const usersList = userSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return usersList;
};

export const updateUsersStatus = async (userId: string, isBlocked: boolean) => {
  const userRef = doc(db, "users", userId);
  await updateDoc(userRef, { isBlocked });
};

export const promoteUserToAdmin = async (userId: string) => {
  const userRef = doc(db, "users", userId);
  await updateDoc(userRef, { role: "admin" });
};

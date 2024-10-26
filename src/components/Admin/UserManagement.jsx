// UserManagement.jsx
import React, { useEffect, useState } from "react";
import { db } from "../../services/Firebase";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";

const UserManagement = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const userCollection = await getDocs(collection(db, "users"));
      setUsers(
        userCollection.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      );
    };

    fetchUsers();
  }, []);

  const toggleUser = async (userId, isBlocked) => {
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, { blocked: !isBlocked });
    setUsers(
      users.map((user) =>
        user.id === userId ? { ...user, blocked: !isBlocked } : user
      )
    );
  };

  return (
    <div>
      <h2 className="text-xl font-semibold">User Management</h2>
      <table className="min-w-full border-collapse">
        <thead>
          <tr>
            <th className="border">Email</th>
            <th className="border">Role</th>
            <th className="border">Status</th>
            <th className="border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="border">{user.email}</td>
              <td className="border">{user.role}</td>
              <td className="border">{user.blocked ? "Blocked" : "Active"}</td>
              <td className="border">
                <button onClick={() => toggleUser(user.id, user.blocked)}>
                  {user.blocked ? "Unblock" : "Block"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;

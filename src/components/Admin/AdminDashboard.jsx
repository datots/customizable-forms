// AdminDashboard.jsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../services/Firebase";
import { doc, getDoc } from "firebase/firestore";
import UserManagement from "./UserManagement";
import TemplateManagement from "./TemplateManagement";
import FormManagement from "./FormManagement";

const AdminDashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkUserRole = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDocRef = doc(db, "users", user.uid);
        try {
          const docSnapshot = await getDoc(userDocRef);
          if (docSnapshot.exists()) {
            const userData = docSnapshot.data();
            if (userData.role !== "admin") {
              navigate("/");
            }
          } else {
            navigate("/login");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          navigate("/login");
        }
      } else {
        navigate("/login");
      }
    };

    checkUserRole();
  }, [navigate]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <UserManagement />
      <TemplateManagement />
      <FormManagement />
    </div>
  );
};

export default AdminDashboard;

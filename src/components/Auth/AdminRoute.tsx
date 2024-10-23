import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { auth, firestore } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

const AdminRoute = () => {
  const [user, loading] = useAuthState(auth);
  const [isAdmin, setIsAdmin] = useState(false);
  const [roleLoading, setRoleLoading] = useState(true);

  useEffect(() => {
    const fetchUserRole = async () => {
      if (user) {
        const userDoc = await getDoc(doc(firestore, "users", user.uid));
        const userRole = userDoc.data()?.role;
        setIsAdmin(userRole === "admin");
      }
      setRoleLoading(false);
    };

    if (user) {
      fetchUserRole();
    } else {
      setRoleLoading(false);
    }
  }, [user]);

  if (loading || roleLoading) {
    return <div>Loading...</div>;
  }

  return isAdmin ? <Outlet /> : <Navigate to="/unauthorized" />;
};

export default AdminRoute;

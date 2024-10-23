import { Outlet, Navigate } from "react-router-dom";
import { auth } from "../../firebase";

const UserRoute = () => {
  const user = auth.currentUser;

  return user ? <Outlet /> : <Navigate to="/" />;
};

export default UserRoute;

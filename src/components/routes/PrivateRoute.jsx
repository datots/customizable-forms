//privateROute.jsx

import React from "react";
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem("token");

  // If no token, redirect to login
  if (!token) {
    return <Navigate to="/" replace />;
  }

  // Decode the token to get user role
  const decodedToken = JSON.parse(atob(token.split(".")[1]));
  const userRole = decodedToken.role;

  // If the user role is not in allowedRoles, redirect to login
  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
  allowedRoles: PropTypes.arrayOf(PropTypes.string),
};

export default PrivateRoute;

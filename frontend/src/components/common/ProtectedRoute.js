import React from "react";
import { Navigate } from "react-router-dom";

// Get user from localStorage
const getUser = () => {
  try {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  } catch {
    return null;
  }
};

// Protected route for admin-only access
export const AdminRoute = ({ children }) => {
  const user = getUser();
  
  // Not logged in - redirect to login
  if (!user) {
    return <Navigate to="/Login-Signup" replace />;
  }
  
  // Not admin - redirect to member dashboard
  if (user.role?.toLowerCase() !== "admin") {
    return <Navigate to="/ProfilePage" replace />;
  }
  
  return children;
};

// Protected route for member access (any logged-in user)
export const MemberRoute = ({ children }) => {
  const user = getUser();
  
  // Not logged in - redirect to login
  if (!user) {
    return <Navigate to="/Login-Signup" replace />;
  }
  
  return children;
};

export default AdminRoute;

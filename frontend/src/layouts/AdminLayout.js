import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../components/admin/Sidebar";
import PageContainer from "../components/common/PageContainer";
import { Box, CircularProgress } from "@mui/material";

const AdminLayout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is admin
    const userStr = localStorage.getItem("user");
    if (!userStr) {
      navigate("/Login-Signup");
      return;
    }

    try {
      const user = JSON.parse(userStr);
      const userRole = (user.role || "").trim();
      const isAdmin = userRole.toLowerCase() === "admin";
      
      console.log("🔍 AdminLayout check - user role:", userRole, "isAdmin:", isAdmin);
      
      if (!isAdmin) {
        // Not an admin, redirect to profile page
        console.log("❌ User is not admin, redirecting to ProfilePage");
        navigate("/ProfilePage");
      } else {
        console.log("✅ User is admin, allowing access to admin dashboard");
      }
    } catch (error) {
      console.error("Error parsing user data:", error);
      navigate("/Login-Signup");
    }
  }, [navigate]);

  // Check user role before rendering
  const userStr = localStorage.getItem("user");
  if (!userStr) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  try {
    const user = JSON.parse(userStr);
    const userRole = (user.role || "").trim();
    const isAdmin = userRole.toLowerCase() === "admin";
    
    if (!isAdmin) {
      console.log("❌ AdminLayout: User is not admin, showing loading (will redirect)");
      return (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
          <CircularProgress />
        </Box>
      );
    } else {
      console.log("✅ AdminLayout: User is admin, rendering admin dashboard");
    }
  } catch (error) {
    console.error("❌ AdminLayout: Error parsing user data:", error);
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <PageContainer sidebar={<Sidebar />}>
      <Outlet />
    </PageContainer>
  );
};

export default AdminLayout;


import {
  Box,
  Typography,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Button,
} from "@mui/material";
import {
  Dashboard,
  People,
  FitnessCenter,
  Receipt,
  Settings,
  Logout,
} from "@mui/icons-material";
import { NavLink, useNavigate } from "react-router-dom";

const menuItems = [
  { text: "Dashboard", icon: <Dashboard />, path: "/admin" },
  { text: "Users", icon: <People />, path: "/admin/users" },
  { text: "Workouts", icon: <FitnessCenter />, path: "/admin/workouts" },
  { text: "Settings", icon: <Settings />, path: "/admin/settings" },
];

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Call logout API endpoint
      await fetch("http://localhost:5000/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      
      // Clear localStorage
      localStorage.removeItem("user");
      
      console.log("✅ Logged out successfully");
      
      // Redirect to home page
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
      // Even if API call fails, clear local storage and redirect
      localStorage.removeItem("user");
      navigate("/");
    }
  };

  return (
    <Box 
      sx={{ 
        width: 260, 
        bgcolor: "#111827", 
        color: "#E5E7EB", 
        p: 3,
        height: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography
        variant="h4"
        sx={{ fontWeight: 900, color: "#477CD8", mb: 4 }}
      >
        FitVerse
      </Typography>

      <List sx={{ flexGrow: 1 }}>
        {menuItems.map((item) => (
          <ListItemButton
            key={item.text}
            component={NavLink}
            to={item.path}
            sx={{
              borderRadius: 2,
              mb: 1,
              "&.active": { bgcolor: "#1F2937" },
              "&:hover": { bgcolor: "#1F2937" },
            }}
          >
            <ListItemIcon sx={{ color: "#9CA3AF" }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItemButton>
        ))}
      </List>

      <Divider sx={{ my: 2, borderColor: "rgba(255,255,255,0.1)" }} />

      <Button
        onClick={handleLogout}
        startIcon={<Logout />}
        fullWidth
        variant="outlined"
        sx={{
          color: "#E5E7EB",
          borderColor: "rgba(255,255,255,0.2)",
          "&:hover": {
            borderColor: "#EF4444",
            bgcolor: "rgba(239, 68, 68, 0.1)",
            color: "#EF4444",
          },
        }}
      >
        Logout
      </Button>
    </Box>
  );
};

export default Sidebar;

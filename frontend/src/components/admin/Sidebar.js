import {
  Box,
  Typography,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  Dashboard,
  People,
  FitnessCenter,
  Receipt,
  Settings,
} from "@mui/icons-material";
import { NavLink } from "react-router-dom";

const menuItems = [
  { text: "Dashboard", icon: <Dashboard />, path: "/admin" },
  { text: "Users", icon: <People />, path: "/admin/users" },
  { text: "Workouts", icon: <FitnessCenter />, path: "/admin/workouts" },

  { text: "Settings", icon: <Settings />, path: "/admin/settings" },
];

const Sidebar = () => {
  return (
    <Box sx={{ width: 260, bgcolor: "#111827", color: "#E5E7EB", p: 3 }}>
      <Typography
        variant="h4"
        sx={{ fontWeight: 900, color: "#477CD8", mb: 4 }}
      >
        FitVerse
      </Typography>

      <List>
        {menuItems.map((item) => (
          <ListItemButton
            key={item.text}
            component={NavLink}
            to={item.path}
            sx={{
              borderRadius: 2,
              mb: 1,
              "&.active": { bgcolor: "#1F2937" },
            }}
          >
            <ListItemIcon sx={{ color: "#9CA3AF" }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
};

export default Sidebar;

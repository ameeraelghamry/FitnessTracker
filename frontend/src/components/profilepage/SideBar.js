import React from 'react';
import { Box, Typography, List, ListItem, ListItemIcon, ListItemText, Divider, Button } from '@mui/material';
import { Home, FitnessCenter, Person, Settings, Explore, AdminPanelSettings } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Get user role from localStorage
  const getUser = () => {
    try {
      const user = localStorage.getItem("user");
      return user ? JSON.parse(user) : null;
    } catch {
      return null;
    }
  };

  const user = getUser();
  const isAdmin = user?.role?.toLowerCase() === "admin";

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:5000/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      localStorage.removeItem("user");
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
      localStorage.removeItem("user");
      navigate("/");
    }
  };

  const menuItems = [
    { text: 'Discover', icon: <Explore />, path: '/' },
    { text: 'Routines', icon: <FitnessCenter />, path: '/routines' },
    { text: 'Exercises', icon: <FitnessCenter />, path: '/exercises' },
    { text: 'Profile', icon: <Person />, path: '/ProfilePage' },
    { text: 'Settings', icon: <Settings />, path: '/settings' },
    // Admin-only menu item
    ...(isAdmin ? [{ text: 'Admin Panel', icon: <AdminPanelSettings />, path: '/admin' }] : []),
  ];

  return (
    <Box
      sx={{
        width: '250px',
        height: '100vh',
        bgcolor: '#111827',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        px: 3,
        py: 4,
        borderRight: '1px dashed rgba(255, 255, 255, 0.1)',
      }}
    >
      <Typography
        variant="h3"
        sx={{
          color: '#477CD8',
          fontFamily: 'Inter, Poppins, sans-serif',  
          fontWeight: 900,                           
          fontSize: '2.2rem',                       
          textAlign: 'left',
          mb: 5,
          letterSpacing: '0.5px',                   
        }}
      >
        FitVerse
      </Typography>

      <List sx={{ flexGrow: 1 }}>
        {menuItems.map((item, index) => (
          <React.Fragment key={index}>
            <ListItem 
              button 
              onClick={() => item.path && navigate(item.path)}
              sx={{ 
                color: location.pathname === item.path ? '#477CD8' : '#E5E7EB', 
                borderRadius: 1,
                bgcolor: location.pathname === item.path ? 'rgba(71, 124, 216, 0.1)' : 'transparent',
                '&:hover': {
                  bgcolor: 'rgba(71, 124, 216, 0.1)',
                }
              }}
            >
              <ListItemIcon sx={{ color: location.pathname === item.path ? '#477CD8' : '#9CA3AF', minWidth: 36 }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
            <Divider sx={{ borderColor: 'rgba(255,255,255,0.08)', my: 1 }} />
          </React.Fragment>
        ))}
      </List>

      <Button
        variant="contained"
        onClick={handleLogout}
        sx={{
          mt: 2,
          bgcolor: '#477CD8',
          textTransform: 'none',
          fontWeight: 500,
          '&:hover': { bgcolor: '#3b6bbf' },
        }}
      >
        Log out
      </Button>
    </Box>
  );
};

export default Sidebar;

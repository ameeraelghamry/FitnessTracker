import React from 'react';
import { Box, Typography, List, ListItem, ListItemIcon, ListItemText, Divider, Button } from '@mui/material';
import { Home, FitnessCenter, Category, Settings, Notifications } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

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
      
      // Redirect to home page
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
      // Even if API call fails, clear local storage and redirect
      localStorage.removeItem("user");
      navigate("/");
    }
  };
  const menuItems = [
    { text: 'Discover', icon: <Home /> },
    { text: 'Progress', icon: <FitnessCenter /> },
    { text: 'Workouts', icon: <FitnessCenter /> },
    { text: 'Categories', icon: <Category /> },
    { text: 'Settings', icon: <Settings /> },
    { text: 'Notifications', icon: <Notifications /> },
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
      {/* Logo */}
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


      {/* Menu Items */}
      <List sx={{ flexGrow: 1 }}>
        {menuItems.map((item, index) => (
          <React.Fragment key={index}>
            <ListItem button sx={{ color: '#E5E7EB', borderRadius: 1 }}>
              <ListItemIcon sx={{ color: '#9CA3AF', minWidth: 36 }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
            <Divider sx={{ borderColor: 'rgba(255,255,255,0.08)', my: 1 }} />
          </React.Fragment>
        ))}
      </List>

      {/* Logout Button */}
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

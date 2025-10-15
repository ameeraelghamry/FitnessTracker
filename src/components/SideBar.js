import React from 'react';
import { Box, Typography, Button, List, ListItem, ListItemText, Divider } from '@mui/material';

const sidebarBg = 'rgba(12,16,24,0.91)';
const accentColor = '#477CD8';

const Sidebar = () => {
  return (
    <Box
      sx={{
        width: 250,
        height: '100vh',
        bgcolor: sidebarBg,
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        p: 2,
      }}
    >
      <Typography variant="h5" fontWeight="bold" sx={{ mb: 3, color: accentColor }}>
        FitVerse
      </Typography>

      <List sx={{ flexGrow: 1 }}>
        {['Discover', 'Progress', 'Workouts', 'Categories', 'Settings', 'Notifications'].map((text) => (
          <ListItem button key={text} sx={{ py: 1 }}>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>

      <Divider sx={{ bgcolor: 'rgba(255,255,255,0.2)', mb: 2 }} />

      <Button
        variant="contained"
        sx={{
          bgcolor: accentColor,
          color: 'white',
          textTransform: 'none',
          fontWeight: 'bold',
          '&:hover': { bgcolor: '#3569b8' },
        }}
      >
        Log out
      </Button>
    </Box>
  );
};

export default Sidebar;

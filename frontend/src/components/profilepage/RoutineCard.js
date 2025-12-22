import React, { useState } from 'react';
import { Card, CardContent, Typography, IconButton, Menu, MenuItem, Box } from '@mui/material';
import { MoreVert, FitnessCenter } from '@mui/icons-material';

const RoutineCard = ({ routine, onClick, onMenuClick }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (e) => {
    e.stopPropagation();
    setAnchorEl(e.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    handleMenuClose();
    onMenuClick(routine.id, 'delete');
  };

  const handleCardClick = () => {
    if (onClick) onClick(routine.id);
  };

  return (
    <Card
      onClick={handleCardClick}
      sx={{
        bgcolor: 'white',
        borderRadius: 2,
        p: 2,
        border: '1px solid #E5E7EB',
        transition: 'all 0.3s ease',
        cursor: 'pointer',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        '&:hover': {
          borderColor: '#667eea',
          boxShadow: '0 4px 12px rgba(102, 126, 234, 0.15)',
          transform: 'translateY(-2px)',
        },
      }}
    >
      <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography sx={{ color: '#1F2937', fontWeight: 600, fontSize: '1.1rem' }}>
            {routine.name}
          </Typography>
          {routine.exercise_count !== undefined && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.5 }}>
              <FitnessCenter sx={{ fontSize: 14, color: '#6B7280' }} />
              <Typography sx={{ color: '#6B7280', fontSize: '0.85rem' }}>
                {routine.exercise_count} exercises
              </Typography>
            </Box>
          )}
        </Box>
        <IconButton
          onClick={handleMenuOpen}
          sx={{
            color: '#6B7280',
            '&:hover': { 
              color: '#667eea',
              bgcolor: 'rgba(102, 126, 234, 0.1)',
            },
          }}
        >
          <MoreVert />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleDelete} sx={{ color: '#ef4444' }}>
            Delete
          </MenuItem>
        </Menu>
      </CardContent>
    </Card>
  );
};

export default RoutineCard;


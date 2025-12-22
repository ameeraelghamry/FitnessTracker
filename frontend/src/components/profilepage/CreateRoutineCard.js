import React from 'react';
import { Card, CardContent, Box, Typography } from '@mui/material';

const CreateRoutineCard = ({ onClick, icon, text }) => {
  return (
    <Card
      onClick={onClick}
      sx={{
        bgcolor: 'white',
        borderRadius: 2,
        p: 2,
        cursor: 'pointer',
        border: '2px solid #E5E7EB',
        transition: 'all 0.3s ease',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        '&:hover': {
          borderColor: '#667eea',
          boxShadow: '0 4px 12px rgba(102, 126, 234, 0.15)',
          transform: 'translateY(-2px)',
        },
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box
            sx={{
              color: '#667eea',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {icon}
          </Box>
          <Typography sx={{ color: '#1F2937', fontWeight: 600 }}>
            {text}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CreateRoutineCard;
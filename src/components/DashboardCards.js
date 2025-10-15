import React from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';
import { BarChart as BarChartIcon, FitnessCenter, Speed, CalendarToday } from '@mui/icons-material';

const DashboardCards = () => {
  const cards = [
    { title: 'Statistics', icon: <BarChartIcon />, color: '#667eea' },
    { title: 'Exercises', icon: <FitnessCenter />, color: '#764ba2' },
    { title: 'Measures', icon: <Speed />, color: '#f093fb' },
    { title: 'Calendar', icon: <CalendarToday />, color: '#4facfe' },
  ];

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h6" fontWeight="bold" color="white" sx={{ mb: 2 }}>
        Dashboard
      </Typography>
      <Grid container spacing={2}>
        {cards.map((card, idx) => (
          <Grid item xs={12} sm={6} md={3} key={idx}>
            <Paper
              sx={{
                p: 3,
                background: 'rgba(255,255,255,0.1)',
                backdropFilter: 'blur(10px)',
                borderRadius: 3,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                border: '1px solid rgba(255,255,255,0.1)',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 12px 24px rgba(0,0,0,0.2)',
                  background: `linear-gradient(135deg, ${card.color}40 0%, ${card.color}20 100%)`,
                },
              }}
            >
              <Box sx={{ color: card.color, mb: 1 }}>{card.icon}</Box>
              <Typography variant="h6" fontWeight="600" color="white">
                {card.title}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default DashboardCards;

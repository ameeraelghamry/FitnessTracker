import React from 'react';
import { Card, CardContent, Box, Avatar, Typography, Button, Grid, Paper } from '@mui/material';
import { FitnessCenter, CalendarToday, TrendingUp } from '@mui/icons-material';

const ProfileHeader = ({ user }) => {
  const stats = [
    { label: 'Workouts', value: '25', icon: <FitnessCenter /> },
    { label: 'Plans', value: '2', icon: <CalendarToday /> },
    { label: 'Progress', value: '5', icon: <TrendingUp /> },
  ];

  return (
    <Card
      sx={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        borderRadius: 4,
        boxShadow: '0 10px 40px rgba(102, 126, 234, 0.3)',
        mb: 3,
      }}
    >
      <CardContent sx={{ p: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3, flexWrap: 'wrap', gap: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            <Avatar
              sx={{
                width: 80,
                height: 80,
                border: '4px solid rgba(255,255,255,0.3)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
                bgcolor: 'rgba(255,255,255,0.2)',
                fontSize: '32px',
                fontWeight: 'bold',
              }}
            >
              {user.name.charAt(0).toUpperCase()}
            </Avatar>
            <Box>
              <Typography variant="h4" fontWeight="bold" sx={{ mb: 0.5 }}>
                {user.name}
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                Your profile is 80% finished
              </Typography>
            </Box>
          </Box>
          <Button
            variant="contained"
            sx={{
              bgcolor: 'rgba(255,255,255,0.2)',
              backdropFilter: 'blur(10px)',
              '&:hover': { bgcolor: 'rgba(255,255,255,0.3)' },
              borderRadius: 3,
              px: 3,
              textTransform: 'none',
              fontWeight: 600,
            }}
          >
            Edit Profile
          </Button>
        </Box>

        <Grid container spacing={3}>
          {stats.map((stat, idx) => (
            <Grid item xs={12} sm={4} key={idx}>
              <Paper
                sx={{
                  p: 3,
                  background: 'rgba(255,255,255,0.15)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: 3,
                  textAlign: 'center',
                  color: 'white',
                }}
              >
                <Box sx={{ mb: 1 }}>{stat.icon}</Box>
                <Typography variant="h4" fontWeight="bold">
                  {stat.value}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  {stat.label}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ProfileHeader;

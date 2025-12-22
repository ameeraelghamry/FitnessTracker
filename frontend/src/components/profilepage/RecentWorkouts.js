import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Card, CardContent, Chip } from '@mui/material';
import { FitnessCenter } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { fetchRoutines } from '../../services/routineService';

const RecentWorkouts = () => {
  const navigate = useNavigate();
  const [routines, setRoutines] = useState([]);

  useEffect(() => {
    loadRoutines();
  }, []);

  const loadRoutines = async () => {
    try {
      const data = await fetchRoutines();
      setRoutines(data.slice(0, 3)); // Show latest 3 routines
    } catch (err) {
      console.error('Failed to load routines:', err);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  return (
    <Box>
      <Typography variant="h6" fontWeight="bold" color="white" sx={{ mb: 2 }}>
        My Routines
      </Typography>
      
      {routines.length === 0 ? (
        <Card sx={{ 
          bgcolor: 'rgba(255,255,255,0.1)', 
          borderRadius: 3,
          p: 4,
          textAlign: 'center'
        }}>
          <Typography color="rgba(255,255,255,0.7)">
            No routines yet. Create your first routine!
          </Typography>
        </Card>
      ) : (
        <Grid container spacing={3}>
          {routines.map((routine) => (
            <Grid item xs={12} md={6} lg={4} key={routine.id}>
              <Card
                onClick={() => navigate(`/routines/${routine.id}`)}
                sx={{
                  bgcolor: 'rgba(255,255,255,0.1)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: 3,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  border: '1px solid rgba(255,255,255,0.1)',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 12px 24px rgba(0,0,0,0.2)',
                    bgcolor: 'rgba(255,255,255,0.15)',
                  },
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" fontWeight="bold" color="white" sx={{ mb: 1 }}>
                    {routine.name}
                  </Typography>
                  
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)', mb: 2 }}>
                    {formatDate(routine.created_at)}
                  </Typography>

                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    <Chip
                      icon={<FitnessCenter sx={{ color: 'white !important', fontSize: 16 }} />}
                      label={`${routine.exercise_count || 0} exercises`}
                      size="small"
                      sx={{
                        bgcolor: 'rgba(102, 126, 234, 0.3)',
                        color: 'white',
                        fontWeight: 500,
                      }}
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default RecentWorkouts;

import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import WorkoutCard from '../WorkoutCard';

const RecentWorkouts = ({ workouts }) => {
  return (
    <Box>
      <Typography variant="h6" fontWeight="bold" color="white" sx={{ mb: 2 }}>
        Recent Workouts
      </Typography>
      <Grid container spacing={3}>
        {workouts.map((workout, idx) => (
          <Grid item xs={12} md={6} lg={4} key={idx}>
            <WorkoutCard workout={workout} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default RecentWorkouts;

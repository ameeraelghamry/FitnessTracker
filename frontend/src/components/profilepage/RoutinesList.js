import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import RoutineCard from './RoutineCard';

const RoutinesList = ({ routines, onRoutineClick, onMenuClick }) => {
  return (
    <Box sx={{ mt: 4 }}>
      <Typography
        variant="h6"
        sx={{
          color: '#6B7280',
          mb: 3,
          fontWeight: 600,
        }}
      >
        My Routines ({routines.length})
      </Typography>
      <Grid container spacing={2}>
        {routines.map((routine) => (
          <Grid item xs={12} key={routine.id}>
            <RoutineCard
              routine={routine}
              onClick={onRoutineClick}
              onMenuClick={onMenuClick}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default RoutinesList;

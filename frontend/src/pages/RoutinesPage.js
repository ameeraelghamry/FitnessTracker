import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Grid, Typography, Snackbar, Alert } from '@mui/material';
import { Description } from '@mui/icons-material';
import CreateRoutineCard from '../components/profilepage/CreateRoutineCard';
import RoutinesList from '../components/profilepage/RoutinesList';
import CreateRoutineDialog from '../components/routines/CreateRoutineDialog';
import { fetchRoutines, createRoutine, deleteRoutine } from '../services/routineService';

const RoutinesPage = () => {
  const navigate = useNavigate();
  const [routines, setRoutines] = useState([]);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    loadRoutines();
  }, []);

  const loadRoutines = async () => {
    try {
      const data = await fetchRoutines();
      setRoutines(data);
    } catch (err) {
      showSnackbar('Failed to load routines', 'error');
    }
    setLoading(false);
  };

  const handleNewRoutine = () => {
    setCreateDialogOpen(true);
  };

  const handleSaveRoutine = async (routineData) => {
    try {
      await createRoutine(routineData);
      showSnackbar('Routine created successfully!', 'success');
      loadRoutines();
    } catch (err) {
      console.error("Create routine error:", err);
      showSnackbar(err.message || 'Failed to create routine', 'error');
    }
  };

  const handleDeleteRoutine = async (routineId) => {
    try {
      await deleteRoutine(routineId);
      showSnackbar('Routine deleted', 'success');
      loadRoutines();
    } catch (err) {
      showSnackbar('Failed to delete routine', 'error');
    }
  };

  const handleRoutineClick = (routineId) => {
    navigate(`/routines/${routineId}`);
  };

  const handleMenuClick = (routineId, action) => {
    if (action === 'delete') {
      handleDeleteRoutine(routineId);
    }
  };

  const showSnackbar = (message, severity) => {
    setSnackbar({ open: true, message, severity });
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: '#F9FAFB',
        p: 4,
      }}
    >
      <Typography 
        variant="h4" 
        sx={{ 
          color: '#1F2937', 
          fontWeight: 700, 
          mb: 4 
        }}
      >
        My Routines
      </Typography>

      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <CreateRoutineCard
            onClick={handleNewRoutine}
            icon={<Description sx={{ fontSize: 24 }} />}
            text="New Routine"
          />
        </Grid>
      </Grid>

      {loading ? (
        <Typography sx={{ color: '#6B7280' }}>Loading routines...</Typography>
      ) : (
        <RoutinesList
          routines={routines}
          onRoutineClick={handleRoutineClick}
          onMenuClick={handleMenuClick}
        />
      )}

      <CreateRoutineDialog
        open={createDialogOpen}
        onClose={() => setCreateDialogOpen(false)}
        onSave={handleSaveRoutine}
      />

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity} onClose={() => setSnackbar({ ...snackbar, open: false })}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default RoutinesPage;

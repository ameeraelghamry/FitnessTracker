import React, { useState } from 'react';
import { Box, Typography, Grid, Button } from '@mui/material';
import { Add } from '@mui/icons-material';
import Sidebar from '../components/profilepage/SideBar';
import CreateRoutineDialog from '../components/CreateRoutineDialog';
import RoutineCard from '../components/RoutineCard';

export default function RoutinesPage() {
  const [activeNav, setActiveNav] = useState('Routines');
  const [openDialog, setOpenDialog] = useState(false);
  const [routines, setRoutines] = useState([
    {
      id: 1,
      name: 'Push and Upper',
      exerciseCount: 8,
      isFolder: false,
      exercises: ['Bench Press', 'Shoulder Press', 'Tricep Dips', 'Cable Flyes'],
    },
    {
      id: 2,
      name: 'Leg Day',
      exerciseCount: 6,
      isFolder: false,
      exercises: ['Squats', 'Leg Press', 'Lunges'],
    },
  ]);

  const handleCreateRoutine = (name, isFolder) => {
    const newRoutine = {
      id: routines.length + 1,
      name,
      exerciseCount: 0,
      isFolder,
      exercises: [],
    };
    setRoutines([...routines, newRoutine]);
  };

  const handleDeleteRoutine = (id) => {
    setRoutines(routines.filter((r) => r.id !== id));
  };

  return (
    <Box display="flex" bgcolor="#0f172a" minHeight="100vh">
      <Sidebar activeNav={activeNav} setActiveNav={setActiveNav} />
      <Box flex={1} ml="260px" p={5}>
        <Typography variant="h4" fontWeight={700} color="#f8fafc" mb={1}>
          My Routines
        </Typography>
        <Typography variant="body1" color="#94a3b8" mb={4}>
          Create and manage your workout routines
        </Typography>

        <Box
          bgcolor="#1e293b"
          borderRadius={3}
          p={3}
          mb={5}
          display="flex"
          justifyContent="flex-start"
        >
          <Button
            startIcon={<Add />}
            onClick={() => setOpenDialog(true)}
            sx={{
              background: 'linear-gradient(to right, #3b82f6, #8b5cf6)',
              color: '#fff',
              fontWeight: 600,
              px: 3,
              '&:hover': { opacity: 0.9 },
            }}
          >
            Create Routine
          </Button>
        </Box>

        <Grid container spacing={3}>
          {routines.map((routine) => (
            <Grid item xs={12} sm={6} md={4} key={routine.id}>
              <RoutineCard routine={routine} onDelete={handleDeleteRoutine} />
            </Grid>
          ))}
        </Grid>

        <CreateRoutineDialog
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          onCreateRoutine={handleCreateRoutine}
        />
      </Box>
    </Box>
  );
}

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  TextField,
  IconButton,
  InputAdornment,
  CircularProgress,
  Snackbar,
  Alert
} from '@mui/material';
import { ArrowBack, Search, Add, Delete } from '@mui/icons-material';
import { fetchRoutineById, updateRoutine, fetchExercises, searchExercises } from '../services/routineService';

const EditRoutinePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [routine, setRoutine] = useState(null);
  const [name, setName] = useState('');
  const [selectedExercises, setSelectedExercises] = useState([]);
  const [availableExercises, setAvailableExercises] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    loadRoutine();
    loadExercises();
  }, [id]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery.trim()) {
        handleSearch(searchQuery);
      } else {
        loadExercises();
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const loadRoutine = async () => {
    try {
      const data = await fetchRoutineById(id);
      setRoutine(data);
      setName(data.name);
      setSelectedExercises(
        (data.exercises || []).map(ex => ({
          exerciseId: ex.exercise_id,
          name: ex.name,
          sets: ex.sets,
          reps: ex.reps,
          image_url: ex.image_url,
          muscle_group: ex.muscle_group
        }))
      );
    } catch (err) {
      console.error('Failed to load routine:', err);
    }
    setLoading(false);
  };

  const loadExercises = async () => {
    try {
      const exercises = await fetchExercises();
      setAvailableExercises(exercises || []);
    } catch (err) {
      console.error('Failed to load exercises:', err);
    }
  };

  const handleSearch = async (query) => {
    try {
      const exercises = await searchExercises(query);
      setAvailableExercises(exercises || []);
    } catch (err) {
      console.error('Search failed:', err);
    }
  };

  const addExercise = (exercise) => {
    if (!selectedExercises.find(e => e.exerciseId === exercise.id)) {
      setSelectedExercises([
        ...selectedExercises,
        {
          exerciseId: exercise.id,
          name: exercise.name,
          sets: 3,
          reps: 12,
          image_url: exercise.image_url,
          muscle_group: exercise.muscle_group
        }
      ]);
    }
  };

  const removeExercise = (exerciseId) => {
    setSelectedExercises(selectedExercises.filter(e => e.exerciseId !== exerciseId));
  };

  const updateSets = (exerciseId, sets) => {
    setSelectedExercises(selectedExercises.map(e =>
      e.exerciseId === exerciseId ? { ...e, sets: parseInt(sets) || 0 } : e
    ));
  };

  const updateReps = (exerciseId, reps) => {
    setSelectedExercises(selectedExercises.map(e =>
      e.exerciseId === exerciseId ? { ...e, reps: parseInt(reps) || 0 } : e
    ));
  };

  const handleSave = async () => {
    if (!name.trim()) return;
    setSaving(true);
    try {
      await updateRoutine(id, { name: name.trim(), exercises: selectedExercises });
      setSnackbar({ open: true, message: 'Routine saved!', severity: 'success' });
      setTimeout(() => navigate(`/routines/${id}`), 1000);
    } catch (err) {
      setSnackbar({ open: true, message: 'Failed to save', severity: 'error' });
    }
    setSaving(false);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f9fafb' }}>
      {/* Header */}
      <Box sx={{ 
        p: 2, 
        bgcolor: '#fff', 
        borderBottom: '1px solid #e5e7eb',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton onClick={() => navigate(`/routines/${id}`)}>
            <ArrowBack />
          </IconButton>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>Edit Routine</Typography>
        </Box>
        <Button
          variant="contained"
          onClick={handleSave}
          disabled={saving || !name.trim()}
          sx={{
            bgcolor: '#0ea5e9',
            '&:hover': { bgcolor: '#0284c7' },
            textTransform: 'none',
            fontWeight: 600
          }}
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </Button>
      </Box>

      <Box sx={{ maxWidth: 1200, mx: 'auto', p: 4, display: 'flex', gap: 4 }}>
        {/* Left - Search Exercises */}
        <Box sx={{ width: 350, flexShrink: 0 }}>
          <Typography sx={{ fontWeight: 600, mb: 2, color: '#374151' }}>
            Add Exercises
          </Typography>
          <TextField
            fullWidth
            size="small"
            placeholder="Search exercises..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search sx={{ color: '#9ca3af' }} />
                </InputAdornment>
              )
            }}
            sx={{ mb: 2 }}
          />
          <Box sx={{ maxHeight: 500, overflow: 'auto', bgcolor: '#fff', borderRadius: 2, border: '1px solid #e5e7eb' }}>
            {availableExercises.map((exercise) => (
              <Box
                key={exercise.id}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  p: 2,
                  borderBottom: '1px solid #f3f4f6',
                  cursor: 'pointer',
                  '&:hover': { bgcolor: '#f9fafb' }
                }}
                onClick={() => addExercise(exercise)}
              >
                <Box
                  component="img"
                  src={exercise.image_url || 'https://via.placeholder.com/40?text=Ex'}
                  alt={exercise.name}
                  sx={{ width: 40, height: 40, borderRadius: 1, objectFit: 'cover' }}
                />
                <Box sx={{ flex: 1 }}>
                  <Typography sx={{ fontWeight: 500, fontSize: '0.875rem' }}>{exercise.name}</Typography>
                  <Typography sx={{ color: '#6b7280', fontSize: '0.75rem' }}>{exercise.muscle_group}</Typography>
                </Box>
                <Add sx={{ color: '#0ea5e9' }} />
              </Box>
            ))}
          </Box>
        </Box>

        {/* Right - Current Routine */}
        <Box sx={{ flex: 1 }}>
          <TextField
            fullWidth
            label="Routine Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{ mb: 3, bgcolor: '#fff' }}
          />

          <Typography sx={{ fontWeight: 600, mb: 2, color: '#374151' }}>
            Exercises ({selectedExercises.length})
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {selectedExercises.length === 0 ? (
              <Box sx={{ 
                p: 4, 
                textAlign: 'center', 
                bgcolor: '#fff', 
                borderRadius: 2,
                border: '2px dashed #e5e7eb'
              }}>
                <Typography sx={{ color: '#9ca3af' }}>
                  Click exercises on the left to add them
                </Typography>
              </Box>
            ) : (
              selectedExercises.map((exercise, index) => (
                <Box
                  key={exercise.exerciseId}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    p: 2,
                    bgcolor: '#fff',
                    borderRadius: 2,
                    border: '1px solid #e5e7eb'
                  }}
                >
                  <Typography sx={{ color: '#9ca3af', fontWeight: 600, width: 24 }}>
                    {index + 1}
                  </Typography>
                  <Box
                    component="img"
                    src={exercise.image_url || 'https://via.placeholder.com/50?text=Ex'}
                    alt={exercise.name}
                    sx={{ width: 50, height: 50, borderRadius: 1, objectFit: 'cover' }}
                  />
                  <Box sx={{ flex: 1 }}>
                    <Typography sx={{ fontWeight: 600 }}>{exercise.name}</Typography>
                  </Box>
                  <TextField
                    size="small"
                    label="Sets"
                    type="number"
                    value={exercise.sets}
                    onChange={(e) => updateSets(exercise.exerciseId, e.target.value)}
                    sx={{ width: 80 }}
                    inputProps={{ min: 1 }}
                  />
                  <TextField
                    size="small"
                    label="Reps"
                    type="number"
                    value={exercise.reps}
                    onChange={(e) => updateReps(exercise.exerciseId, e.target.value)}
                    sx={{ width: 80 }}
                    inputProps={{ min: 1 }}
                  />
                  <IconButton onClick={() => removeExercise(exercise.exerciseId)} sx={{ color: '#ef4444' }}>
                    <Delete />
                  </IconButton>
                </Box>
              ))
            )}
          </Box>
        </Box>
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
      </Snackbar>
    </Box>
  );
};

export default EditRoutinePage;

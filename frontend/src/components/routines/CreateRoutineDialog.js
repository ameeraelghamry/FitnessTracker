import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Typography,
  InputAdornment,
  CircularProgress,
  Divider
} from "@mui/material";
import { Search, Add, Delete, FitnessCenter } from "@mui/icons-material";
import { searchExercises, fetchExercises } from "../../services/routineService";

const CreateRoutineDialog = ({ open, onClose, onSave }) => {
  const [name, setName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [availableExercises, setAvailableExercises] = useState([]);
  const [selectedExercises, setSelectedExercises] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load exercises when dialog opens
  useEffect(() => {
    if (open) {
      loadExercises();
    }
  }, [open]);

  // Search exercises with debounce
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

  const loadExercises = async () => {
    setLoading(true);
    try {
      const exercises = await fetchExercises();
      console.log("Loaded exercises:", exercises);
      setAvailableExercises(exercises || []);
    } catch (err) {
      console.error("Failed to load exercises:", err);
      setAvailableExercises([]);
    }
    setLoading(false);
  };

  const handleSearch = async (query) => {
    setLoading(true);
    try {
      const exercises = await searchExercises(query);
      setAvailableExercises(exercises);
    } catch (err) {
      console.error("Search failed:", err);
    }
    setLoading(false);
  };

  const addExercise = (exercise) => {
    if (!selectedExercises.find(e => e.exerciseId === exercise.id)) {
      setSelectedExercises([
        ...selectedExercises,
        { exerciseId: exercise.id, name: exercise.name, sets: 3, reps: 10 }
      ]);
    }
  };

  const removeExercise = (exerciseId) => {
    setSelectedExercises(selectedExercises.filter(e => e.exerciseId !== exerciseId));
  };

  const updateExerciseSets = (exerciseId, sets) => {
    setSelectedExercises(selectedExercises.map(e =>
      e.exerciseId === exerciseId ? { ...e, sets: parseInt(sets) || 0 } : e
    ));
  };

  const updateExerciseReps = (exerciseId, reps) => {
    setSelectedExercises(selectedExercises.map(e =>
      e.exerciseId === exerciseId ? { ...e, reps: parseInt(reps) || 0 } : e
    ));
  };

  const handleSave = () => {
    if (!name.trim()) return;
    onSave({
      name: name.trim(),
      exercises: selectedExercises
    });
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setName("");
    setSearchQuery("");
    setSelectedExercises([]);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <Dialog 
      open={open} 
      onClose={handleClose} 
      maxWidth="md" 
      fullWidth
      PaperProps={{
        sx: { bgcolor: '#1e293b', color: '#e2e8f0', borderRadius: 3 }
      }}
    >
      <DialogTitle sx={{ color: '#f8fafc', fontWeight: 700 }}>
        Create New Routine
      </DialogTitle>

      <DialogContent>
        <TextField
          label="Routine Name"
          fullWidth
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
          InputLabelProps={{ style: { color: '#94a3b8' } }}
          InputProps={{ style: { color: '#f1f5f9' } }}
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: '#475569' },
              '&:hover fieldset': { borderColor: '#60a5fa' },
            },
          }}
        />

        <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
          {/* Exercise Search */}
          <Box sx={{ flex: 1 }}>
            <Typography variant="subtitle2" sx={{ color: '#94a3b8', mb: 1 }}>
              Search Exercises
            </Typography>
            <TextField
              fullWidth
              size="small"
              placeholder="Search by name, muscle group..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search sx={{ color: '#64748b' }} />
                  </InputAdornment>
                ),
                style: { color: '#f1f5f9' }
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: '#475569' },
                },
              }}
            />
            
            <Box sx={{ 
              maxHeight: 250, 
              overflow: 'auto', 
              mt: 1, 
              bgcolor: '#0f172a', 
              borderRadius: 1 
            }}>
              {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
                  <CircularProgress size={24} />
                </Box>
              ) : (
                <List dense>
                  {availableExercises.map((exercise) => (
                    <ListItem 
                      key={exercise.id}
                      sx={{ 
                        '&:hover': { bgcolor: '#1e293b' },
                        borderBottom: '1px solid #1e293b'
                      }}
                    >
                      {exercise.image_url && (
                        <Box
                          component="img"
                          src={exercise.image_url}
                          alt={exercise.name}
                          sx={{ width: 40, height: 40, borderRadius: 1, objectFit: 'cover', mr: 1.5 }}
                        />
                      )}
                      <ListItemText
                        primary={exercise.name}
                        secondary={`${exercise.muscle_group} • ${exercise.equipment}`}
                        primaryTypographyProps={{ color: '#e2e8f0' }}
                        secondaryTypographyProps={{ color: '#64748b', fontSize: '0.75rem' }}
                      />
                      <ListItemSecondaryAction>
                        <IconButton 
                          size="small" 
                          onClick={() => addExercise(exercise)}
                          sx={{ color: '#3b82f6' }}
                        >
                          <Add />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
                </List>
              )}
            </Box>
          </Box>

          {/* Selected Exercises */}
          <Box sx={{ flex: 1 }}>
            <Typography variant="subtitle2" sx={{ color: '#94a3b8', mb: 1 }}>
              Selected Exercises ({selectedExercises.length})
            </Typography>
            <Box sx={{ 
              maxHeight: 300, 
              overflow: 'auto', 
              bgcolor: '#0f172a', 
              borderRadius: 1,
              p: 1
            }}>
              {selectedExercises.length === 0 ? (
                <Box sx={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center', 
                  p: 3,
                  color: '#64748b'
                }}>
                  <FitnessCenter sx={{ fontSize: 40, mb: 1 }} />
                  <Typography variant="body2">No exercises selected</Typography>
                </Box>
              ) : (
                selectedExercises.map((exercise, index) => (
                  <Box 
                    key={exercise.exerciseId}
                    sx={{ 
                      p: 1.5, 
                      mb: 1, 
                      bgcolor: '#1e293b', 
                      borderRadius: 1,
                      borderLeft: '3px solid #3b82f6'
                    }}
                  >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography sx={{ color: '#e2e8f0', fontWeight: 500 }}>
                        {index + 1}. {exercise.name}
                      </Typography>
                      <IconButton 
                        size="small" 
                        onClick={() => removeExercise(exercise.exerciseId)}
                        sx={{ color: '#ef4444' }}
                      >
                        <Delete fontSize="small" />
                      </IconButton>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                      <TextField
                        size="small"
                        label="Sets"
                        type="number"
                        value={exercise.sets}
                        onChange={(e) => updateExerciseSets(exercise.exerciseId, e.target.value)}
                        sx={{ width: 70 }}
                        InputProps={{ 
                          style: { color: '#f1f5f9' },
                          inputProps: { min: 1 }
                        }}
                        InputLabelProps={{ style: { color: '#64748b' } }}
                      />
                      <TextField
                        size="small"
                        label="Reps"
                        type="number"
                        value={exercise.reps}
                        onChange={(e) => updateExerciseReps(exercise.exerciseId, e.target.value)}
                        sx={{ width: 70 }}
                        InputProps={{ 
                          style: { color: '#f1f5f9' },
                          inputProps: { min: 1 }
                        }}
                        InputLabelProps={{ style: { color: '#64748b' } }}
                      />
                    </Box>
                  </Box>
                ))
              )}
            </Box>
          </Box>
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 2 }}>
        <Button onClick={handleClose} sx={{ color: '#94a3b8' }}>
          Cancel
        </Button>
        <Button 
          variant="contained" 
          onClick={handleSave}
          disabled={!name.trim()}
          sx={{
            background: 'linear-gradient(to right, #3b82f6, #8b5cf6)',
            '&:hover': { opacity: 0.9 },
            '&.Mui-disabled': { opacity: 0.4 }
          }}
        >
          Save Routine
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateRoutineDialog;

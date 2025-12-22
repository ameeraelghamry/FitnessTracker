import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
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
import { Search, Add, Delete, Edit, FitnessCenter } from "@mui/icons-material";
import { searchExercises, fetchExercises } from "../../services/routineService";

const RoutineDetailDialog = ({ open, onClose, routine, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [availableExercises, setAvailableExercises] = useState([]);
  const [selectedExercises, setSelectedExercises] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (routine && open) {
      setName(routine.name || "");
      setSelectedExercises(
        (routine.exercises || []).map(ex => ({
          exerciseId: ex.exercise_id,
          name: ex.name,
          sets: ex.sets,
          reps: ex.reps,
          muscle_group: ex.muscle_group,
          equipment: ex.equipment
        }))
      );
      setIsEditing(false);
    }
  }, [routine, open]);

  useEffect(() => {
    if (isEditing && open) {
      loadExercises();
    }
  }, [isEditing, open]);

  useEffect(() => {
    if (!isEditing) return;
    const timer = setTimeout(() => {
      if (searchQuery.trim()) {
        handleSearch(searchQuery);
      } else {
        loadExercises();
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery, isEditing]);

  const loadExercises = async () => {
    setLoading(true);
    try {
      const exercises = await fetchExercises();
      setAvailableExercises(exercises || []);
    } catch (err) {
      console.error("Failed to load exercises:", err);
    }
    setLoading(false);
  };

  const handleSearch = async (query) => {
    setLoading(true);
    try {
      const exercises = await searchExercises(query);
      setAvailableExercises(exercises || []);
    } catch (err) {
      console.error("Search failed:", err);
    }
    setLoading(false);
  };

  const addExercise = (exercise) => {
    if (!selectedExercises.find(e => e.exerciseId === exercise.id)) {
      setSelectedExercises([
        ...selectedExercises,
        { 
          exerciseId: exercise.id, 
          name: exercise.name, 
          sets: 3, 
          reps: 10,
          muscle_group: exercise.muscle_group,
          equipment: exercise.equipment
        }
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
    onSave({
      name: name.trim(),
      exercises: selectedExercises
    });
  };

  const handleClose = () => {
    setIsEditing(false);
    setSearchQuery("");
    onClose();
  };

  if (!routine) return null;

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
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {isEditing ? (
          <TextField
            value={name}
            onChange={(e) => setName(e.target.value)}
            variant="standard"
            InputProps={{ style: { color: '#f8fafc', fontSize: '1.25rem', fontWeight: 700 } }}
            sx={{ flex: 1 }}
          />
        ) : (
          <Typography sx={{ color: '#f8fafc', fontWeight: 700, fontSize: '1.25rem' }}>
            {routine.name}
          </Typography>
        )}
        {!isEditing && (
          <IconButton onClick={() => setIsEditing(true)} sx={{ color: '#3b82f6' }}>
            <Edit />
          </IconButton>
        )}
      </DialogTitle>

      <DialogContent>
        {isEditing ? (
          <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
            {/* Exercise Search */}
            <Box sx={{ flex: 1 }}>
              <Typography variant="subtitle2" sx={{ color: '#94a3b8', mb: 1 }}>
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
              
              <Box sx={{ maxHeight: 250, overflow: 'auto', mt: 1, bgcolor: '#0f172a', borderRadius: 1 }}>
                {loading ? (
                  <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
                    <CircularProgress size={24} />
                  </Box>
                ) : (
                  <List dense>
                    {availableExercises.map((exercise) => (
                      <ListItem 
                        key={exercise.id}
                        sx={{ '&:hover': { bgcolor: '#1e293b' }, borderBottom: '1px solid #1e293b' }}
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
                          <IconButton size="small" onClick={() => addExercise(exercise)} sx={{ color: '#3b82f6' }}>
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
                Exercises ({selectedExercises.length})
              </Typography>
              <Box sx={{ maxHeight: 300, overflow: 'auto', bgcolor: '#0f172a', borderRadius: 1, p: 1 }}>
                {selectedExercises.length === 0 ? (
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 3, color: '#64748b' }}>
                    <FitnessCenter sx={{ fontSize: 40, mb: 1 }} />
                    <Typography variant="body2">No exercises</Typography>
                  </Box>
                ) : (
                  selectedExercises.map((exercise, index) => (
                    <Box 
                      key={exercise.exerciseId}
                      sx={{ p: 1.5, mb: 1, bgcolor: '#1e293b', borderRadius: 1, borderLeft: '3px solid #3b82f6' }}
                    >
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography sx={{ color: '#e2e8f0', fontWeight: 500 }}>
                          {index + 1}. {exercise.name}
                        </Typography>
                        <IconButton size="small" onClick={() => removeExercise(exercise.exerciseId)} sx={{ color: '#ef4444' }}>
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
                          InputProps={{ style: { color: '#f1f5f9' }, inputProps: { min: 1 } }}
                          InputLabelProps={{ style: { color: '#64748b' } }}
                        />
                        <TextField
                          size="small"
                          label="Reps"
                          type="number"
                          value={exercise.reps}
                          onChange={(e) => updateExerciseReps(exercise.exerciseId, e.target.value)}
                          sx={{ width: 70 }}
                          InputProps={{ style: { color: '#f1f5f9' }, inputProps: { min: 1 } }}
                          InputLabelProps={{ style: { color: '#64748b' } }}
                        />
                      </Box>
                    </Box>
                  ))
                )}
              </Box>
            </Box>
          </Box>
        ) : (
          /* View Mode */
          <Box sx={{ mt: 1 }}>
            {selectedExercises.length === 0 ? (
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 4, color: '#64748b' }}>
                <FitnessCenter sx={{ fontSize: 48, mb: 2 }} />
                <Typography>No exercises in this routine</Typography>
                <Button 
                  onClick={() => setIsEditing(true)} 
                  sx={{ mt: 2, color: '#3b82f6' }}
                >
                  Add Exercises
                </Button>
              </Box>
            ) : (
              <List>
                {selectedExercises.map((exercise, index) => (
                  <React.Fragment key={exercise.exerciseId}>
                    <ListItem sx={{ py: 2 }}>
                      {exercise.image_url ? (
                        <Box
                          component="img"
                          src={exercise.image_url}
                          alt={exercise.name}
                          sx={{
                            width: 50,
                            height: 50,
                            borderRadius: 1,
                            objectFit: 'cover',
                            mr: 2
                          }}
                        />
                      ) : (
                        <Box sx={{ 
                          width: 50, 
                          height: 50, 
                          borderRadius: 1, 
                          bgcolor: '#3b82f6', 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center',
                          mr: 2
                        }}>
                          <Typography sx={{ color: '#fff', fontWeight: 600 }}>{index + 1}</Typography>
                        </Box>
                      )}
                      <ListItemText
                        primary={exercise.name}
                        secondary={
                          <Box sx={{ display: 'flex', gap: 2, mt: 0.5 }}>
                            <Typography variant="body2" sx={{ color: '#94a3b8' }}>
                              {exercise.sets} sets × {exercise.reps} reps
                            </Typography>
                            {exercise.muscle_group && (
                              <Typography variant="body2" sx={{ color: '#64748b' }}>
                                {exercise.muscle_group}
                              </Typography>
                            )}
                          </Box>
                        }
                        primaryTypographyProps={{ color: '#e2e8f0', fontWeight: 500 }}
                      />
                    </ListItem>
                    {index < selectedExercises.length - 1 && <Divider sx={{ borderColor: '#334155' }} />}
                  </React.Fragment>
                ))}
              </List>
            )}
          </Box>
        )}
      </DialogContent>

      <DialogActions sx={{ p: 2 }}>
        <Button onClick={handleClose} sx={{ color: '#94a3b8' }}>
          {isEditing ? 'Cancel' : 'Close'}
        </Button>
        {isEditing && (
          <Button 
            variant="contained" 
            onClick={handleSave}
            disabled={!name.trim()}
            sx={{
              background: 'linear-gradient(to right, #3b82f6, #8b5cf6)',
              '&:hover': { opacity: 0.9 },
            }}
          >
            Save Changes
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default RoutineDetailDialog;

import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, InputAdornment, Grid, Card, CardContent, Chip, Switch, FormControlLabel } from '@mui/material';
import { Search, FitnessCenter } from '@mui/icons-material';
import { fetchExercises, fetchFilteredExercises, searchExercises, fetchUserEquipment } from '../services/routineService';

const ExercisesPage = () => {
  const [exercises, setExercises] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [filterByEquipment, setFilterByEquipment] = useState(true);
  const [userEquipment, setUserEquipment] = useState([]);

  useEffect(() => {
    loadUserEquipment();
  }, []);

  useEffect(() => {
    loadExercises();
  }, [filterByEquipment]);

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

  const loadUserEquipment = async () => {
    const data = await fetchUserEquipment();
    setUserEquipment(data.equipment || []);
  };

  const loadExercises = async () => {
    setLoading(true);
    try {
      const data = filterByEquipment 
        ? await fetchFilteredExercises()
        : await fetchExercises();
      setExercises(data || []);
    } catch (err) {
      console.error('Failed to load exercises:', err);
    }
    setLoading(false);
  };

  const handleSearch = async (query) => {
    setLoading(true);
    try {
      const data = await searchExercises(query);
      setExercises(data || []);
    } catch (err) {
      console.error('Search failed:', err);
    }
    setLoading(false);
  };

  const muscleGroups = [...new Set(exercises.map(e => e.muscle_group).filter(Boolean))];

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#F9FAFB', p: 4 }}>
      <Typography variant="h4" sx={{ color: '#1F2937', fontWeight: 700, mb: 2 }}>
        Exercises
      </Typography>
      <Typography sx={{ color: '#6B7280', mb: 3 }}>
        Browse exercises to add to your routines
      </Typography>

      {/* Equipment Filter Toggle */}
      {userEquipment.length > 0 && (
        <Box sx={{ mb: 3, p: 2, bgcolor: '#EEF2FF', borderRadius: 2 }}>
          <FormControlLabel
            control={
              <Switch
                checked={filterByEquipment}
                onChange={(e) => setFilterByEquipment(e.target.checked)}
                sx={{
                  '& .MuiSwitch-switchBase.Mui-checked': { color: '#667eea' },
                  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: '#667eea' },
                }}
              />
            }
            label="Show only exercises for my equipment"
          />
          <Typography variant="body2" sx={{ color: '#6B7280', mt: 1 }}>
            Your equipment: {userEquipment.join(', ')}
          </Typography>
        </Box>
      )}

      <TextField
        fullWidth
        placeholder="Search exercises by name, muscle group, or equipment..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search sx={{ color: '#9CA3AF' }} />
            </InputAdornment>
          ),
        }}
        sx={{
          mb: 4,
          bgcolor: 'white',
          borderRadius: 2,
          '& .MuiOutlinedInput-root': { borderRadius: 2 }
        }}
      />

      {/* Muscle Group Filters */}
      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 4 }}>
        <Chip
          label="All"
          onClick={() => setSearchQuery('')}
          sx={{
            bgcolor: !searchQuery ? '#667eea' : '#E5E7EB',
            color: !searchQuery ? 'white' : '#374151',
            fontWeight: 500,
            '&:hover': { opacity: 0.8 }
          }}
        />
        {muscleGroups.map((group) => (
          <Chip
            key={group}
            label={group}
            onClick={() => setSearchQuery(group)}
            sx={{
              bgcolor: searchQuery === group ? '#667eea' : '#E5E7EB',
              color: searchQuery === group ? 'white' : '#374151',
              fontWeight: 500,
              '&:hover': { opacity: 0.8 }
            }}
          />
        ))}
      </Box>

      {loading ? (
        <Typography sx={{ color: '#6B7280' }}>Loading exercises...</Typography>
      ) : exercises.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <FitnessCenter sx={{ fontSize: 64, color: '#D1D5DB', mb: 2 }} />
          <Typography sx={{ color: '#6B7280' }}>No exercises found</Typography>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {exercises.map((exercise) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={exercise.id}>
              <Card
                sx={{
                  borderRadius: 3,
                  border: '1px solid #E5E7EB',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 12px 24px rgba(0,0,0,0.1)',
                  }
                }}
              >
                {exercise.image_url && (
                  <Box
                    component="img"
                    src={exercise.image_url}
                    alt={exercise.name}
                    sx={{ width: '100%', height: 160, objectFit: 'cover' }}
                  />
                )}
                <CardContent>
                  <Typography sx={{ fontWeight: 600, color: '#1F2937', mb: 1 }}>
                    {exercise.name}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    {exercise.muscle_group && (
                      <Chip
                        label={exercise.muscle_group}
                        size="small"
                        sx={{ bgcolor: '#EEF2FF', color: '#667eea', fontWeight: 500 }}
                      />
                    )}
                    {exercise.equipment && (
                      <Chip
                        label={exercise.equipment}
                        size="small"
                        sx={{ bgcolor: '#F3F4F6', color: '#6B7280' }}
                      />
                    )}
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

export default ExercisesPage;

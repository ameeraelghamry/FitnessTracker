import React, { useState, useEffect } from "react";
import { Box, Typography, TextField, InputAdornment, Grid, Card, CardContent, Chip } from "@mui/material";
import { Search, FitnessCenter } from "@mui/icons-material";
import Header from "../components/mainpage/header";
import Footer from "../components/mainpage/Footer";
import BackgroundImage from "../assets/images/workoutPage.jpg";
import { fetchExercises, searchExercises } from "../services/routineService";

const Workouts = () => {
  const [exercises, setExercises] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedMuscle, setSelectedMuscle] = useState('');

  useEffect(() => {
    loadExercises();
  }, []);

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
      const data = await fetchExercises();
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

  const handleMuscleFilter = (muscle) => {
    if (selectedMuscle === muscle) {
      setSelectedMuscle('');
      setSearchQuery('');
    } else {
      setSelectedMuscle(muscle);
      setSearchQuery(muscle);
    }
  };

  const muscleGroups = ['Chest', 'Back', 'Legs', 'Arms', 'Shoulders', 'Core'];

  return (
    <>
      <Header />

      {/* Hero Section */}
      <Box
        sx={{
          position: "relative",
          minHeight: "50vh",
          backgroundImage: `url(${BackgroundImage})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          px: { xs: 2, md: 8 },
        }}
      >
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            zIndex: 1,
          }}
        />

        <Box sx={{ position: "relative", zIndex: 2, textAlign: "center", maxWidth: 800 }}>
          <Typography variant="h2" fontWeight={700} mb={2}>
            All Workouts
          </Typography>
          <Typography variant="h6" sx={{ opacity: 0.9, mb: 4 }}>
            Browse our complete exercise library and find the perfect workouts for your goals
          </Typography>

          {/* Search Bar */}
          <TextField
            fullWidth
            placeholder="Search exercises..."
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
              maxWidth: 600,
              bgcolor: 'white',
              borderRadius: 3,
              '& .MuiOutlinedInput-root': {
                borderRadius: 3,
              }
            }}
          />
        </Box>
      </Box>

      {/* Muscle Group Filters */}
      <Box sx={{ bgcolor: '#111827', py: 3, px: { xs: 2, md: 8 } }}>
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
          {muscleGroups.map((muscle) => (
            <Chip
              key={muscle}
              label={muscle}
              onClick={() => handleMuscleFilter(muscle)}
              sx={{
                bgcolor: selectedMuscle === muscle ? '#477CD8' : 'rgba(255,255,255,0.1)',
                color: 'white',
                fontWeight: 600,
                fontSize: '1rem',
                py: 2.5,
                px: 1,
                '&:hover': { bgcolor: selectedMuscle === muscle ? '#3b6bbf' : 'rgba(255,255,255,0.2)' }
              }}
            />
          ))}
        </Box>
      </Box>

      {/* Exercises Grid */}
      <Box sx={{ bgcolor: '#0C1018', minHeight: '60vh', py: 6, px: { xs: 2, md: 8 } }}>
        <Typography
          variant="h4"
          sx={{ color: 'white', fontWeight: 700, mb: 4, textAlign: 'center' }}
        >
          {selectedMuscle ? `${selectedMuscle} Exercises` : 'All Exercises'} ({exercises.length})
        </Typography>

        {loading ? (
          <Typography sx={{ color: '#9CA3AF', textAlign: 'center' }}>Loading exercises...</Typography>
        ) : exercises.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <FitnessCenter sx={{ fontSize: 64, color: '#374151', mb: 2 }} />
            <Typography sx={{ color: '#9CA3AF' }}>No exercises found</Typography>
          </Box>
        ) : (
          <Grid container spacing={3}>
            {exercises.map((exercise) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={exercise.id}>
                <Card
                  sx={{
                    bgcolor: '#1F2937',
                    borderRadius: 3,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
                    }
                  }}
                >
                  {exercise.image_url ? (
                    <Box
                      component="img"
                      src={exercise.image_url}
                      alt={exercise.name}
                      sx={{ width: '100%', height: 180, objectFit: 'cover' }}
                    />
                  ) : (
                    <Box
                      sx={{
                        width: '100%',
                        height: 180,
                        bgcolor: '#374151',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <FitnessCenter sx={{ fontSize: 48, color: '#6B7280' }} />
                    </Box>
                  )}
                  <CardContent>
                    <Typography sx={{ fontWeight: 600, color: 'white', mb: 1, fontSize: '1.1rem' }}>
                      {exercise.name}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                      {exercise.muscle_group && (
                        <Chip
                          label={exercise.muscle_group}
                          size="small"
                          sx={{ bgcolor: '#477CD8', color: 'white', fontWeight: 500 }}
                        />
                      )}
                      {exercise.equipment && (
                        <Chip
                          label={exercise.equipment}
                          size="small"
                          sx={{ bgcolor: '#374151', color: '#9CA3AF' }}
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

      <Footer />
    </>
  );
};

export default Workouts;

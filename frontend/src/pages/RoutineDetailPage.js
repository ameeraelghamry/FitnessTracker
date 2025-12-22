import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  CircularProgress
} from '@mui/material';
import { MoreVert, Link as LinkIcon, ArrowBack } from '@mui/icons-material';
import { fetchRoutineById, deleteRoutine } from '../services/routineService';

const RoutineDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [routine, setRoutine] = useState(null);
  const [loading, setLoading] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    loadRoutine();
  }, [id]);

  const loadRoutine = async () => {
    try {
      const data = await fetchRoutineById(id);
      setRoutine(data);
    } catch (err) {
      console.error('Failed to load routine:', err);
    }
    setLoading(false);
  };

  const handleMenuOpen = (e) => setAnchorEl(e.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleDelete = async () => {
    handleMenuClose();
    try {
      await deleteRoutine(id);
      navigate('/routines');
    } catch (err) {
      console.error('Failed to delete:', err);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    handleMenuClose();
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!routine) {
    return (
      <Box sx={{ p: 4 }}>
        <Typography>Routine not found</Typography>
        <Button onClick={() => navigate('/routines')}>Back to Routines</Button>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#fff' }}>
      {/* Header */}
      <Box sx={{ p: 2, borderBottom: '1px solid #e5e7eb' }}>
        <IconButton onClick={() => navigate('/routines')}>
          <ArrowBack />
        </IconButton>
      </Box>

      <Box sx={{ display: 'flex', maxWidth: 1200, mx: 'auto', p: 4, gap: 4 }}>
        {/* Left - Exercises List */}
        <Box sx={{ flex: 1 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h4" sx={{ fontWeight: 700, color: '#1f2937' }}>
              {routine.name}
            </Typography>
            <IconButton onClick={handleMenuOpen}>
              <MoreVert />
            </IconButton>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
              <MenuItem onClick={handleDelete} sx={{ color: '#ef4444' }}>Delete</MenuItem>
            </Menu>
          </Box>

          <Typography sx={{ color: '#6b7280', mb: 3, fontWeight: 500 }}>
            Exercises
          </Typography>

          {/* Exercise List */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {routine.exercises?.length === 0 ? (
              <Typography sx={{ color: '#9ca3af', py: 4, textAlign: 'center' }}>
                No exercises in this routine
              </Typography>
            ) : (
              routine.exercises?.map((exercise) => (
                <Box
                  key={exercise.id}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    py: 2,
                    borderBottom: '1px solid #f3f4f6'
                  }}
                >
                  {/* Exercise Image */}
                  <Box
                    component="img"
                    src={exercise.image_url || 'https://via.placeholder.com/60?text=Ex'}
                    alt={exercise.name}
                    sx={{
                      width: 60,
                      height: 60,
                      borderRadius: 2,
                      objectFit: 'cover',
                      bgcolor: '#f3f4f6'
                    }}
                  />

                  {/* Exercise Info */}
                  <Box sx={{ flex: 1 }}>
                    <Typography sx={{ fontWeight: 600, color: '#1f2937', mb: 0.5 }}>
                      {exercise.name}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <Typography sx={{ color: '#6b7280', fontSize: '0.875rem' }}>
                          ≡ {exercise.sets} sets
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <Typography sx={{ color: '#6b7280', fontSize: '0.875rem' }}>
                          ↻ {exercise.reps} reps
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              ))
            )}
          </Box>
        </Box>

        {/* Right - Sidebar */}
        <Box sx={{ width: 280, flexShrink: 0 }}>
          {/* Created By */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
            <Avatar sx={{ bgcolor: '#e5e7eb', color: '#6b7280' }}>
              {user.username?.[0]?.toUpperCase() || 'U'}
            </Avatar>
            <Box>
              <Typography sx={{ color: '#6b7280', fontSize: '0.875rem' }}>
                Created by
              </Typography>
              <Typography sx={{ fontWeight: 600, color: '#1f2937' }}>
                {user.username || 'You'}
              </Typography>
            </Box>
          </Box>

          {/* Edit Button */}
          <Button
            fullWidth
            variant="contained"
            onClick={() => navigate(`/routines/${id}/edit`)}
            sx={{
              bgcolor: '#0ea5e9',
              color: '#fff',
              py: 1.5,
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 600,
              mb: 2,
              '&:hover': { bgcolor: '#0284c7' }
            }}
          >
            Edit Routine
          </Button>

          {/* Copy Link Button */}
          <Button
            fullWidth
            variant="outlined"
            startIcon={<LinkIcon />}
            onClick={handleCopyLink}
            sx={{
              borderColor: '#e5e7eb',
              color: '#374151',
              py: 1.5,
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 500,
              '&:hover': { borderColor: '#d1d5db', bgcolor: '#f9fafb' }
            }}
          >
            Copy Routine Link
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default RoutineDetailPage;

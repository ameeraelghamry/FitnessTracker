import React from 'react';
import { Box, Typography, IconButton, Chip, Stack } from '@mui/material';
import { MoreVert } from '@mui/icons-material';

export default function RoutineCard({ routine, onDelete }) {
  return (
    <Box
      sx={{
        bgcolor: '#1e293b',
        p: 3,
        borderRadius: 3,
        border: '1px solid #334155',
        transition: '0.2s',
        '&:hover': {
          borderColor: '#3b82f6',
          boxShadow: '0px 4px 14px rgba(59,130,246,0.25)',
          transform: 'translateY(-3px)',
        },
        cursor: 'pointer',
      }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="start" mb={2}>
        <Box display="flex" alignItems="center" gap={2}>
          <Box
            sx={{
              width: 56,
              height: 56,
              borderRadius: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 28,
              bgcolor: routine.isFolder
                ? 'rgba(249, 115, 22, 0.1)'
                : 'rgba(59,130,246,0.1)',
            }}
          >
            {routine.isFolder ? '📁' : '🏋️'}
          </Box>
          <Box>
            <Typography fontWeight={600} color="#f8fafc">
              {routine.name}
            </Typography>
            <Typography variant="body2" color="#94a3b8">
              {routine.exerciseCount} exercises
            </Typography>
          </Box>
        </Box>
        <IconButton onClick={() => onDelete(routine.id)}>
          <MoreVert sx={{ color: '#94a3b8' }} />
        </IconButton>
      </Box>

      {!routine.isFolder && routine.exercises && (
        <Stack direction="row" spacing={1} flexWrap="wrap">
          {routine.exercises.slice(0, 3).map((exercise, i) => (
            <Chip
              key={i}
              label={exercise}
              size="small"
              sx={{
                bgcolor: '#334155',
                color: '#e2e8f0',
                borderRadius: 1,
              }}
            />
          ))}
          {routine.exercises.length > 3 && (
            <Chip
              label={`+${routine.exercises.length - 3} more`}
              size="small"
              sx={{
                bgcolor: '#3b82f6',
                color: '#fff',
                borderRadius: 1,
              }}
            />
          )}
        </Stack>
      )}
    </Box>
  );
}

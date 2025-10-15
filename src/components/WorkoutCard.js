import React from 'react';
import { Card, CardContent, Box, Typography, Chip } from '@mui/material';
import { EmojiEvents } from '@mui/icons-material';

const WorkoutCard = ({ workout }) => {
  return (
    <Card
      sx={{
        borderRadius: 4,
        background: 'white',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: '0 12px 32px rgba(0,0,0,0.15)',
        },
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h6" fontWeight="bold">
            {workout.name}
          </Typography>
          <Chip
            icon={<EmojiEvents />}
            label={workout.records}
            size="small"
            sx={{ bgcolor: '#fef3c7', color: '#92400e', fontWeight: 600 }}
          />
        </Box>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {workout.date}
        </Typography>

        <Box sx={{ display: 'flex', gap: 3, mb: 2 }}>
          <Box>
            <Typography variant="caption" color="text.secondary">
              Time
            </Typography>
            <Typography variant="body1" fontWeight="600">
              {workout.time}
            </Typography>
          </Box>
          <Box>
            <Typography variant="caption" color="text.secondary">
              Volume
            </Typography>
            <Typography variant="body1" fontWeight="600">
              {workout.volume}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ mt: 2 }}>
          {workout.exercises.slice(0, 2).map((exercise, i) => (
            <Chip
              key={i}
              label={exercise}
              size="small"
              sx={{ mr: 1, mb: 1, bgcolor: '#f3f4f6' }}
            />
          ))}
          {workout.exercises.length > 2 && (
            <Typography variant="caption" color="text.secondary">
              +{workout.exercises.length - 2} more
            </Typography>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default WorkoutCard;

import React, { useState } from 'react';
import { Card, CardContent, Typography, Box, Chip } from '@mui/material';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const WorkoutChart = ({ data }) => {
  const [selectedView, setSelectedView] = useState('Duration');

  const getChartData = () => {
    switch (selectedView) {
      case 'Volume':
        return data.map(d => ({ ...d, value: d.volume }));
      case 'Reps':
        return data.map(d => ({ ...d, value: d.reps }));
      default:
        return data.map(d => ({ ...d, value: d.duration }));
    }
  };

  return (
    <Card
      sx={{
        borderRadius: 4,
        background: 'linear-gradient(135deg, #f6f8fb 0%, #ffffff 100%)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        mb: 3,
      }}
    >
      <CardContent sx={{ p: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexWrap: 'wrap', gap: 2 }}>
          <Typography variant="h6" fontWeight="bold" color="text.primary">
            Workout Activity
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            {['Duration', 'Volume', 'Reps'].map((view) => (
              <Chip
                key={view}
                label={view}
                onClick={() => setSelectedView(view)}
                sx={{
                  bgcolor: selectedView === view ? '#667eea' : '#e5e7eb',
                  color: selectedView === view ? 'white' : 'text.secondary',
                  fontWeight: 600,
                  borderRadius: 3,
                  '&:hover': {
                    bgcolor: selectedView === view ? '#5568d3' : '#d1d5db',
                  },
                }}
              />
            ))}
          </Box>
        </Box>

        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={getChartData()}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#667eea" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#667eea" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="date" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip
              contentStyle={{
                background: 'white',
                border: 'none',
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#667eea"
              strokeWidth={3}
              fill="url(#colorValue)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default WorkoutChart;

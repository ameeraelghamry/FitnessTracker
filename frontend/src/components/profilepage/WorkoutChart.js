import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Box, Chip } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { fetchRoutines } from '../../services/routineService';

const WorkoutChart = () => {
  const [routineData, setRoutineData] = useState([]);
  const [selectedView, setSelectedView] = useState('Exercises');

  useEffect(() => {
    loadRoutineData();
  }, []);

  const loadRoutineData = async () => {
    try {
      const routines = await fetchRoutines();
      const chartData = routines.slice(0, 6).map(routine => ({
        name: routine.name.length > 12 ? routine.name.substring(0, 12) + '...' : routine.name,
        exercises: routine.exercise_count || 0,
        fullName: routine.name
      }));
      setRoutineData(chartData);
    } catch (err) {
      console.error('Failed to load routine data:', err);
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
            Routines Overview
          </Typography>
          <Chip
            label="Exercises per Routine"
            sx={{
              bgcolor: '#667eea',
              color: 'white',
              fontWeight: 600,
              borderRadius: 3,
            }}
          />
        </Box>

        {routineData.length === 0 ? (
          <Box sx={{ 
            height: 300, 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            color: '#6b7280'
          }}>
            <Typography>No routines yet. Create your first routine!</Typography>
          </Box>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={routineData}>
              <defs>
                <linearGradient id="colorBar" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#667eea" stopOpacity={0.9} />
                  <stop offset="95%" stopColor="#764ba2" stopOpacity={0.9} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="name" stroke="#6b7280" fontSize={12} />
              <YAxis stroke="#6b7280" allowDecimals={false} />
              <Tooltip
                contentStyle={{
                  background: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                }}
                formatter={(value, name, props) => [value, 'Exercises']}
                labelFormatter={(label, payload) => payload[0]?.payload?.fullName || label}
              />
              <Bar
                dataKey="exercises"
                fill="url(#colorBar)"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
};

export default WorkoutChart;

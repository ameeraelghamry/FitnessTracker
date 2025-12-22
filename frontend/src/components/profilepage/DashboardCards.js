import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Paper, Dialog, DialogTitle, DialogContent, IconButton } from '@mui/material';
import { BarChart as BarChartIcon, FitnessCenter, Speed, CalendarToday, Close, ChevronLeft, ChevronRight } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { fetchUserDashboard, fetchUserStats, fetchRoutineDates } from '../../services/routineService';

const DashboardCards = () => {
  const navigate = useNavigate();
  const [dashboard, setDashboard] = useState(null);
  const [stats, setStats] = useState({ plans_count: 0, exercises_count: 0, total_sets: 0 });
  const [routineDates, setRoutineDates] = useState([]);
  const [openDialog, setOpenDialog] = useState(null);
  const [calendarDate, setCalendarDate] = useState(new Date());

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const [dashData, statsData, datesData] = await Promise.all([
        fetchUserDashboard(),
        fetchUserStats(),
        fetchRoutineDates()
      ]);
      setDashboard(dashData);
      setStats(statsData);
      setRoutineDates(datesData.map(d => d.date));
    } catch (err) {
      console.error('Failed to load dashboard:', err);
    }
  };

  const cards = [
    { 
      id: 'statistics',
      title: 'Statistics', 
      icon: <BarChartIcon />, 
      color: '#667eea',
      value: stats.total_sets,
      subtitle: 'Total Sets'
    },
    { 
      id: 'exercises',
      title: 'Exercises', 
      icon: <FitnessCenter />, 
      color: '#764ba2',
      value: stats.exercises_count,
      subtitle: 'In Routines',
      onClick: () => navigate('/exercises')
    },
    { 
      id: 'measures',
      title: 'Measures', 
      icon: <Speed />, 
      color: '#f093fb',
      value: dashboard?.measures?.weight ? `${dashboard.measures.weight} kg` : '-',
      subtitle: 'Current Weight'
    },
    { 
      id: 'calendar',
      title: 'Calendar', 
      icon: <CalendarToday />, 
      color: '#4facfe',
      value: routineDates.length,
      subtitle: 'Active Days'
    },
  ];

  const handleCardClick = (card) => {
    if (card.onClick) {
      card.onClick();
    } else {
      setOpenDialog(card.id);
    }
  };

  // Calendar helpers
  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const formatDateString = (year, month, day) => {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };

  const isRoutineDate = (day) => {
    const dateStr = formatDateString(calendarDate.getFullYear(), calendarDate.getMonth(), day);
    return routineDates.includes(dateStr);
  };

  const prevMonth = () => {
    setCalendarDate(new Date(calendarDate.getFullYear(), calendarDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCalendarDate(new Date(calendarDate.getFullYear(), calendarDate.getMonth() + 1, 1));
  };

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 
                      'July', 'August', 'September', 'October', 'November', 'December'];
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(calendarDate);
    const firstDay = getFirstDayOfMonth(calendarDate);
    const days = [];

    // Empty cells for days before the first day
    for (let i = 0; i < firstDay; i++) {
      days.push(<Box key={`empty-${i}`} sx={{ width: 36, height: 36 }} />);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const hasRoutine = isRoutineDate(day);
      const isToday = new Date().toDateString() === new Date(calendarDate.getFullYear(), calendarDate.getMonth(), day).toDateString();
      
      days.push(
        <Box
          key={day}
          sx={{
            width: 36,
            height: 36,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '50%',
            bgcolor: hasRoutine ? '#667eea' : isToday ? '#e5e7eb' : 'transparent',
            color: hasRoutine ? 'white' : '#374151',
            fontWeight: hasRoutine || isToday ? 600 : 400,
            fontSize: '0.875rem',
            cursor: hasRoutine ? 'pointer' : 'default',
            transition: 'all 0.2s',
            '&:hover': hasRoutine ? { bgcolor: '#5568d3' } : {}
          }}
        >
          {day}
        </Box>
      );
    }

    return days;
  };

  const renderDialogContent = () => {
    switch (openDialog) {
      case 'statistics':
        return (
          <Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Paper sx={{ p: 2, bgcolor: '#f3f4f6' }}>
                <Typography color="text.secondary">Total Routines</Typography>
                <Typography variant="h4">{stats.plans_count}</Typography>
              </Paper>
              <Paper sx={{ p: 2, bgcolor: '#f3f4f6' }}>
                <Typography color="text.secondary">Total Exercises</Typography>
                <Typography variant="h4">{stats.exercises_count}</Typography>
              </Paper>
              <Paper sx={{ p: 2, bgcolor: '#f3f4f6' }}>
                <Typography color="text.secondary">Total Sets</Typography>
                <Typography variant="h4">{stats.total_sets}</Typography>
              </Paper>
            </Box>
          </Box>
        );
      case 'measures':
        return (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Paper sx={{ p: 2, bgcolor: '#f3f4f6' }}>
              <Typography color="text.secondary">Height</Typography>
              <Typography variant="h4">{dashboard?.measures?.height || '-'} cm</Typography>
            </Paper>
            <Paper sx={{ p: 2, bgcolor: '#f3f4f6' }}>
              <Typography color="text.secondary">Current Weight</Typography>
              <Typography variant="h4">{dashboard?.measures?.weight || '-'} kg</Typography>
            </Paper>
            <Paper sx={{ p: 2, bgcolor: '#f3f4f6' }}>
              <Typography color="text.secondary">Goal Weight</Typography>
              <Typography variant="h4">{dashboard?.measures?.goalWeight || '-'} kg</Typography>
            </Paper>
            <Paper sx={{ p: 2, bgcolor: '#f3f4f6' }}>
              <Typography color="text.secondary">Fitness Level</Typography>
              <Typography variant="h5">{dashboard?.measures?.fitnessLevel || '-'}</Typography>
            </Paper>
          </Box>
        );
      case 'calendar':
        return (
          <Box>
            {/* Calendar Header */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <IconButton onClick={prevMonth} size="small">
                <ChevronLeft />
              </IconButton>
              <Typography sx={{ fontWeight: 600 }}>
                {monthNames[calendarDate.getMonth()]} {calendarDate.getFullYear()}
              </Typography>
              <IconButton onClick={nextMonth} size="small">
                <ChevronRight />
              </IconButton>
            </Box>

            {/* Day Names */}
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 0.5, mb: 1 }}>
              {dayNames.map(day => (
                <Box key={day} sx={{ textAlign: 'center', color: '#6b7280', fontSize: '0.75rem', fontWeight: 500 }}>
                  {day}
                </Box>
              ))}
            </Box>

            {/* Calendar Grid */}
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 0.5 }}>
              {renderCalendar()}
            </Box>

            {/* Legend */}
            <Box sx={{ display: 'flex', gap: 3, mt: 3, justifyContent: 'center' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#667eea' }} />
                <Typography variant="body2" color="text.secondary">Routine Created</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#e5e7eb' }} />
                <Typography variant="body2" color="text.secondary">Today</Typography>
              </Box>
            </Box>
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h6" fontWeight="bold" color="white" sx={{ mb: 2 }}>
        Dashboard
      </Typography>
      <Grid container spacing={2}>
        {cards.map((card, idx) => (
          <Grid item xs={12} sm={6} md={3} key={idx}>
            <Paper
              onClick={() => handleCardClick(card)}
              sx={{
                p: 3,
                background: 'rgba(255,255,255,0.1)',
                backdropFilter: 'blur(10px)',
                borderRadius: 3,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                border: '1px solid rgba(255,255,255,0.1)',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 12px 24px rgba(0,0,0,0.2)',
                  background: `linear-gradient(135deg, ${card.color}40 0%, ${card.color}20 100%)`,
                },
              }}
            >
              <Box sx={{ color: card.color, mb: 1 }}>{card.icon}</Box>
              <Typography variant="h4" fontWeight="bold" color="white">
                {card.value}
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                {card.subtitle}
              </Typography>
              <Typography variant="h6" fontWeight="600" color="white" sx={{ mt: 1 }}>
                {card.title}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Dialog open={!!openDialog} onClose={() => setOpenDialog(null)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {cards.find(c => c.id === openDialog)?.title}
          <IconButton onClick={() => setOpenDialog(null)}>
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {renderDialogContent()}
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default DashboardCards;

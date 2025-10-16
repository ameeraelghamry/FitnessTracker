import React from 'react';
import { Box, Container, Divider } from '@mui/material';
import Sidebar from '../components/SideBar';
import ProfileHeader from '../components/ProfileHeader';
import WorkoutChart from '../components/WorkoutChart';
import DashboardCards from '../components/DashboardCards';
import RecentWorkouts from '../components/RecentWorkouts';

const ProfilePage = () => {
  const user = {
    name: 'Nourhan52',
    avatar: '',
  };

  const workoutData = [
    { date: 'Jul 26', duration: 3.5, volume: 4200, reps: 45 },
    { date: 'Aug 9', duration: 1.8, volume: 3100, reps: 38 },
    { date: 'Aug 9', duration: 2.8, volume: 3800, reps: 42 },
    { date: 'Aug 9', duration: 1.3, volume: 2500, reps: 30 },
    { date: 'Aug 23', duration: 5.2, volume: 5600, reps: 52 },
    { date: 'Sep 6', duration: 2.1, volume: 3400, reps: 40 },
    { date: 'Sep 6', duration: 2.3, volume: 3500, reps: 41 },
    { date: 'Sep 6', duration: 2.2, volume: 3300, reps: 39 },
  ];

  const recentWorkouts = [
    {
      name: 'Push and Upper',
      date: 'Friday, Sep 19, 2025',
      time: '54min',
      volume: '2,076 kg',
      records: 6,
      exercises: ['Elliptical Trainer', 'Bench Press', 'Shoulder Press'],
    },
    {
      name: 'Lower',
      date: 'Saturday, Sep 13, 2025',
      time: '1h 18min',
      volume: '5,634 kg',
      records: 3,
      exercises: ['Elliptical Trainer', 'Hip Thrust', 'Single Leg Press'],
    },
    {
      name: 'Push and Upper',
      date: 'Thursday, Sep 11, 2025',
      time: '1h 9min',
      volume: '2,280 kg',
      records: 2,
      exercises: ['Elliptical Trainer', 'Incline Press', 'Cable Fly'],
    },
  ];

  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #1a1f2e 0%, #2d3748 100%)',
        color: 'white',
      }}
    >
      {/* Sidebar (fixed on the left) */}
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '250px',
          height: '100vh',
          bgcolor: '#111827',
          boxShadow: '4px 0 12px rgba(0,0,0,0.3)',
          zIndex: 1000,
        }}
      >
        <Sidebar />
      </Box>

      {/* Main Content (aligned next to sidebar) */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          ml: '250px', // exactly matches sidebar width
          py: 4,
          px: { xs: 2, md: 5 },
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Container
          maxWidth="xl"
          sx={{
            bgcolor: '#1F2937',
            borderRadius: 3,
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)',
            py: 4,
            px: { xs: 3, md: 6 },
          }}
        >
          {/* Profile Header */}
          <ProfileHeader user={user} />

          <Divider
            sx={{
              my: 3,
              borderColor: 'rgba(255,255,255,0.1)',
            }}
          />

          {/* Workout Chart */}
          <WorkoutChart data={workoutData} accentColor="#477CD8" />

          <Divider
            sx={{
              my: 3,
              borderColor: 'rgba(255,255,255,0.1)',
            }}
          />

          {/* Dashboard Cards */}
          <DashboardCards />

          <Divider
            sx={{
              my: 3,
              borderColor: 'rgba(255,255,255,0.1)',
            }}
          />

          {/* Recent Workouts */}
          <RecentWorkouts workouts={recentWorkouts} />
        </Container>
      </Box>
    </Box>
  );
};

export default ProfilePage;

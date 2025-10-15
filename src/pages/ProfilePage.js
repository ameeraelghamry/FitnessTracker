import React from 'react';
import { Box, Container } from '@mui/material';
import Sidebar from '../components/SideBar';
import ProfileHeader from '../components/ProfileHeader';
import WorkoutChart from '../components/WorkoutChart';
import DashboardCards from '../components/DashboardCards';
import RecentWorkouts from '../components/RecentWorkouts';

const ProfilePage = () => {
  // Example user data
  const user = {
    name: 'Nourhan52',
    avatar: '', // add avatar url if you want
  };

  // Dummy workout data for chart
  const workoutData = [
    { date: '01', value: 5 },
    { date: '02', value: 7 },
    { date: '03', value: 6 },
    { date: '04', value: 8 },
    { date: '05', value: 7 },
    { date: '06', value: 9 },
    { date: '07', value: 10 },
  ];

  // Dummy recent workouts
  const recentWorkouts = [
    {
      id: 1,
      title: 'Lower',
      duration: '1h 18min',
      volume: '5,634 kg',
      sets: 3,
      exercises: ['Hip Thrust (Machine)', 'Single Leg (Machine)', 'Elliptical Trainer'],
    },
  ];

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#121721' }}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <Container
        maxWidth="xl"
        sx={{
          flexGrow: 1,
          py: 4,
          bgcolor: '#1F2937', // dark background to contrast sidebar
          borderRadius: 2,
          ml: 3,
          color: 'white',
        }}
      >
        {/* Profile Header */}
        <ProfileHeader user={user} />

        {/* Workout Chart */}
        <WorkoutChart data={workoutData} accentColor="#477CD8" />

        {/* Dashboard Cards */}
        <DashboardCards />

        {/* Recent Workouts */}
        <RecentWorkouts workouts={recentWorkouts} />
      </Container>
    </Box>
  );
};

export default ProfilePage;

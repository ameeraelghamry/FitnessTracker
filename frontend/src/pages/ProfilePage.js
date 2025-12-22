import React, { useEffect, useState } from "react";
import { Box, Container, Divider, Typography, Grid, Card, CardContent, CircularProgress } from "@mui/material";
import Sidebar from "../components/profilepage/SideBar";
import ProfileHeader from "../components/profilepage/ProfileHeader";
import WorkoutChart from "../components/profilepage/WorkoutChart";
import DashboardCards from "../components/profilepage/DashboardCards";
import RecentWorkouts from "../components/profilepage/RecentWorkouts";
import SocialShare from "../components/common/SocialShare";

const API_BASE_URL = "http://localhost:5000/api/social";

const ProfilePage = () => {
  const [user, setUser] = useState({ name: "Guest", id: null });
  const [userStats, setUserStats] = useState(null);
  const [loadingStats, setLoadingStats] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser.username) {
      setUser({ name: storedUser.username, id: storedUser.id });
      // Fetch user stats from backend
      fetchUserStats(storedUser.id);
    }
  }, []);

  const fetchUserStats = async (userId) => {
    if (!userId) return;
    try {
      setLoadingStats(true);
      const response = await fetch(`${API_BASE_URL}/stats/${userId}`);
      if (response.ok) {
        const data = await response.json();
        setUserStats(data);
      }
    } catch (error) {
      console.error("Error fetching user stats:", error);
    } finally {
      setLoadingStats(false);
    }
  };

  const workoutData = [
    { date: "Jul 26", duration: 3.5, volume: 4200, reps: 45 },
    { date: "Aug 9", duration: 1.8, volume: 3100, reps: 38 },
    { date: "Aug 9", duration: 2.8, volume: 3800, reps: 42 },
    { date: "Aug 9", duration: 1.3, volume: 2500, reps: 30 },
    { date: "Aug 23", duration: 5.2, volume: 5600, reps: 52 },
    { date: "Sep 6", duration: 2.1, volume: 3400, reps: 40 },
    { date: "Sep 6", duration: 2.3, volume: 3500, reps: 41 },
    { date: "Sep 6", duration: 2.2, volume: 3300, reps: 39 },
  ];

  const recentWorkouts = [
    {
      name: "Push and Upper",
      date: "Friday, Sep 19, 2025",
      time: "54min",
      volume: "2,076 kg",
      records: 6,
      exercises: ["Elliptical Trainer", "Bench Press", "Shoulder Press"],
    },
  ];

  // Use backend stats if available, otherwise calculate from local data
  const totalWorkouts = userStats?.totalWorkouts || workoutData.length;
  const totalVolume = userStats?.totalVolume || workoutData.reduce((sum, w) => sum + w.volume, 0);
  const currentStreak = userStats?.currentStreak || 0;

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        background: "linear-gradient(135deg, #1a1f2e 0%, #2d3748 100%)",
        color: "white",
      }}
    >
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "250px",
          height: "100vh",
          bgcolor: "#111827",
          boxShadow: "4px 0 12px rgba(0,0,0,0.3)",
          zIndex: 1000,
        }}
      >
        <Sidebar />
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          ml: "250px",
          py: 4,
          px: { xs: 2, md: 5 },
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Container
          maxWidth="xl"
          sx={{
            bgcolor: "#1F2937",
            borderRadius: 3,
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.4)",
            py: 4,
            px: { xs: 3, md: 6 },
          }}
        >
          <ProfileHeader user={user} />

          <Divider sx={{ my: 3, borderColor: "rgba(255,255,255,0.1)" }} />

          <WorkoutChart data={workoutData} accentColor="#477CD8" />

          <Divider sx={{ my: 3, borderColor: "rgba(255,255,255,0.1)" }} />

          <DashboardCards />

          <Divider sx={{ my: 3, borderColor: "rgba(255,255,255,0.1)" }} />

          <RecentWorkouts workouts={recentWorkouts} />

          <Divider sx={{ my: 3, borderColor: "rgba(255,255,255,0.1)" }} />

          {/* Social Sharing Section - Connected to Backend */}
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" fontWeight={600} gutterBottom>
              Share Your Progress
            </Typography>
            <Typography variant="body2" color="rgba(255,255,255,0.7)" sx={{ mb: 3 }}>
              Share your fitness progress with friends for motivation and accountability!
            </Typography>
            
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Card
                  sx={{
                    borderRadius: 3,
                    background: "linear-gradient(135deg, #477CD8 0%, #3b6bbf 100%)",
                    color: "white",
                    height: "100%",
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Typography variant="h6" fontWeight={600} gutterBottom>
                      Your Stats This Month
                    </Typography>
                    {loadingStats ? (
                      <Box sx={{ display: "flex", justifyContent: "center", py: 2 }}>
                        <CircularProgress size={24} sx={{ color: "white" }} />
                      </Box>
                    ) : (
                      <Box sx={{ display: "flex", gap: 4, mb: 2, flexWrap: "wrap" }}>
                        <Box>
                          <Typography variant="h4" fontWeight={700}>{totalWorkouts}</Typography>
                          <Typography variant="body2">Workouts</Typography>
                        </Box>
                        <Box>
                          <Typography variant="h4" fontWeight={700}>{(totalVolume / 1000).toFixed(1)}k</Typography>
                          <Typography variant="body2">Total Volume</Typography>
                        </Box>
                        {currentStreak > 0 && (
                          <Box>
                            <Typography variant="h4" fontWeight={700}>{currentStreak}</Typography>
                            <Typography variant="body2">Day Streak 🔥</Typography>
                          </Box>
                        )}
                      </Box>
                    )}
                    <SocialShare
                      variant="button"
                      userId={user.id}
                      shareType="progress"
                      hashtags={["FitVerse", "fitness", "workout", "progress", "motivation"]}
                    />
                  </CardContent>
                </Card>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <SocialShare
                  variant="card"
                  userId={user.id}
                  shareType="invite"
                  hashtags={["FitVerse", "fitness", "accountability", "goals"]}
                />
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default ProfilePage;

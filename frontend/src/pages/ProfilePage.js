import React, { useEffect, useState } from "react";
import { Box, Container, Divider } from "@mui/material";
import Sidebar from "../components/profilepage/SideBar";
import ProfileHeader from "../components/profilepage/ProfileHeader";
import WorkoutChart from "../components/profilepage/WorkoutChart";
import DashboardCards from "../components/profilepage/DashboardCards";
import RecentWorkouts from "../components/profilepage/RecentWorkouts";

const ProfilePage = () => {
  const [user, setUser] = useState({ name: "Guest" });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser.username) {
      setUser({ name: storedUser.username });
    }
  }, []);

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

          <Divider
            sx={{
              my: 3,
              borderColor: "rgba(255,255,255,0.1)",
            }}
          />

          <WorkoutChart />

          <Divider sx={{ my: 3, borderColor: "rgba(255,255,255,0.1)" }} />

          <DashboardCards />

          <Divider sx={{ my: 3, borderColor: "rgba(255,255,255,0.1)" }} />

          <RecentWorkouts />
        </Container>
      </Box>
    </Box>
  );
};

export default ProfilePage;

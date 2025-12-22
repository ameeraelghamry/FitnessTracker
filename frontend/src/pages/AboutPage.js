import React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import ShareIcon from "@mui/icons-material/Share";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import PersonIcon from "@mui/icons-material/Person";

const features = [
  {
    icon: <PersonIcon sx={{ fontSize: 40 }} />,
    title: "User Registration & Authentication",
    description: "Users can register to create fitness profiles and track workouts and progress.",
  },
  {
    icon: <AdminPanelSettingsIcon sx={{ fontSize: 40 }} />,
    title: "Admin Dashboard",
    description: "Admins can view user statistics, manage user profiles, and generate reports on activity engagement.",
  },
  {
    icon: <FitnessCenterIcon sx={{ fontSize: 40 }} />,
    title: "Workout Logging",
    description: "Users can log workouts, specifying exercise type, duration, intensity, and frequency. Provide progress updates.",
  },
  {
    icon: <TrackChangesIcon sx={{ fontSize: 40 }} />,
    title: "Goal Setting & Tracking",
    description: "Allow users to set fitness goals (e.g., weight loss, strength gain) and track progress with real-time analytics.",
  },
  {
    icon: <AnalyticsIcon sx={{ fontSize: 40 }} />,
    title: "Performance Analytics",
    description: "Provide users with insights and performance charts, showing their fitness progress over time.",
  },
  {
    icon: <NotificationsActiveIcon sx={{ fontSize: 40 }} />,
    title: "Reminders & Notifications",
    description: "Send reminders for workouts or alerts about upcoming fitness goals.",
  },
  {
    icon: <ShareIcon sx={{ fontSize: 40 }} />,
    title: "Social Sharing",
    description: "Allow users to share their fitness progress with friends or join groups for motivation and accountability.",
  },
];

const AboutPage = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0a0f1a 0%, #1a1f2e 50%, #0a0f1a 100%)",
        py: 8,
      }}
    >
      <Container maxWidth="lg">
        {/* Hero Section */}
        <Box textAlign="center" mb={8}>
          <Typography
            variant="h2"
            fontWeight={800}
            color="white"
            gutterBottom
            sx={{ fontSize: { xs: "2rem", md: "3rem" } }}
          >
            About FitVerse
          </Typography>
          <Typography
            variant="h5"
            color="#477CD8"
            fontWeight={600}
            gutterBottom
          >
            Fitness Tracker & Goal Management System
          </Typography>
          <Typography
            variant="body1"
            color="rgba(255,255,255,0.8)"
            sx={{ maxWidth: 800, mx: "auto", mt: 3, lineHeight: 1.8 }}
          >
            FitVerse is a web-based fitness tracker that allows users to log workouts, track progress, 
            and set fitness goals. The system includes features such as workout history, goal-setting, 
            reminders, and performance analytics.
          </Typography>
        </Box>

        {/* Mission Section */}
        <Card
          sx={{
            mb: 8,
            borderRadius: 4,
            background: "linear-gradient(145deg, #1a1f2e 0%, #2d3748 100%)",
            border: "1px solid rgba(71, 124, 216, 0.2)",
          }}
        >
          <CardContent sx={{ p: 5 }}>
            <Typography variant="h4" fontWeight={700} color="white" gutterBottom textAlign="center">
              Our Mission
            </Typography>
            <Typography
              variant="body1"
              color="rgba(255,255,255,0.8)"
              textAlign="center"
              sx={{ maxWidth: 700, mx: "auto", lineHeight: 1.8 }}
            >
              To empower individuals on their fitness journey by providing comprehensive tools for 
              tracking workouts, setting achievable goals, and monitoring progress. We believe that 
              with the right tools and motivation, everyone can achieve their health and fitness aspirations.
            </Typography>
          </CardContent>
        </Card>

        {/* Features Section */}
        <Box mb={8}>
          <Typography
            variant="h3"
            fontWeight={700}
            color="white"
            textAlign="center"
            gutterBottom
            sx={{ mb: 5 }}
          >
            Features
          </Typography>

          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Card
                  sx={{
                    height: "100%",
                    borderRadius: 3,
                    background: "rgba(26, 31, 46, 0.8)",
                    border: "1px solid rgba(71, 124, 216, 0.15)",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      borderColor: "rgba(71, 124, 216, 0.4)",
                      boxShadow: "0 8px 24px rgba(71, 124, 216, 0.15)",
                    },
                  }}
                >
                  <CardContent sx={{ p: 4 }}>
                    <Box sx={{ display: "flex", alignItems: "flex-start", gap: 3 }}>
                      <Box
                        sx={{
                          p: 2,
                          borderRadius: 2,
                          bgcolor: "rgba(71, 124, 216, 0.15)",
                          color: "#477CD8",
                          flexShrink: 0,
                        }}
                      >
                        {feature.icon}
                      </Box>
                      <Box>
                        <Typography variant="h6" fontWeight={600} color="white" gutterBottom>
                          {index + 1}. {feature.title}
                        </Typography>
                        <Typography variant="body2" color="rgba(255,255,255,0.7)" lineHeight={1.7}>
                          {feature.description}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Why Choose Us */}
        <Card
          sx={{
            mb: 8,
            borderRadius: 4,
            background: "linear-gradient(135deg, #477CD8 0%, #3b6bbf 100%)",
          }}
        >
          <CardContent sx={{ p: 5 }}>
            <Typography variant="h4" fontWeight={700} color="white" gutterBottom textAlign="center">
              Why Choose FitVerse?
            </Typography>
            <Grid container spacing={4} sx={{ mt: 2 }}>
              {[
                "Comprehensive workout tracking with detailed analytics",
                "Personalized goal setting and progress monitoring",
                "Real-time performance insights and charts",
                "Smart reminders to keep you on track",
                "Social features for motivation and accountability",
                "Secure user authentication and data protection",
                "Admin tools for managing user engagement",
                "Mobile-friendly responsive design",
              ].map((item, i) => (
                <Grid item xs={12} md={6} key={i}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <CheckCircleIcon sx={{ color: "white" }} />
                    <Typography variant="body1" color="white">
                      {item}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>

        {/* Contact Section */}
        <Box textAlign="center">
          <Typography variant="h4" fontWeight={700} color="white" gutterBottom>
            Get Started Today
          </Typography>
          <Typography variant="body1" color="rgba(255,255,255,0.7)" sx={{ mb: 3 }}>
            Join thousands of users who are already achieving their fitness goals with FitVerse.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default AboutPage;

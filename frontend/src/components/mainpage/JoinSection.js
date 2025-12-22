import React, { useState, useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const JoinSection = ({ onGetStarted }) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem('user');
    setIsLoggedIn(!!user);
  }, []);

  const handleClick = () => {
    if (isLoggedIn) {
      navigate('/ProfilePage');
    } else {
      onGetStarted();
    }
  };

  return (
    <Box
      sx={{
        py: 10,
        px: { xs: 3, md: 8 },
        backgroundColor: "#000000ff",
        color: "#fff",
        textAlign: "center",
      }}
    >
      <Typography variant="h4" fontWeight={700} mb={2}>
        {isLoggedIn ? "Welcome Back to FitVerse" : "Join the FitVerse Community"}
      </Typography>
      <Typography
        variant="body1"
        mb={4}
        sx={{ color: "#bbb", maxWidth: "600px", mx: "auto" }}
      >
        {isLoggedIn 
          ? "Continue your fitness journey — check your progress, update your routines, and stay on track."
          : "Become part of a growing fitness community — access exclusive workouts, coaching tips, and a supportive environment to help you reach your goals."
        }
      </Typography>
      <Button
        variant="contained"
        sx={{
          backgroundColor: "#477CD8",
          "&:hover": { backgroundColor: "#0039cb" },
          px: 4,
          py: 1.5,
          borderRadius: "25px",
        }}
        onClick={handleClick}
      >
        {isLoggedIn ? "Go to Profile" : "Join Now"}
      </Button>
    </Box>
  );
};

export default JoinSection;

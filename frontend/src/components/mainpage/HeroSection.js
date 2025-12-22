import React, { useState, useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import BackgroundImage from "../../assets/images/Group23.svg";

const HeroSection = ({ onGetStarted }) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check login state from backend (same as Header)
    fetch("http://localhost:5000/api/auth/me", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setIsLoggedIn(data.loggedIn === true);
      })
      .catch(() => {
        setIsLoggedIn(false);
      });
  }, []);

  const handleClick = () => {
    if (isLoggedIn) {
      navigate('/routines');
    } else {
      onGetStarted();
    }
  };

  return (
    <Box
      sx={{
        position: "relative",
        height: "70vh",
        backgroundImage: `url(${BackgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        px: { xs: 3, md: 8 },
      }}
    >
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0, 0, 0, 0.4)",
        }}
      />

      <Box sx={{ position: "relative", zIndex: 2, maxWidth: "600px" }}>
        <Typography variant="h3" fontWeight={700} mb={2}>
          ACHIEVE YOUR FITNESS DREAMS
        </Typography>
        <Typography variant="body1" mb={3} fontSize="1.1rem">
          Through Personalized Coaching, Cutting Edge Techniques, and Support —
          We'll Help You Reach Your Fitness Goals.
        </Typography>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#477CD8",
            "&:hover": { backgroundColor: "#0039cb" },
            width: "180px",
          }}
          onClick={handleClick}
        >
          {isLoggedIn ? "My Routines" : "Get Started"}
        </Button>
      </Box>
    </Box>
  );
};

export default HeroSection;

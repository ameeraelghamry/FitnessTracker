import React from "react";
import { Box, Typography, Button } from "@mui/material";

const JoinSection = ({ onGetStarted }) => {
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
        Join the FitVerse Community
      </Typography>
      <Typography
        variant="body1"
        mb={4}
        sx={{ color: "#bbb", maxWidth: "600px", mx: "auto" }}
      >
        Become part of a growing fitness community — access exclusive workouts,
        coaching tips, and a supportive environment to help you reach your goals.
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
        onClick={onGetStarted} // ✅ triggers the same action as Get Started
      >
        Join Now
      </Button>
    </Box>
  );
};

export default JoinSection;

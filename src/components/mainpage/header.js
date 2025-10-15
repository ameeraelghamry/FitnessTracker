import React from "react";
import { AppBar, Toolbar, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";
import FitVerseLogo from "../../assets/images/FitVerse.svg"; 

const Header = () => {
  return (
    <AppBar
      position="absolute"
      elevation={0}
      sx={{
        background: "transparent",
        boxShadow: "none",
        padding: "0.5rem 2rem",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Left Logo */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <img src={FitVerseLogo} alt="FitVerse Logo" height="30" />
        </Box>

        {/* Navigation Links */}
        <Box sx={{ display: "flex", gap: "2rem" }}>
          <Button
            sx={{
              color: "white",
              textTransform: "none",
              fontWeight: 500,
            }}
            component={Link}
            to="/trainers"
          >
            Our Trainers
          </Button>
          <Button
            sx={{
              color: "white",
              textTransform: "none",
              fontWeight: 500,
            }}
            component={Link}
            to="/workouts"
          >
            Workouts
          </Button>
          <Button
            sx={{
              color: "white",
              textTransform: "none",
              fontWeight: 500,
            }}
            component={Link}
            to="/about"
          >
            About Us
          </Button>
        </Box>

        {/* Right CTA Button */}
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#477CD8",
            color: "#fff",
            borderRadius: "20px",
            padding: "6px 16px",
            textTransform: "none",
            "&:hover": { backgroundColor: "#0a1f44" },
          }}
        >
          login
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

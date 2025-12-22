import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, Button, Box, IconButton, Menu, MenuItem } from "@mui/material";
import { Link } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import FitVerseLogo from "../../assets/images/FitVerse.svg";

const Header = ({ onLoginClick }) => {
  const [user, setUser] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  // Check if user is logged in on component mount
  useEffect(() => {
    // ✅ Backend runs on port 5000 (same as Login API)
    fetch("http://localhost:5000/api/auth/me", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.loggedIn) setUser(data.user);
      })
      .catch((err) => console.error(err));
  }, []);

  // Open user menu
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Close user menu
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Logout function
  const handleLogout = async () => {
    await fetch("http://localhost:5000/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    localStorage.removeItem("user");
    setUser(null);
    handleClose();
    window.location.reload(); // Refresh to update all components
  };

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
            sx={{ color: "white", textTransform: "none", fontWeight: 500 }}
            component={Link}
            to="/trainers"
          >
            Our Trainers
          </Button>
          <Button
            sx={{ color: "white", textTransform: "none", fontWeight: 500 }}
            component={Link}
            to="/workouts"
          >
            Workouts
          </Button>
          <Button
            sx={{ color: "white", textTransform: "none", fontWeight: 500 }}
            component={Link}
            to="/about"
          >
            About Us
          </Button>
        </Box>

        {/* Right Section: Login or Profile */}
        <Box>
          {user ? (
            <>
              <IconButton
                size="large"
                color="inherit"
                component={Link}
                to="/ProfilePage"
                onClick={handleMenu}
              >
                <AccountCircleIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem disabled>Hello, {user.username}</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </>
          ) : (
            <Button
              variant="contained"
              onClick={onLoginClick}
              sx={{
                backgroundColor: "#477CD8",
                color: "#fff",
                borderRadius: "20px",
                padding: "6px 16px",
                textTransform: "none",
                "&:hover": { backgroundColor: "#0a1f44" },
              }}
            >
              Login
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

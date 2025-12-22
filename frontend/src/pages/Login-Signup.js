import React, { useState } from "react";
import { Box, Button, Paper, Typography } from "@mui/material";
import Login from "../components/mainpage/Login";
import Signup from "../components/mainpage/Signup";
import gymImage from "../assets/images/gym2.jpg";
import styles from "../mui/theme";

function App() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showForm, setShowForm] = useState(true); // new state to control visibility

  return (
    <Box sx={styles.root(gymImage)}>
      <Paper elevation={10} sx={styles.paper}>
        <Box sx={styles.titleBox}>
          <Typography variant="h4" sx={styles.mainTitle}>
            Fitness Tracker
          </Typography>
          <Typography variant="subtitle1" sx={styles.subtitle}>
            Manage your goals efficiently
          </Typography>
        </Box>

        {/* Conditionally show the form only when showForm is true */}
        {showForm && (
          <>
            {isSignUp ? (
              <Signup onClose={() => setShowForm(false)} />
            ) : (
              <Login onClose={() => setShowForm(false)} />
            )}
          </>
        )}

        {/* Show buttons only when the form is visible */}
        {showForm && (
          <Box sx={styles.buttonBox}>
            <Button
              variant={isSignUp ? "outlined" : "contained"}
              onClick={() => setIsSignUp(false)}
            >
              Login
            </Button>
            <Button
              variant={isSignUp ? "contained" : "outlined"}
              onClick={() => setIsSignUp(true)}
            >
              Sign Up
            </Button>
          </Box>
        )}

        {/* Show a button to reopen the form after closing */}
        {!showForm && (
          <Box sx={{ textAlign: "center", mt: 3 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setShowForm(true)}
            >
              Reopen Form
            </Button>
          </Box>
        )}
      </Paper>
    </Box>
  );
}

export default App;

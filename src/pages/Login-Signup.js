import React, { useState } from "react";
import { Box, Button, Paper, Typography } from "@mui/material";
import Login from "../components/Login";
import Signup from "../components/Signup";
import gymImage from "../assets/images/gym2.jpg";
import styles from "../mui/theme";

function App() {
  const [isSignUp, setIsSignUp] = useState(false);

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

        {isSignUp ? <Signup /> : <Login />}

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
      </Paper>
    </Box>
  );
}

export default App;
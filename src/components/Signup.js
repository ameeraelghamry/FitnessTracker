import React, { useState } from "react";
import { Box, TextField, Button, Alert } from "@mui/material";
import styles from "../mui/theme";
import { saveUser, userExists } from "../utils/auth";

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (userExists(email)) {
      setError("User with this email already exists.");
      return;
    }
    saveUser({ username, email, password });
    alert("Signup successful! Please log in.");
    setUsername("");
    setEmail("");
    setPassword("");
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={styles.formBox}>
      {error && <Alert severity="error">{error}</Alert>}
      <TextField
        label="Username"
        variant="filled"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        fullWidth
        required
        sx={styles.textField}
      />
      <TextField
        label="Email"
        variant="filled"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        required
        sx={styles.textField}
      />
      <TextField
        label="Password"
        type="password"
        variant="filled"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        required
        sx={styles.textField}
      />
      <Button type="submit" variant="contained" >
        Sign Up
      </Button>
    </Box>
  );
}

export default Signup;
import React, { useState } from "react";
import { Box, TextField, Button, Alert } from "@mui/material";
import styles from "../mui/theme";
import { findUser } from "../utils/auth";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    const user = findUser(email, password);
    if (!user) {
      setError("Invalid email or password.");
      return;
    }
    alert(`Welcome, ${user.username}!`);
    setEmail("");
    setPassword("");
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={styles.formBox}>
      {error && <Alert severity="error">{error}</Alert>}
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
        Login
      </Button>
    </Box>
  );
}

export default Login;
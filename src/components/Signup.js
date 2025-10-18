import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Alert,
  IconButton,
  InputAdornment,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff, Close } from "@mui/icons-material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import styles from "../mui/theme";
import { saveUser, userExists } from "../utils/auth";

function Signup({ onClose }) {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const validationSchema = Yup.object({
    username: Yup.string()
      .min(3, "Username must be at least 3 characters")
      .required("Username is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const handleSubmit = (values, { resetForm }) => {
    setError("");
    if (userExists(values.email)) {
      setError("User with this email already exists.");
      return;
    }
    saveUser(values);
    alert("Signup successful! Please log in.");
    resetForm();
  };

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        maxWidth: 400,
        p: 3,
        borderRadius: 2,
        boxShadow: 4,
        backgroundColor: "rgba(255,255,255,0.98)",
      }}
    >
      {/* Close Button */}
      {onClose && (
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            color: "grey.600",
            "&:hover": { color: "black" },
          }}
        >
          <Close />
        </IconButton>
      )}

      {/* Title */}
      <Typography
        variant="h5"
        align="center"
        sx={{ mb: 2, fontWeight: "bold", color: "primary.main" }}
      >
        Sign Up
      </Typography>

      <Formik
        initialValues={{ username: "", email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, errors, touched, handleChange, handleBlur }) => (
          <Form style={{ width: "100%" }}>
            {error && <Alert severity="error">{error}</Alert>}

            <TextField
              label="Username"
              name="username"
              variant="filled"
              fullWidth
              required
              value={values.username}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.username && Boolean(errors.username)}
              helperText={touched.username && errors.username}
              sx={styles.textField}
            />

            <TextField
              label="Email"
              name="email"
              variant="filled"
              fullWidth
              required
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.email && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              sx={styles.textField}
            />

            <TextField
              label="Password"
              name="password"
              type={showPassword ? "text" : "password"}
              variant="filled"
              fullWidth
              required
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.password && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              sx={styles.textField}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ mt: 2, fontWeight: "bold" }}
            >
              Sign Up
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
}

export default Signup;

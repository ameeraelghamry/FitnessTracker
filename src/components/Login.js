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
import { findUser } from "../utils/auth";

function Login({ onClose }) {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = (values, { resetForm }) => {
    setError("");
    const user = findUser(values.email, values.password);
    if (!user) {
      setError("Invalid email or password.");
      return;
    }
    alert(`Welcome, ${user.username}!`);
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
        Login
      </Typography>

      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, errors, touched, handleChange, handleBlur }) => (
          <Form style={{ width: "100%" }}>
            {error && <Alert severity="error">{error}</Alert>}

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
              sx={{ mt: 2, fontWeight: "500" }}
            >
              Login
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
}

export default Login;

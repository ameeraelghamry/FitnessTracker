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
import { useNavigate } from "react-router-dom";
import styles from "../../mui/theme";

function Login({ onClose }) {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (values, { resetForm }) => {
  const { email, password } = values;
  setError("");

  try {
    // ✅ Make sure to declare 'res' with const
    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include", // send session cookie
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json(); // now 'res' is defined

    if (!res.ok) {
      setError(data.error || "Invalid credentials");
      return;
    }

    localStorage.setItem(
      "user",
      JSON.stringify({ username: data.username || email })
    );

    alert(data.message || "Login successful!");
    resetForm();

    navigate("/ProfilePage");
  } catch (err) {
    console.error("Login error:", err);
    setError("Server error. Please try again later.");
  }
};


  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

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
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

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

import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import session from "express-session";
import AuthRoutes from "../routes/AuthRoutes.js";
import dotenv from "dotenv";

dotenv.config();
const app = express();

// ===== CORS =====
app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true, 
}));

// ===== Body Parser =====
app.use(bodyParser.json());

// ===== Session (MUST be BEFORE routes) =====
app.use(session({
  secret: "fitness_secret_key",
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    maxAge: 1000 * 60 * 60, // 1 hour
  },
}));

// ===== Routes =====
app.use("/api/auth", AuthRoutes);

// ===== Start Server =====
app.listen(5000, () => console.log("🚀 Server running on port 5000"));

import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import session from "express-session";
import AuthRoutes from "../routes/AuthRoutes.js";
import AdminRoutes from "../routes/AdminRoutes.js";
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

// ===== Debug Route =====
app.get("/api/test", (req, res) => {
  console.log("✅ Test route hit!");
  res.json({ message: "Server is working!" });
});

// ===== Routes =====
console.log("📌 Registering routes...");
app.use("/api/auth", AuthRoutes);
console.log("✅ Auth routes registered");
app.use("/api/admin", AdminRoutes);
console.log("✅ Admin routes registered");

// ===== Start Server =====
app.listen(5000, () => console.log("🚀 Server running on port 5000"));

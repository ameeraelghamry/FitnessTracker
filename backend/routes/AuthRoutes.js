import express from "express";
import AuthController from "../controllers/AuthController.js";

const router = express.Router();

// Helper function to wrap async route handlers
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

router.post("/signup", asyncHandler((req, res) => AuthController.signup(req, res)));
router.post("/login", asyncHandler((req, res) => AuthController.login(req, res)));
router.post("/logout", (req, res) => AuthController.logout(req, res));
router.get("/me", (req, res) => AuthController.checkAuth(req, res));


export default router;

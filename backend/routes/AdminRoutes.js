import express from "express";
import AdminController from "../controllers/AdminController.js";

const router = express.Router();

// Helper function to wrap async route handlers
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Test route
router.get("/test", (req, res) => {
  console.log("✅ Admin test route hit!");
  res.json({ message: "Admin routes working!" });
});

// Get all users
router.get("/users", asyncHandler((req, res) => AdminController.getUsers(req, res)));

// Create new user
router.post("/users", asyncHandler((req, res) => AdminController.createUser(req, res)));

// Get statistics
router.get("/stats", asyncHandler((req, res) => AdminController.getStatistics(req, res)));

// Get user workout statistics
router.get("/users/:userId/workouts", asyncHandler((req, res) => AdminController.getUserWorkoutStats(req, res)));

// Get user types distribution
router.get("/stats/user-types", asyncHandler((req, res) => AdminController.getUserTypesDistribution(req, res)));

// Get user roles distribution
router.get("/stats/user-roles", asyncHandler((req, res) => AdminController.getUserRolesDistribution(req, res)));

// Get website traffic
router.get("/stats/traffic", asyncHandler((req, res) => AdminController.getWebsiteTraffic(req, res)));

// Delete user
router.delete("/users/:userId", asyncHandler((req, res) => AdminController.deleteUser(req, res)));

// Update user status
router.put("/users/:userId/status", asyncHandler((req, res) => AdminController.updateUserStatus(req, res)));

export default router;


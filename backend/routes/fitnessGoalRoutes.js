import express from "express";
import FitnessGoalController from "../controllers/fitnessGoalController.js";

const router = express.Router();

router.get("/", (req, res) => FitnessGoalController.getGoals(req, res));
router.get("/active", (req, res) => FitnessGoalController.getActiveGoals(req, res));
router.get("/upcoming", (req, res) => FitnessGoalController.getUpcomingGoals(req, res));
router.post("/", (req, res) => FitnessGoalController.createGoal(req, res));
router.put("/:id/progress", (req, res) => FitnessGoalController.updateProgress(req, res));
router.put("/:id/complete", (req, res) => FitnessGoalController.completeGoal(req, res));
router.delete("/:id", (req, res) => FitnessGoalController.deleteGoal(req, res));

export default router;

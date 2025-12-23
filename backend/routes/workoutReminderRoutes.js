import express from "express";
import WorkoutReminderController from "../controllers/workoutReminderController.js";

const router = express.Router();

router.get("/", (req, res) => WorkoutReminderController.getReminders(req, res));
router.get("/today", (req, res) => WorkoutReminderController.getTodayReminders(req, res));
router.post("/", (req, res) => WorkoutReminderController.createReminder(req, res));
router.put("/:id", (req, res) => WorkoutReminderController.updateReminder(req, res));
router.put("/:id/toggle", (req, res) => WorkoutReminderController.toggleReminder(req, res));
router.delete("/:id", (req, res) => WorkoutReminderController.deleteReminder(req, res));
router.post("/generate-notifications", (req, res) => WorkoutReminderController.generateReminderNotifications(req, res));

export default router;

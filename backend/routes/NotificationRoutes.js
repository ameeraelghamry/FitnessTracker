import express from "express";
import NotificationController from "../controllers/NotificationController.js";

const router = express.Router();

// Helper function to wrap async route handlers
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Get notifications for a user
router.get("/:userId", asyncHandler((req, res) => NotificationController.getNotifications(req, res)));

// Create a notification
router.post("/", asyncHandler((req, res) => NotificationController.createNotification(req, res)));

// Mark notification as read
router.put("/:notificationId/read", asyncHandler((req, res) => NotificationController.markAsRead(req, res)));

// Mark all notifications as read for a user
router.put("/:userId/read-all", asyncHandler((req, res) => NotificationController.markAllAsRead(req, res)));

// Delete a notification
router.delete("/:notificationId", asyncHandler((req, res) => NotificationController.deleteNotification(req, res)));

// Send workout reminder to all users (admin)
router.post("/send-reminder", asyncHandler((req, res) => NotificationController.sendWorkoutReminder(req, res)));

// Send reminder to specific user
router.post("/send-reminder/:userId", asyncHandler((req, res) => NotificationController.sendReminderToUser(req, res)));

export default router;

import express from "express";
import NotificationController from "../controllers/notificationController.js";

const router = express.Router();

router.get("/", (req, res) => NotificationController.getNotifications(req, res));
router.get("/unread-count", (req, res) => NotificationController.getUnreadCount(req, res));
router.put("/:id/read", (req, res) => NotificationController.markAsRead(req, res));
router.put("/read-all", (req, res) => NotificationController.markAllAsRead(req, res));
router.delete("/:id", (req, res) => NotificationController.deleteNotification(req, res));

export default router;

import Notification from "../models/Notification.js";

class NotificationController {
  // Get all notifications for logged-in user
  getNotifications(req, res) {
    const userId = req.session.user?.id;
    if (!userId) return res.status(401).json({ error: "Not authenticated" });

    Notification.getByUserId(userId, (err, results) => {
      if (err) return res.status(500).json({ error: "Database error" });
      res.json(results);
    });
  }

  // Get unread count
  getUnreadCount(req, res) {
    const userId = req.session.user?.id;
    if (!userId) return res.status(401).json({ error: "Not authenticated" });

    Notification.getUnreadCount(userId, (err, results) => {
      if (err) return res.status(500).json({ error: "Database error" });
      res.json({ count: results[0]?.count || 0 });
    });
  }

  // Mark single notification as read
  markAsRead(req, res) {
    const userId = req.session.user?.id;
    const { id } = req.params;
    if (!userId) return res.status(401).json({ error: "Not authenticated" });

    Notification.markAsRead(id, userId, (err) => {
      if (err) return res.status(500).json({ error: "Database error" });
      res.json({ message: "Notification marked as read" });
    });
  }

  // Mark all as read
  markAllAsRead(req, res) {
    const userId = req.session.user?.id;
    if (!userId) return res.status(401).json({ error: "Not authenticated" });

    Notification.markAllAsRead(userId, (err) => {
      if (err) return res.status(500).json({ error: "Database error" });
      res.json({ message: "All notifications marked as read" });
    });
  }

  // Delete notification
  deleteNotification(req, res) {
    const userId = req.session.user?.id;
    const { id } = req.params;
    if (!userId) return res.status(401).json({ error: "Not authenticated" });

    Notification.delete(id, userId, (err) => {
      if (err) return res.status(500).json({ error: "Database error" });
      res.json({ message: "Notification deleted" });
    });
  }
}

export default new NotificationController();

import NotificationService from "../services/NotificationService.js";

class NotificationController {
  // Get notifications for a user
  async getNotifications(req, res) {
    try {
      const { userId } = req.params;
      const notifications = await NotificationService.getNotifications(userId);
      res.json(notifications);
    } catch (error) {
      console.error("Error in getNotifications:", error);
      res.status(500).json({ error: "Failed to fetch notifications" });
    }
  }

  // Create a notification
  async createNotification(req, res) {
    try {
      const { userId, type, title, message } = req.body;
      
      if (!userId || !title || !message) {
        return res.status(400).json({ error: "userId, title, and message are required" });
      }

      const notification = await NotificationService.createNotification(
        userId, 
        type || "general", 
        title, 
        message
      );
      res.status(201).json(notification);
    } catch (error) {
      console.error("Error in createNotification:", error);
      res.status(500).json({ error: "Failed to create notification" });
    }
  }

  // Mark notification as read
  async markAsRead(req, res) {
    try {
      const { notificationId } = req.params;
      await NotificationService.markAsRead(notificationId);
      res.json({ message: "Notification marked as read" });
    } catch (error) {
      console.error("Error in markAsRead:", error);
      res.status(500).json({ error: "Failed to update notification" });
    }
  }

  // Mark all notifications as read
  async markAllAsRead(req, res) {
    try {
      const { userId } = req.params;
      await NotificationService.markAllAsRead(userId);
      res.json({ message: "All notifications marked as read" });
    } catch (error) {
      console.error("Error in markAllAsRead:", error);
      res.status(500).json({ error: "Failed to update notifications" });
    }
  }

  // Delete a notification
  async deleteNotification(req, res) {
    try {
      const { notificationId } = req.params;
      await NotificationService.deleteNotification(notificationId);
      res.json({ message: "Notification deleted" });
    } catch (error) {
      console.error("Error in deleteNotification:", error);
      res.status(500).json({ error: "Failed to delete notification" });
    }
  }

  // Send workout reminder to all users (admin only)
  async sendWorkoutReminder(req, res) {
    try {
      const { message } = req.body;
      const result = await NotificationService.sendWorkoutReminder(message);
      res.json({ 
        message: `Workout reminder sent to ${result.sent} users`,
        sent: result.sent 
      });
    } catch (error) {
      console.error("Error in sendWorkoutReminder:", error);
      res.status(500).json({ error: "Failed to send reminders" });
    }
  }

  // Send reminder to specific user
  async sendReminderToUser(req, res) {
    try {
      const { userId } = req.params;
      const { title, message, type } = req.body;

      if (!title || !message) {
        return res.status(400).json({ error: "title and message are required" });
      }

      const notification = await NotificationService.sendReminderToUser(
        userId, 
        title, 
        message, 
        type
      );
      res.status(201).json(notification);
    } catch (error) {
      console.error("Error in sendReminderToUser:", error);
      res.status(500).json({ error: "Failed to send reminder" });
    }
  }
}

export default new NotificationController();

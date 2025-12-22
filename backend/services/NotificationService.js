import Database from "../config/database.js";

class NotificationService {
  // Get notifications for a user
  getNotifications(userId) {
    return new Promise((resolve, reject) => {
      const db = Database.getConnection();
      
      db.query(
        `SELECT * FROM notifications WHERE user_id = ? ORDER BY created_at DESC LIMIT 50`,
        [userId],
        (err, results) => {
          if (err) {
            console.error("Error fetching notifications:", err);
            return resolve([]); // Return empty array if table doesn't exist
          }
          resolve(results);
        }
      );
    });
  }

  // Create a notification
  createNotification(userId, type, title, message) {
    return new Promise((resolve, reject) => {
      const db = Database.getConnection();
      
      db.query(
        `INSERT INTO notifications (user_id, type, title, message, \`read\`, created_at) 
         VALUES (?, ?, ?, ?, false, NOW())`,
        [userId, type, title, message],
        (err, result) => {
          if (err) {
            console.error("Error creating notification:", err);
            return reject("Failed to create notification");
          }
          resolve({ id: result.insertId, userId, type, title, message, read: false });
        }
      );
    });
  }

  // Mark notification as read
  markAsRead(notificationId) {
    return new Promise((resolve, reject) => {
      const db = Database.getConnection();
      
      db.query(
        `UPDATE notifications SET \`read\` = true WHERE id = ?`,
        [notificationId],
        (err, result) => {
          if (err) {
            console.error("Error marking notification as read:", err);
            return reject("Failed to update notification");
          }
          resolve(result);
        }
      );
    });
  }

  // Mark all notifications as read for a user
  markAllAsRead(userId) {
    return new Promise((resolve, reject) => {
      const db = Database.getConnection();
      
      db.query(
        `UPDATE notifications SET \`read\` = true WHERE user_id = ?`,
        [userId],
        (err, result) => {
          if (err) {
            console.error("Error marking all notifications as read:", err);
            return reject("Failed to update notifications");
          }
          resolve(result);
        }
      );
    });
  }

  // Delete a notification
  deleteNotification(notificationId) {
    return new Promise((resolve, reject) => {
      const db = Database.getConnection();
      
      db.query(
        `DELETE FROM notifications WHERE id = ?`,
        [notificationId],
        (err, result) => {
          if (err) {
            console.error("Error deleting notification:", err);
            return reject("Failed to delete notification");
          }
          resolve(result);
        }
      );
    });
  }

  // Send workout reminder to all users (can be called by admin or scheduled job)
  sendWorkoutReminder(message = "Time for your workout! Stay consistent and crush your goals! 💪") {
    return new Promise((resolve, reject) => {
      const db = Database.getConnection();
      
      // Get all user IDs
      db.query("SELECT id FROM users", (err, users) => {
        if (err) {
          console.error("Error fetching users:", err);
          return reject("Failed to fetch users");
        }

        const notifications = users.map(user => [
          user.id,
          "workout_reminder",
          "Workout Reminder",
          message,
          false,
        ]);

        if (notifications.length === 0) {
          return resolve({ sent: 0 });
        }

        db.query(
          `INSERT INTO notifications (user_id, type, title, message, \`read\`, created_at) 
           VALUES ?`,
          [notifications.map(n => [...n, new Date()])],
          (err, result) => {
            if (err) {
              console.error("Error sending reminders:", err);
              return reject("Failed to send reminders");
            }
            console.log(`✅ Sent workout reminders to ${users.length} users`);
            resolve({ sent: users.length });
          }
        );
      });
    });
  }

  // Send reminder to specific user
  sendReminderToUser(userId, title, message, type = "workout_reminder") {
    return this.createNotification(userId, type, title, message);
  }
}

export default new NotificationService();

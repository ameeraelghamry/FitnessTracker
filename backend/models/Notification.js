import Database from "../config/database.js";

class Notification {
  static getByUserId(userId, callback) {
    const db = Database.getConnection();
    db.query(
      "SELECT * FROM notifications WHERE user_id = ? ORDER BY created_at DESC LIMIT 50",
      [userId],
      callback
    );
  }

  static getUnreadCount(userId, callback) {
    const db = Database.getConnection();
    db.query(
      "SELECT COUNT(*) as count FROM notifications WHERE user_id = ? AND is_read = FALSE",
      [userId],
      callback
    );
  }

  static create(userId, type, title, message, callback) {
    const db = Database.getConnection();
    db.query(
      "INSERT INTO notifications (user_id, type, title, message) VALUES (?, ?, ?, ?)",
      [userId, type, title, message],
      callback
    );
  }

  static markAsRead(notificationId, userId, callback) {
    const db = Database.getConnection();
    db.query(
      "UPDATE notifications SET is_read = TRUE WHERE id = ? AND user_id = ?",
      [notificationId, userId],
      callback
    );
  }

  static markAllAsRead(userId, callback) {
    const db = Database.getConnection();
    db.query(
      "UPDATE notifications SET is_read = TRUE WHERE user_id = ?",
      [userId],
      callback
    );
  }

  static delete(notificationId, userId, callback) {
    const db = Database.getConnection();
    db.query(
      "DELETE FROM notifications WHERE id = ? AND user_id = ?",
      [notificationId, userId],
      callback
    );
  }
}

export default Notification;

import Database from "../config/database.js";

class WorkoutReminder {
  static getByUserId(userId, callback) {
    const db = Database.getConnection();
    db.query(
      `SELECT wr.*, r.name as routine_name 
       FROM workout_reminders wr 
       LEFT JOIN routines r ON wr.routine_id = r.id 
       WHERE wr.user_id = ? 
       ORDER BY wr.reminder_time ASC`,
      [userId],
      callback
    );
  }

  static getActiveByUserId(userId, callback) {
    const db = Database.getConnection();
    db.query(
      `SELECT wr.*, r.name as routine_name 
       FROM workout_reminders wr 
       LEFT JOIN routines r ON wr.routine_id = r.id 
       WHERE wr.user_id = ? AND wr.is_active = TRUE
       ORDER BY wr.reminder_time ASC`,
      [userId],
      callback
    );
  }

  static create(userId, routineId, title, reminderTime, reminderDays, callback) {
    const db = Database.getConnection();
    db.query(
      `INSERT INTO workout_reminders (user_id, routine_id, title, reminder_time, reminder_days) 
       VALUES (?, ?, ?, ?, ?)`,
      [userId, routineId, title, reminderTime, reminderDays],
      callback
    );
  }

  static update(reminderId, userId, title, reminderTime, reminderDays, isActive, callback) {
    const db = Database.getConnection();
    db.query(
      `UPDATE workout_reminders 
       SET title = ?, reminder_time = ?, reminder_days = ?, is_active = ? 
       WHERE id = ? AND user_id = ?`,
      [title, reminderTime, reminderDays, isActive, reminderId, userId],
      callback
    );
  }

  static toggleActive(reminderId, userId, isActive, callback) {
    const db = Database.getConnection();
    db.query(
      "UPDATE workout_reminders SET is_active = ? WHERE id = ? AND user_id = ?",
      [isActive, reminderId, userId],
      callback
    );
  }

  static delete(reminderId, userId, callback) {
    const db = Database.getConnection();
    db.query(
      "DELETE FROM workout_reminders WHERE id = ? AND user_id = ?",
      [reminderId, userId],
      callback
    );
  }

  // Get reminders for today
  static getTodayReminders(userId, callback) {
    const db = Database.getConnection();
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
    db.query(
      `SELECT wr.*, r.name as routine_name 
       FROM workout_reminders wr 
       LEFT JOIN routines r ON wr.routine_id = r.id 
       WHERE wr.user_id = ? AND wr.is_active = TRUE 
       AND wr.reminder_days LIKE ?`,
      [userId, `%${today}%`],
      callback
    );
  }
}

export default WorkoutReminder;

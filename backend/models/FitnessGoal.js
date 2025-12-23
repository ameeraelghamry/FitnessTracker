import Database from "../config/database.js";

class FitnessGoal {
  static getByUserId(userId, callback) {
    const db = Database.getConnection();
    db.query(
      "SELECT * FROM fitness_goals WHERE user_id = ? ORDER BY target_date ASC",
      [userId],
      callback
    );
  }

  static getActiveByUserId(userId, callback) {
    const db = Database.getConnection();
    db.query(
      "SELECT * FROM fitness_goals WHERE user_id = ? AND status = 'active' ORDER BY target_date ASC",
      [userId],
      callback
    );
  }

  static create(userId, title, description, targetDate, goalType, targetValue, unit, callback) {
    const db = Database.getConnection();
    db.query(
      `INSERT INTO fitness_goals (user_id, title, description, target_date, goal_type, target_value, unit) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [userId, title, description, targetDate, goalType, targetValue, unit],
      callback
    );
  }

  static updateProgress(goalId, userId, currentValue, callback) {
    const db = Database.getConnection();
    db.query(
      "UPDATE fitness_goals SET current_value = ? WHERE id = ? AND user_id = ?",
      [currentValue, goalId, userId],
      callback
    );
  }

  static updateStatus(goalId, userId, status, callback) {
    const db = Database.getConnection();
    db.query(
      "UPDATE fitness_goals SET status = ? WHERE id = ? AND user_id = ?",
      [status, goalId, userId],
      callback
    );
  }

  static delete(goalId, userId, callback) {
    const db = Database.getConnection();
    db.query(
      "DELETE FROM fitness_goals WHERE id = ? AND user_id = ?",
      [goalId, userId],
      callback
    );
  }

  // Get goals approaching deadline (within 3 days)
  static getUpcoming(userId, callback) {
    const db = Database.getConnection();
    db.query(
      `SELECT * FROM fitness_goals 
       WHERE user_id = ? AND status = 'active' 
       AND target_date BETWEEN CURDATE() AND DATE_ADD(CURDATE(), INTERVAL 3 DAY)
       ORDER BY target_date ASC`,
      [userId],
      callback
    );
  }
}

export default FitnessGoal;

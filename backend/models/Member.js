import User from "./User.js";
import Database from "../config/database.js";

class Member extends User {
  constructor(id, username, email, password) {
    super(id, username, email, password, "Member");
  }

  // Get routines for this member
  static getRoutinesForUser(userId, callback) {
    const db = Database.getConnection();
    db.query(
      "SELECT * FROM routines WHERE user_id = ? ORDER BY created_at DESC",
      [userId],
      callback
    );
  }

  // Get profile stats for this member
  static getProfileStats(userId, callback) {
    const db = Database.getConnection();
    db.query(
      `SELECT 
        (SELECT COUNT(*) FROM routines WHERE user_id = ?) as routineCount,
        (SELECT COUNT(*) FROM routine_exercises re 
         JOIN routines r ON re.routine_id = r.id 
         WHERE r.user_id = ?) as exerciseCount`,
      [userId, userId],
      callback
    );
  }

  // Check if user can access member features
  canAccessMemberFeatures() {
    return true;
  }

  // Check if user can access admin features
  canAccessAdminFeatures() {
    return false;
  }
}

export default Member;

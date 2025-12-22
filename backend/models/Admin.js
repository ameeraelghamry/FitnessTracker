import User from "./User.js";
import Member from "./Member.js";
import Database from "../config/database.js";

class Admin extends User {
  constructor(id, username, email, password) {
    super(id, username, email, password, "Admin");
  }

  // Inherit Member capabilities
  static getRoutinesForUser(userId, callback) {
    return Member.getRoutinesForUser(userId, callback);
  }

  static getProfileStats(userId, callback) {
    return Member.getProfileStats(userId, callback);
  }

  // Admin-specific: Get all users
  static getAllUsers(callback) {
    const db = Database.getConnection();
    db.query(
      "SELECT id, username, email, role, status, created_at FROM users ORDER BY created_at DESC",
      callback
    );
  }

  // Admin-specific: Delete user
  static deleteUser(userId, callback) {
    const db = Database.getConnection();
    db.query("DELETE FROM users WHERE id = ?", [userId], callback);
  }

  // Admin-specific: Update user status
  static updateUserStatus(userId, status, callback) {
    const db = Database.getConnection();
    db.query(
      "UPDATE users SET status = ? WHERE id = ?",
      [status, userId],
      callback
    );
  }

  // Admin-specific: Get system statistics
  static getSystemStats(callback) {
    const db = Database.getConnection();
    db.query(
      `SELECT 
        (SELECT COUNT(*) FROM users) as totalUsers,
        (SELECT COUNT(*) FROM users WHERE role = 'Admin') as adminCount,
        (SELECT COUNT(*) FROM users WHERE role = 'Member') as memberCount,
        (SELECT COUNT(*) FROM routines) as totalRoutines`,
      callback
    );
  }

  // Check if user can access member features
  canAccessMemberFeatures() {
    return true;
  }

  // Check if user can access admin features
  canAccessAdminFeatures() {
    return true;
  }
}

export default Admin;

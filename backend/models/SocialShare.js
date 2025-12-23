import Database from "../config/database.js";

class SocialShare {
  static getByUserId(userId, callback) {
    const db = Database.getConnection();
    db.query(
      `SELECT ss.*, r.name as routine_name 
       FROM social_shares ss 
       LEFT JOIN routines r ON ss.routine_id = r.id 
       WHERE ss.user_id = ? 
       ORDER BY ss.shared_at DESC LIMIT 50`,
      [userId],
      callback
    );
  }

  static create(userId, routineId, platform, shareType, message, callback) {
    const db = Database.getConnection();
    db.query(
      "INSERT INTO social_shares (user_id, routine_id, platform, share_type, message) VALUES (?, ?, ?, ?, ?)",
      [userId, routineId, platform, shareType, message],
      callback
    );
  }

  static getShareCount(userId, callback) {
    const db = Database.getConnection();
    db.query(
      "SELECT platform, COUNT(*) as count FROM social_shares WHERE user_id = ? GROUP BY platform",
      [userId],
      callback
    );
  }

  static delete(shareId, userId, callback) {
    const db = Database.getConnection();
    db.query(
      "DELETE FROM social_shares WHERE id = ? AND user_id = ?",
      [shareId, userId],
      callback
    );
  }
}

export default SocialShare;

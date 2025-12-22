import Database from "../config/database.js";

class SocialShareService {
  // Get user's shareable stats
  getUserStats(userId) {
    return new Promise((resolve, reject) => {
      const db = Database.getConnection();
      
      // Get user info
      db.query("SELECT id, username, email FROM users WHERE id = ?", [userId], (err, userResult) => {
        if (err) {
          console.error("Error fetching user:", err);
          return reject("Database error");
        }
        
        if (userResult.length === 0) {
          return reject("User not found");
        }

        const user = userResult[0];

        // Check if user_stats table exists, if not return default stats
        db.query(
          `SELECT TABLE_NAME FROM information_schema.TABLES 
           WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'user_stats'`,
          (tableErr, tables) => {
            if (tableErr || tables.length === 0) {
              // Return default stats if table doesn't exist
              return resolve({
                userId: user.id,
                username: user.username,
                totalWorkouts: 0,
                totalVolume: 0,
                totalDuration: 0,
                currentStreak: 0,
                longestStreak: 0,
                achievements: [],
                memberSince: null,
              });
            }

            // Get user stats
            db.query(
              `SELECT * FROM user_stats WHERE user_id = ?`,
              [userId],
              (statsErr, statsResult) => {
                if (statsErr || statsResult.length === 0) {
                  return resolve({
                    userId: user.id,
                    username: user.username,
                    totalWorkouts: 0,
                    totalVolume: 0,
                    totalDuration: 0,
                    currentStreak: 0,
                    longestStreak: 0,
                    achievements: [],
                    memberSince: null,
                  });
                }

                const stats = statsResult[0];
                resolve({
                  userId: user.id,
                  username: user.username,
                  totalWorkouts: stats.total_workouts || 0,
                  totalVolume: stats.total_volume || 0,
                  totalDuration: stats.total_duration || 0,
                  currentStreak: stats.current_streak || 0,
                  longestStreak: stats.longest_streak || 0,
                  achievements: [],
                  memberSince: stats.created_at,
                });
              }
            );
          }
        );
      });
    });
  }

  // Log a social share
  logShare(userId, platform, contentType, contentId = null) {
    return new Promise((resolve, reject) => {
      const db = Database.getConnection();
      
      db.query(
        `INSERT INTO social_shares (user_id, platform, content_type, content_id, shared_at) 
         VALUES (?, ?, ?, ?, NOW())`,
        [userId, platform, contentType, contentId],
        (err, result) => {
          if (err) {
            console.error("Error logging share:", err);
            // Don't reject, just log the error - sharing should still work
            return resolve({ logged: false });
          }
          console.log(`✅ Share logged: User ${userId} shared ${contentType} on ${platform}`);
          resolve({ logged: true, shareId: result.insertId });
        }
      );
    });
  }

  // Get share statistics for admin
  getShareStats() {
    return new Promise((resolve, reject) => {
      const db = Database.getConnection();
      
      db.query(
        `SELECT 
          platform, 
          COUNT(*) as count,
          DATE(shared_at) as date
         FROM social_shares 
         WHERE shared_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)
         GROUP BY platform, DATE(shared_at)
         ORDER BY date DESC`,
        (err, results) => {
          if (err) {
            console.error("Error fetching share stats:", err);
            return resolve([]);
          }
          resolve(results);
        }
      );
    });
  }

  // Get total shares by platform
  getTotalSharesByPlatform() {
    return new Promise((resolve, reject) => {
      const db = Database.getConnection();
      
      db.query(
        `SELECT platform, COUNT(*) as count FROM social_shares GROUP BY platform`,
        (err, results) => {
          if (err) {
            console.error("Error fetching total shares:", err);
            return resolve([]);
          }
          resolve(results);
        }
      );
    });
  }

  // Get user's share history
  getUserShares(userId) {
    return new Promise((resolve, reject) => {
      const db = Database.getConnection();
      
      db.query(
        `SELECT * FROM social_shares WHERE user_id = ? ORDER BY shared_at DESC LIMIT 50`,
        [userId],
        (err, results) => {
          if (err) {
            console.error("Error fetching user shares:", err);
            return resolve([]);
          }
          resolve(results);
        }
      );
    });
  }

  // Generate share content for a user
  generateShareContent(userId, type = "progress") {
    return new Promise(async (resolve, reject) => {
      try {
        const stats = await this.getUserStats(userId);
        
        let content = {};
        
        switch (type) {
          case "progress":
            content = {
              title: `${stats.username}'s Fitness Progress on FitVerse`,
              text: `I've completed ${stats.totalWorkouts} workouts with ${stats.totalVolume.toLocaleString()} kg total volume on FitVerse! 💪 Join me on my fitness journey!`,
              hashtags: ["FitVerse", "fitness", "workout", "progress", "motivation"],
            };
            break;
          
          case "streak":
            content = {
              title: `${stats.username} is on a ${stats.currentStreak} day streak!`,
              text: `I'm on a ${stats.currentStreak} day workout streak on FitVerse! 🔥 My longest streak is ${stats.longestStreak} days. Let's keep pushing!`,
              hashtags: ["FitVerse", "streak", "consistency", "fitness", "motivation"],
            };
            break;
          
          case "achievement":
            content = {
              title: `${stats.username} unlocked a new achievement!`,
              text: `Just unlocked a new achievement on FitVerse! 🏆 Join me and start your fitness journey today!`,
              hashtags: ["FitVerse", "achievement", "fitness", "goals", "milestone"],
            };
            break;
          
          case "workout":
            content = {
              title: `${stats.username} just crushed a workout!`,
              text: `Just finished an amazing workout on FitVerse! 💪 Track your progress and crush your goals with me!`,
              hashtags: ["FitVerse", "workout", "fitness", "gym", "exercise"],
            };
            break;
          
          case "invite":
            content = {
              title: `Join ${stats.username} on FitVerse`,
              text: `I'm tracking my fitness goals on FitVerse! Join me for motivation and accountability. Let's crush our goals together! 🏋️‍♂️`,
              hashtags: ["FitVerse", "fitness", "accountability", "goals", "health"],
            };
            break;
          
          default:
            content = {
              title: `${stats.username} on FitVerse`,
              text: `Check out FitVerse - the ultimate fitness tracker for achieving your health goals!`,
              hashtags: ["FitVerse", "fitness", "health"],
            };
        }

        content.stats = stats;
        content.shareUrl = `https://fitverse.com/profile/${userId}`;
        
        resolve(content);
      } catch (error) {
        reject(error);
      }
    });
  }
}

export default new SocialShareService();

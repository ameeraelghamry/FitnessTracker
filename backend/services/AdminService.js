import Database from "../config/database.js";
import bcrypt from "bcryptjs";

class AdminService {
  // Get all users from database
  getAllUsers() {
    return new Promise((resolve, reject) => {
      try {
        const db = Database.getConnection();
        
        if (!db) {
          console.error("❌ Database connection is null!");
          return reject("Database connection not available");
        }
        
        console.log("🔍 AdminService: Starting getAllUsers...");
        
        // First, check what columns exist in the users table
        db.query("DESCRIBE users", (descErr, columns) => {
          if (descErr) {
            console.error("❌ Error describing users table:", descErr);
            return reject("Database error: " + descErr.message);
          }
          
          // Get column names
          const columnNames = columns.map(col => col.Field);
          console.log("📋 Users table columns:", columnNames);
          
          // Build query based on available columns
          let selectColumns = ["id"];
          
          if (columnNames.includes("username")) selectColumns.push("username");
          if (columnNames.includes("name")) selectColumns.push("name");
          if (columnNames.includes("email")) selectColumns.push("email");
          if (columnNames.includes("role")) selectColumns.push("role");
          if (columnNames.includes("created_at")) selectColumns.push("created_at");
          if (columnNames.includes("createdAt")) selectColumns.push("createdAt");
          
          let query = `SELECT ${selectColumns.join(", ")} FROM users`;
          
          // Add ORDER BY if created_at exists
          if (columnNames.includes("created_at")) {
            query += " ORDER BY created_at DESC";
          } else if (columnNames.includes("createdAt")) {
            query += " ORDER BY createdAt DESC";
          } else {
            query += " ORDER BY id DESC";
          }
          
          console.log("📝 Query:", query);
          
          db.query(query, (err, results) => {
            if (err) {
              console.error("❌ Error fetching users:", err);
              return reject("Database error: " + err.message);
            }
            console.log(`✅ Fetched ${results.length} users from database`);
            resolve(results);
          });
        });
      } catch (error) {
        console.error("❌ Exception in getAllUsers:", error);
        reject("Exception: " + error.message);
      }
    });
  }

  // Get statistics from database
  getStatistics() {
    return new Promise((resolve, reject) => {
      const db = Database.getConnection();
      
      // Get total users count
      db.query("SELECT COUNT(*) as total FROM users", (err, userCount) => {
        if (err) {
          console.error("Error fetching user count:", err);
          return reject("Database error");
        }

        // Get users with questionnaires (memberships)
        db.query(
          "SELECT COUNT(DISTINCT user_id) as count FROM questionnaires",
          (err, membershipCount) => {
            if (err) {
              // If questionnaires table doesn't exist, set to 0
              console.log("Questionnaires table might not exist, setting count to 0");
              membershipCount = [{ count: 0 }];
            }

            // Since created_at doesn't exist, set pending to 0
            const pendingCount = 0;

            resolve({
              totalUsers: userCount[0].total,
              memberships: membershipCount ? membershipCount[0].count : 0,
              pending: pendingCount,
            });
          }
        );
      });
    });
  }

  // Get user workout statistics
  getUserWorkoutStats(userId) {
    return new Promise((resolve, reject) => {
      const db = Database.getConnection();
      
      // Check if workouts table exists, if not return empty array
      db.query(
        `SELECT TABLE_NAME FROM information_schema.TABLES 
         WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'workouts'`,
        (err, tables) => {
          if (err || tables.length === 0) {
            // No workouts table, return empty stats
            return resolve([]);
          }

          // Query workouts for this user
          db.query(
            `SELECT DATE(created_at) as date, body_parts 
             FROM workouts 
             WHERE user_id = ? 
             ORDER BY created_at DESC`,
            [userId],
            (err, results) => {
              if (err) {
                console.error("Error fetching workout stats:", err);
                return resolve([]);
              }

              // Process results to match expected format
              const workoutStats = results.map(row => ({
                date: row.date,
                parts: row.body_parts ? JSON.parse(row.body_parts) : [],
              }));

              resolve(workoutStats);
            }
          );
        }
      );
    });
  }

  // Get user types distribution (for chart)
  getUserTypesDistribution() {
    return new Promise((resolve, reject) => {
      const db = Database.getConnection();
      
      db.query(
        `SELECT 
          COUNT(*) as total,
          COUNT(DISTINCT q.user_id) as with_questionnaire,
          COUNT(*) - COUNT(DISTINCT q.user_id) as without_questionnaire
         FROM users u
         LEFT JOIN questionnaires q ON u.id = q.user_id`,
        (err, results) => {
          if (err) {
            console.error("Error fetching user types:", err);
            return reject("Database error");
          }

          resolve({
            withQuestionnaire: results[0].with_questionnaire || 0,
            withoutQuestionnaire: results[0].without_questionnaire || 0,
          });
        }
      );
    });
  }

  // Get website traffic (simplified since created_at doesn't exist)
  getWebsiteTraffic() {
    return new Promise((resolve, reject) => {
      const db = Database.getConnection();
      
      // Since created_at doesn't exist, return empty array
      // You can add this column later: ALTER TABLE users ADD COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      resolve([]);
    });
  }

  // Get user roles distribution (for chart)
  getUserRolesDistribution() {
    return new Promise((resolve, reject) => {
      const db = Database.getConnection();
      
      db.query(
        `SELECT role, COUNT(*) as count FROM users GROUP BY role ORDER BY count DESC`,
        (err, results) => {
          if (err) {
            console.error("Error fetching user roles:", err);
            // Return default data if query fails
            return resolve([
              { role: "User", count: 0 },
              { role: "Admin", count: 0 }
            ]);
          }

          // Format results - capitalize role names
          const formattedResults = results.map(row => ({
            role: row.role ? row.role.charAt(0).toUpperCase() + row.role.slice(1).toLowerCase() : "User",
            count: row.count
          }));

          console.log("✅ User roles distribution:", formattedResults);
          resolve(formattedResults);
        }
      );
    });
  }

  // Create new user
  createUser(username, email, password, role) {
    return new Promise((resolve, reject) => {
      const db = Database.getConnection();
      
      // First check if user with this email already exists
      db.query("SELECT * FROM users WHERE email = ?", [email], async (err, results) => {
        if (err) {
          console.error("Error checking existing user:", err);
          return reject("Database error");
        }
        
        if (results.length > 0) {
          return reject("User with this email already exists");
        }
        
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Check if role column exists
        db.query(
          `SELECT COLUMN_NAME FROM information_schema.COLUMNS 
           WHERE TABLE_SCHEMA = DATABASE() 
           AND TABLE_NAME = 'users' 
           AND COLUMN_NAME = 'role'`,
          (roleErr, roleColumns) => {
            if (roleErr) {
              console.error("Error checking role column:", roleErr);
              return reject("Database error");
            }
            
            // Build insert query
            let insertQuery = "INSERT INTO users (username, email, password";
            let values = [username, email, hashedPassword];
            
            // Add role if column exists
            if (roleColumns.length > 0 && role) {
              insertQuery += ", role";
              values.push(role);
            }
            
            insertQuery += ") VALUES (?, ?, ?";
            if (roleColumns.length > 0 && role) {
              insertQuery += ", ?";
            }
            insertQuery += ")";
            
            db.query(insertQuery, values, (insertErr, result) => {
              if (insertErr) {
                console.error("Error creating user:", insertErr);
                return reject("Failed to create user");
              }
              
              console.log(`✅ User created successfully: ${email} (ID: ${result.insertId})`);
              resolve({
                id: result.insertId,
                username,
                email,
                role: role || "User",
              });
            });
          }
        );
      });
    });
  }

  // Delete user
  deleteUser(userId) {
    return new Promise((resolve, reject) => {
      const db = Database.getConnection();
      db.query("DELETE FROM users WHERE id = ?", [userId], (err, result) => {
        if (err) {
          console.error("Error deleting user:", err);
          return reject("Database error");
        }
        resolve(result);
      });
    });
  }

  // Update user status (if you have a status column)
  updateUserStatus(userId, status) {
    return new Promise((resolve, reject) => {
      const db = Database.getConnection();
      
      // Check if status column exists
      db.query(
        `SELECT COLUMN_NAME FROM information_schema.COLUMNS 
         WHERE TABLE_SCHEMA = DATABASE() 
         AND TABLE_NAME = 'users' 
         AND COLUMN_NAME = 'status'`,
        (err, columns) => {
          if (err || columns.length === 0) {
            // Status column doesn't exist, skip update
            return resolve({ message: "Status column not found" });
          }

          db.query(
            "UPDATE users SET status = ? WHERE id = ?",
            [status, userId],
            (err, result) => {
              if (err) {
                console.error("Error updating user status:", err);
                return reject("Database error");
              }
              resolve(result);
            }
          );
        }
      );
    });
  }
}

export default new AdminService();


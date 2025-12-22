import Database from "../config/database.js";

class Questionnaire {
  // Map questionnaire field IDs to database column names
  static fieldToColumnMap = {
    age: "age",
    gender: "gender",
    fitnessGoal: "fitness_goal",
    trainingDaysPerWeek: "training_days_per_week",
    heightCm: "height_cm",
    weightKg: "weight_kg",
    equipment: "equipment",
    targetZones: "target_zones",
    fitnessLevel: "fitness_level",
    goalWeightKg: "goal_weight_kg",
    workoutDuration: "workout_duration",
  };

  static ensureTableExists(callback) {
    const db = Database.getConnection();
    
    // Check if table exists and has the new structure (age column)
    db.query(
      "SHOW COLUMNS FROM questionnaires LIKE 'age'",
      (checkErr, checkResults) => {
        if (checkErr && checkErr.code === 'ER_NO_SUCH_TABLE') {
          // Table doesn't exist, create it
          const createTableSQL = `
            CREATE TABLE questionnaires (
              id INT AUTO_INCREMENT PRIMARY KEY,
              user_id INT NOT NULL,
              age INT,
              gender VARCHAR(20),
              fitness_goal VARCHAR(50),
              training_days_per_week INT,
              height_cm DECIMAL(5,2),
              weight_kg DECIMAL(5,2),
              equipment JSON,
              target_zones JSON,
              fitness_level VARCHAR(50),
              goal_weight_kg DECIMAL(5,2),
              workout_duration VARCHAR(50),
              created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
              updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
              FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
              INDEX idx_user_id (user_id)
            )
          `;
          db.query(createTableSQL, (err) => {
            if (err) {
              console.error("Failed to create questionnaires table:", err);
              return callback(err);
            }
            console.log("✅ Created questionnaires table with individual columns");
            callback(null);
          });
        } else if (checkErr) {
          return callback(checkErr);
        } else if (checkResults && checkResults.length > 0) {
          // Table exists with new structure
          callback(null);
        } else {
          // Table exists but has old structure (data column), drop and recreate
          console.log("⚠️  Old questionnaires table structure detected. Dropping and recreating...");
          db.query("DROP TABLE IF EXISTS questionnaires", (dropErr) => {
            if (dropErr) {
              console.error("Failed to drop old questionnaires table:", dropErr);
              return callback(dropErr);
            }
            // Now create with new structure
            const createTableSQL = `
              CREATE TABLE questionnaires (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT NOT NULL,
                age INT,
                gender VARCHAR(20),
                fitness_goal VARCHAR(50),
                training_days_per_week INT,
                height_cm DECIMAL(5,2),
                weight_kg DECIMAL(5,2),
                equipment JSON,
                target_zones JSON,
                fitness_level VARCHAR(50),
                goal_weight_kg DECIMAL(5,2),
                workout_duration VARCHAR(50),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
                INDEX idx_user_id (user_id)
              )
            `;
            db.query(createTableSQL, (err) => {
              if (err) {
                console.error("Failed to create questionnaires table:", err);
                return callback(err);
              }
              console.log("✅ Recreated questionnaires table with individual columns");
              callback(null);
            });
          });
        }
      }
    );
  }

  static saveForUser(userId, answers, callback) {
    const db = Database.getConnection();
    
    // Ensure table exists before inserting
    this.ensureTableExists((err) => {
      if (err) {
        return callback(err);
      }
      
      // Map answers (by field ID) to column values
      const columnValues = {};
      for (const [field, answer] of Object.entries(answers || {})) {
        const columnName = this.fieldToColumnMap[field];
        if (columnName) {
          // Handle arrays (equipment, target_zones) - store as JSON
          if (Array.isArray(answer)) {
            columnValues[columnName] = JSON.stringify(answer);
          } else {
            // Convert numeric strings to numbers for numeric columns
            if (["age", "training_days_per_week"].includes(columnName)) {
              columnValues[columnName] = parseInt(answer) || null;
            } else if (["height_cm", "weight_kg", "goal_weight_kg"].includes(columnName)) {
              columnValues[columnName] = parseFloat(answer) || null;
            } else {
              columnValues[columnName] = answer || null;
            }
          }
        }
      }

      // Build INSERT query with columns and values
      const columns = Object.keys(columnValues);
      const values = Object.values(columnValues);
      const placeholders = columns.map(() => "?").join(", ");
      const columnNames = columns.join(", ");

      const insertSQL = `
        INSERT INTO questionnaires (user_id, ${columnNames})
        VALUES (?, ${placeholders})
      `;

      db.query(insertSQL, [userId, ...values], callback);
    });
  }

  static findByUserId(userId, callback) {
    const db = Database.getConnection();
    db.query(
      "SELECT * FROM questionnaires WHERE user_id = ? ORDER BY created_at DESC LIMIT 1",
      [userId],
      (err, results) => {
        if (err) return callback(err);
        if (results.length === 0) return callback(null, null);
        
        const questionnaire = results[0];
        // Parse JSON fields back to arrays
        if (questionnaire.equipment) {
          try {
            questionnaire.equipment = JSON.parse(questionnaire.equipment);
          } catch (e) {
            questionnaire.equipment = [];
          }
        }
        if (questionnaire.target_zones) {
          try {
            questionnaire.target_zones = JSON.parse(questionnaire.target_zones);
          } catch (e) {
            questionnaire.target_zones = [];
          }
        }
        callback(null, questionnaire);
      }
    );
  }
}

export default Questionnaire;



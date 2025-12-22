import bcrypt from "bcryptjs";
import User from "../models/User.js";
import Questionnaire from "../models/Questionnaire.js";
import Database from "../config/database.js";

class AuthService {
  async signup(username, email, password, questionnaire) {
    return new Promise((resolve, reject) => {
      User.findByEmail(email, async (err, result) => {
        if (err) return reject("Database error");
        if (result.length > 0) return reject("User already exists");

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User(null, username, email, hashedPassword);

        newUser.save((saveErr, saveResult) => {
          if (saveErr || !saveResult) return reject("Signup failed");

          const userId = saveResult.insertId;

          // If questionnaire data is provided, save it in a separate table
          if (questionnaire) {
            Questionnaire.saveForUser(userId, questionnaire, (qErr) => {
              if (qErr) {
                console.error("Failed to save questionnaire:", qErr);
              }
              // Even if questionnaire save fails, user account is created
              resolve("Signup successful");
            });
          } else {
            resolve("Signup successful");
          }
        });
      });
    });
  }

  async login(email, password) {
    return new Promise((resolve, reject) => {
      User.findByEmail(email, async (err, result) => {
        if (err) return reject("Database error");
        if (result.length === 0) return reject("Invalid credentials");

        const user = result[0];
        const match = await bcrypt.compare(password, user.password);

        if (!match) return reject("Invalid credentials");

        // ALWAYS check database role column first, then fallback to email-based detection
        const db = Database.getConnection();
        const normalizedEmail = email.toLowerCase().trim();
        
        db.query(
          `SELECT COLUMN_NAME FROM information_schema.COLUMNS 
           WHERE TABLE_SCHEMA = DATABASE() 
           AND TABLE_NAME = 'users' 
           AND COLUMN_NAME = 'role'`,
          (roleErr, roleColumns) => {
            let role = "User"; // Default role
            
            // STEP 1: Check if role column exists in database
            if (!roleErr && roleColumns.length > 0) {
              // Role column exists - ALWAYS use database value
              const dbRole = user.role ? user.role.trim() : "";
              
              if (dbRole !== "") {
                // Normalize database role (case-insensitive)
                const normalizedRole = dbRole.toLowerCase();
                
                if (normalizedRole === "admin") {
                  role = "Admin";
                  console.log(`✅ ROLE FROM DATABASE: ${email} → Admin (database role="${user.role}")`);
                } else {
                  role = "User";
                  console.log(`✅ ROLE FROM DATABASE: ${email} → User (database role="${user.role}")`);
                }
              } else {
                // Role column exists but is empty/null - default to User
                role = "User";
                console.log(`⚠️ Role column exists but empty for ${email}, defaulting to User`);
              }
            } 
            // STEP 2: No role column exists - use email-based detection as fallback
            else {
              console.log(`⚠️ No role column found in database, using email-based detection for ${email}`);
              
              // Check if email contains "admin" or matches admin emails
              const adminEmails = ["admin@fitness.com", "admin@fitnesstracker.com"];
              if (adminEmails.includes(normalizedEmail) || normalizedEmail.includes("admin")) {
                role = "Admin";
                console.log(`✅ Admin detected via email: ${email}`);
              } else {
                role = "User";
                console.log(`✅ User detected via email: ${email}`);
              }
            }

            console.log(`📋 FINAL RESULT: ${email} → role = "${role}"`);
            resolve({
              username: user.username,
              email: user.email,
              role: role, // This will be "Admin" or "User"
            });
          }
        );
      });
    });
  }
}

export default new AuthService();

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

          if (questionnaire) {
            Questionnaire.saveForUser(userId, questionnaire, (qErr) => {
              if (qErr) {
                console.error("Failed to save questionnaire:", qErr);
              }
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

        // Check database role column first, then fallback to email-based detection
        const db = Database.getConnection();
        const normalizedEmail = email.toLowerCase().trim();
        
        db.query(
          `SELECT COLUMN_NAME FROM information_schema.COLUMNS 
           WHERE TABLE_SCHEMA = DATABASE() 
           AND TABLE_NAME = 'users' 
           AND COLUMN_NAME = 'role'`,
          (roleErr, roleColumns) => {
            let role = "User";
            
            if (!roleErr && roleColumns.length > 0) {
              const dbRole = user.role ? user.role.trim() : "";
              
              if (dbRole !== "") {
                const normalizedRole = dbRole.toLowerCase();
                role = normalizedRole === "admin" ? "Admin" : "User";
                console.log(`✅ ROLE FROM DATABASE: ${email} → ${role}`);
              } else {
                console.log(`⚠️ Role column exists but empty for ${email}, defaulting to User`);
              }
            } else {
              console.log(`⚠️ No role column found, using email-based detection for ${email}`);
              const adminEmails = ["admin@fitness.com", "admin@fitnesstracker.com"];
              if (adminEmails.includes(normalizedEmail) || normalizedEmail.includes("admin")) {
                role = "Admin";
              }
            }

            resolve({
              id: user.id,
              username: user.username,
              email: user.email,
              role: role,
            });
          }
        );
      });
    });
  }
}

export default new AuthService();
